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
        <div className="md:w-1/2 bg-gradient-to-br from-white via-red-50 to-pink-50 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-red-100 backdrop-blur-sm animate__animated animate__slideInLeft relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-100/30 to-pink-100/30 rounded-full blur-2xl -z-10"></div>
          
          <div className="relative">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-wide">
              Community Guidelines
            </h2>
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-red-100 rounded-full opacity-50 blur-xl"></div>
          </div>
          <ul className="space-y-4 text-gray-700 ml-6 text-lg">
            {[
              'Be respectful and kind in your language.',
              'Do not post hate speech, racism, or discriminatory content.',
              'Keep your story genuine and insightful.',
              'Refrain from sharing sensitive or private information.',
              'Use the platform to inspire and support one another.',
              'Stay on-topic and follow the forum rules.',
              'Any inappropriate content may be removed by moderators.',
              'Avoid using offensive or explicit language.',
              'Respect others\' privacy and personal boundaries.',
              'Share constructive feedback and support.'
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-3 group transition-all duration-300 hover:translate-x-2">
                <span className="inline-block w-3 h-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]"></span>
                <span className="font-medium bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition-all duration-300">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 blur-xl"></div>
            <p className="text-sm text-gray-600 font-medium italic relative z-10">
              By posting, you agree to abide by these guidelines.
            </p>
          </div>
        </div>

        {/* Right Column: Post Story Card */}
        <div className="md:w-1/2 animate__animated animate__slideInRight">
          <Card className="p-8 rounded-3xl shadow-2xl border-2 border-red-200 bg-gradient-to-t from-red-300 via-red-200 to-white bg-opacity-80 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent)] pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
            
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-lg relative">
              Share Your Story
            </h2>
            <p className="text-gray-600 text-center mb-8 text-lg font-medium">
              Inspire others by sharing what you've gone through and how you overcame it.
            </p>

            {!anonymous && (
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300 hover:shadow-md bg-white/80 backdrop-blur-sm group-hover:border-red-400"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            )}

            <div className="relative group">
              <textarea
                placeholder="Your story..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full p-4 mb-6 h-48 resize-none border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300 hover:shadow-md bg-white/80 backdrop-blur-sm group-hover:border-red-400"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <div className="flex items-center mb-8 relative group">
              <input
                id="anon"
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="mr-2 w-5 h-5 accent-red-600 cursor-pointer transition-transform duration-200 hover:scale-110"
              />
              <label htmlFor="anon" className="text-gray-700 font-medium text-lg cursor-pointer hover:text-red-600 transition-colors duration-200">
                Post Anonymously
              </label>
            </div>

            <button
              onClick={handlePost}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
              }`}
            >
              <span className="relative z-10">
                {loading ? 'Posting...' : 'Post Story'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Character count indicator with animated progress bar */}
            <div className="mt-4 relative">
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${Math.min((story.length / 1000) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="mt-2 text-right text-sm text-gray-500">
                {story.length}/1000 characters
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostStory;
