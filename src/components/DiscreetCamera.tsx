import { useEffect, useRef, useState } from 'react';

export default function DiscreetCamera({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [locationURL, setLocationURL] = useState<string>('Fetching location...');

  useEffect(() => {
    let animationFrameId: number;

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocationURL(`https://maps.google.com/?q=${latitude},${longitude}`);
        },
        () => setLocationURL('Location unavailable')
      );
    };

    const drawToCanvas = () => {
      const video = videoRef.current;
      const canvas = overlayCanvasRef.current;
      if (!video || !canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const draw = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Overlay info
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, canvas.height - 70, canvas.width, 70);

        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif';

        const now = new Date();
        ctx.fillText(`📅 ${now.toLocaleString()}`, 10, canvas.height - 40);
        ctx.fillText(`📍 ${locationURL}`, 10, canvas.height - 15);

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();
    };

    const startRecording = async () => {
      try {
        fetchLocation();

        // 1. Access camera & mic
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: true,
        });
        mediaStreamRef.current = stream;

        // 2. Set the live video feed
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise((res) =>
            videoRef.current?.addEventListener('loadedmetadata', res, {
              once: true,
            })
          );
        }

        // 3. Start drawing video + overlays onto canvas
        drawToCanvas();

        // 4. Capture canvas stream & combine with audio
        const canvasStream = overlayCanvasRef.current!.captureStream();
        const audioTracks = stream.getAudioTracks();
        const finalStream = new MediaStream([
          canvasStream.getVideoTracks()[0],
          ...audioTracks,
        ]);

        // 5. Record the final stream
        const recorder = new MediaRecorder(finalStream);
        mediaRecorderRef.current = recorder;

        recordedChunksRef.current = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = `evidence_${Date.now()}.webm`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);

          handleClose();
        };

        recorder.start();

        // Stop recording after 5 seconds
        setTimeout(() => {
          recorder.stop();
        }, 10000);
      } catch (error) {
        alert('Camera or mic access denied.');
        onClose();
      }
    };

    const handleClose = () => {
      cancelAnimationFrame(animationFrameId);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      onClose();
    };

    startRecording();

    return () => {
      cancelAnimationFrame(animationFrameId);
      mediaRecorderRef.current?.stop();
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onClose, locationURL]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-[90%] aspect-video bg-black rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas
          ref={overlayCanvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="absolute bottom-8 flex gap-4">
        <button
          onClick={onClose}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl"
        >
          ✖ Cancel
        </button>
      </div>
    </div>
  );
}
