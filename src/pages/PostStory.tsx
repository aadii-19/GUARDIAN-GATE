import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import 'animate.css';
const PostStory = () => {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePost = async () => {
    if (!story.trim()) {
      alert('Story cannot be empty');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('stories').insert([
      {
        name: anonymous || !name.trim() ? 'Anonymous' : name.trim(),
        story: story.trim(),
      },
    ]);

    setLoading(false);

    if (error) {
      console.error('Error posting story:', error);
      alert('Something went wrong while posting the story');
    } else {
      alert('Your story has been posted!');
      setName('');
      setStory('');
      setAnonymous(false);
      navigate('/view-stories');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Community Guidelines */}
        <div className="md:w-1/2 bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-300 animate__animated animate__slideInLeft">
          <h2 className="text-3xl font-extrabold text-red-600 mb-6 drop-shadow-md tracking-wide">
            Community Guidelines
          </h2>
          <ul className="list-disc space-y-3 text-gray-700 ml-6 text-lg">
            <li>Be respectful and kind in your language.</li>
            <li>Do not post hate speech, racism, or discriminatory content.</li>
            <li>Keep your story genuine and insightful.</li>
            <li>Refrain from sharing sensitive or private information.</li>
            <li>Use the platform to inspire and support one another.</li>
            <li>Stay on-topic and follow the forum rules.</li>
            <li>Any inappropriate content may be removed by moderators.</li>
          </ul>
          <p className="mt-6 text-sm text-gray-500">
            By posting, you agree to abide by these guidelines.
          </p>
        </div>

        {/* Right Column: Post Story Card */}
        <div className="md:w-1/2 animate__animated animate__slideInRight">
          <Card className="p-8 rounded-3xl shadow-2xl border-2 border-red-200 bg-gradient-to-t from-red-300 via-red-200 to-white bg-opacity-80 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-center text-red-600 mb-4 drop-shadow-lg">
              Share Your Story
            </h2>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Inspire others by sharing what you’ve gone through and how you overcame it.
            </p>

            {!anonymous && (
              <input
                type="text"
                placeholder="Your Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 transition-shadow hover:shadow-md"
              />
            )}

            <textarea
              placeholder="Your story..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full p-4 mb-6 h-48 resize-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 transition-shadow hover:shadow-md"
            />

            <div className="flex items-center mb-8">
              <input
                id="anon"
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="mr-2 w-5 h-5 accent-red-600"
              />
              <label htmlFor="anon" className="text-gray-700 font-medium text-lg">
                Post Anonymously
              </label>
            </div>

            <button
              onClick={handlePost}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold transition-transform duration-300 transform hover:-translate-y-1 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
              }`}
            >
              {loading ? 'Posting...' : 'Post Story'}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostStory;
