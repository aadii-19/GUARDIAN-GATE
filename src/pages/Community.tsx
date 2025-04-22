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
    <div className={`max-w-4xl mx-auto px-6 py-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {showHeading && (
        <h1 className="text-5xl text-center font-bold mb-12 text-red-600 drop-shadow-xl transform transition duration-1000 hover:scale-105">
          Community Wall
        </h1>
      )}

      <Card className="p-12 rounded-2xl bg-gradient-to-r from-pink-300 via-red-300 to-red-500 shadow-lg text-center space-y-8 backdrop-blur-md border border-white/30">
        <p className="text-xl text-gray-800 font-semibold mb-6">
          Share your journey, inspire others, or just read what the community has to say.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
          <Button
            onClick={() => navigate('/post-story')}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            📜 Post a Story
          </Button>
          <Button
            onClick={() => navigate('/view-stories')}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            👀 View Stories
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Community;
