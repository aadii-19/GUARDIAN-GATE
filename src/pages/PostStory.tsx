import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Card className="p-8 rounded-2xl shadow-xl border-2 border-red-100 bg-white">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-3">Share Your Story</h2>
        <p className="text-gray-600 text-center mb-6">
          Inspire others by sharing what you’ve gone through and how you overcame it.
        </p>

        {!anonymous && (
          <input
            type="text"
            className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <textarea
          className="w-full p-3 mb-4 border rounded-xl h-40 resize-none focus:outline-none focus:ring-2 focus:ring-red-200"
          placeholder="Your story..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />

        <div className="flex items-center mb-6">
          <input
            id="anon"
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="anon" className="text-gray-700">
            Post Anonymously
          </label>
        </div>

        <button
          onClick={handlePost}
          disabled={loading}
          className={`w-full font-bold py-3 rounded-xl transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {loading ? 'Posting...' : 'Post Story'}
        </button>
      </Card>
    </div>
  );
};

export default PostStory;
