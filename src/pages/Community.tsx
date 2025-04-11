import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Community = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setShowHeading(true);
      }, 150);
    }, 100);
  }, []);

  return (
    <div className={`max-w-4xl mx-auto px-6 py-12 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {showHeading && (
        <h1 className="text-5xl text-center font-bold mb-12 text-red-600 transition-opacity duration-1000">
          Community Wall
        </h1>
      )}

      <Card className="p-10 rounded-2xl shadow-2xl text-center space-y-6">
        <p className="text-lg text-gray-700">Share your journey, inspire others, or just read what the community has to say.</p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
          <Button
            onClick={() => navigate('/post-story')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg rounded-xl font-semibold transition"
          >
            📜 Post a Story
          </Button>
          <Button
            onClick={() => navigate('/view-stories')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg rounded-xl font-semibold transition"
          >
            👀 View Stories
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Community;
