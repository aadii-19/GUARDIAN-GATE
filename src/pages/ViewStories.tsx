import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Story {
  id: number;
  name: string;
  story: string;
  created_at: string;
  likes: number | null;
}

interface Comment {
  id: number;
  story_id: number;
  text: string;
  created_at: string;
  name: string;
}

const ViewStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedStoryIds, setLikedStoryIds] = useState<number[]>([]);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: storiesData, error: storiesError } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (storiesError || commentsError) {
        console.error('Error fetching data:', storiesError || commentsError);
      } else {
        const storiesWithLikes = (storiesData as Story[]).map((story) => ({
          ...story,
          likes: story.likes ?? 0,
        }));
        setStories(storiesWithLikes);
        setComments(commentsData as Comment[]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLike = async (id: number, currentLikes: number | null) => {
    const likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
    setLikedStoryIds((prev) => [...prev, id]);

    setTimeout(() => {
      setLikedStoryIds((prev) => prev.filter((sid) => sid !== id));
    }, 1200);

    if (likedStories.includes(id)) return;

    const updatedLikes = (currentLikes ?? 0) + 1;
    const { error } = await supabase.from('stories').update({ likes: updatedLikes }).eq('id', id);

    if (!error) {
      setStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, likes: updatedLikes } : s))
      );
      localStorage.setItem('likedStories', JSON.stringify([...likedStories, id]));
    } else {
      console.error('Error liking story:', error);
    }
  };

  const handleCommentSubmit = async (storyId: number) => {
    const commentText = newComment[storyId]?.trim();
    if (!commentText) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([{ story_id: storyId, text: commentText, name: 'Anonymous' }])
      .select();

    if (error) {
      console.error('Error adding comment:', error);
      return;
    }

    if (data) {
      setComments((prev) => [...prev, ...data]);
      setNewComment((prev) => ({ ...prev, [storyId]: '' }));
    }
  };

  let tapTimer: NodeJS.Timeout | null = null;
  const handleDoubleTap = (id: number, likes: number | null) => {
    if (tapTimer) {
      clearTimeout(tapTimer);
      tapTimer = null;
      handleLike(id, likes);
    } else {
      tapTimer = setTimeout(() => {
        tapTimer = null;
      }, 250);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 p-6 animate-gradient-x">
      <div className="w-full max-w-4xl transform hover:scale-[1.02] transition-all duration-500">
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent mb-8 animate-text-shimmer">
          Community Stories
        </h1>

        <div className="bg-white/70 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8 h-[70vh] overflow-y-auto border-2 border-white/50 flex flex-col space-y-6 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center text-gray-500 animate-pulse">
              <p className="text-xl font-medium">No stories yet. Be the first!</p>
            </div>
          ) : (
            stories.map((story) => (
              <div
                key={story.id}
                onClick={() => handleDoubleTap(story.id, story.likes)}
                className="story-card group self-start max-w-[90%] bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-lg border border-white/60 rounded-2xl px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:scale-[1.02] animate-fade-in"
              >
                <div className="text-sm text-gray-700 font-semibold mb-2 flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-red-500 to-red-400 w-2 h-2 rounded-full"></span>
                  <span>{story.name}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{dayjs(story.created_at).fromNow()}</span>
                </div>
                <p className="text-gray-800 whitespace-pre-line mb-4 leading-relaxed">{story.story}</p>

                <div className="flex items-center space-x-3 text-sm relative z-10 mb-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(story.id, story.likes);
                    }}
                    className={`transform transition-all duration-300 hover:scale-125 ${
                      likedStoryIds.includes(story.id) ? 'animate-like-bounce' : ''
                    }`}
                  >
                    ❤️
                  </button>
                  <span className="text-gray-700 font-medium">{story.likes ?? 0}</span>

                  {likedStoryIds.includes(story.id) && (
                    <div className="like-burst absolute pointer-events-none">
                      {['❤️', '❤️', '❤️', '❤️', '❤️'].map((emoji, index) => (
                        <span
                          key={index}
                          className="emoji-burst absolute"
                          style={{
                            animationDelay: `${Math.random() * 0.5}s`,
                            transform: `translate(${Math.random() * 100 - 50}px, ${
                              -Math.random() * 100
                            }px) rotate(${Math.random() * 360}deg) scale(${Math.random() + 0.5})`,
                          }}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comment Section */}
                <div className="mt-4 space-y-3">
                  <h3 className="text-gray-700 font-semibold text-sm mb-2 flex items-center space-x-2">
                    <span className="bg-gradient-to-r from-red-500 to-red-400 w-1.5 h-1.5 rounded-full"></span>
                    <span>Comments</span>
                  </h3>
                  {comments
                    .filter((comment) => comment.story_id === story.id)
                    .map((comment) => (
                      <div key={comment.id} className="text-sm text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-2.5 rounded-xl shadow-inner transform transition-all duration-300 hover:scale-[1.02]">
                        <span className="font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">{comment.name || 'Anonymous'}</span>
                        <span className="mx-2">•</span>
                        {comment.text}
                      </div>
                    ))}

                  <div className="flex items-center mt-3 space-x-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment[story.id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({ ...prev, [story.id]: e.target.value }))
                      }
                      className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCommentSubmit(story.id);
                      }}
                      className="text-sm px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStories;
