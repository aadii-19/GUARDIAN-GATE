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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
          Community Stories
        </h1>

        <div className="bg-white rounded-3xl shadow-2xl p-6 h-[600px] overflow-y-auto border-2 border-gray-200 flex flex-col space-y-4 backdrop-blur-md bg-opacity-70">
          {loading ? (
            <p className="text-center text-gray-600 text-lg">Loading...</p>
          ) : stories.length === 0 ? (
            <p className="text-center text-gray-500">No stories yet. Be the first!</p>
          ) : (
            stories.map((story) => (
              <div
                key={story.id}
                onClick={() => handleDoubleTap(story.id, story.likes)}
                className="story-card self-start max-w-[85%] bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-40 rounded-xl px-4 py-3 shadow-xl cursor-pointer transition-all duration-300"
              >
                <div className="text-sm text-gray-700 font-semibold mb-1">
                  {story.name} • {dayjs(story.created_at).fromNow()}
                </div>
                <p className="text-gray-900 whitespace-pre-line mb-3">{story.story}</p>

                <div className="flex items-center space-x-2 text-sm relative z-10 mb-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(story.id, story.likes);
                    }}
                    className={`text-red-500 hover:text-red-600 transition duration-200 z-10 ${
                      likedStoryIds.includes(story.id) ? 'animate-like-glow' : ''
                    }`}
                  >
                    ❤️
                  </button>
                  <span className="text-gray-700">{story.likes ?? 0}</span>

                  {likedStoryIds.includes(story.id) && (
                    <div className="like-burst pointer-events-none">
                      {['❤️', '💖', '💘', '💝', '💕'].map((emoji, index) => (
                        <span
                          key={index}
                          className="emoji-burst"
                          style={{
                            animationDelay: `${Math.random() * 0.3}s`,
                            transform: `translate(${Math.random() * 80 - 40}px, ${
                              -Math.random() * 80
                            }px) rotate(${Math.random() * 360}deg)`,
                          }}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comment Section */}
                <div className="mt-4 space-y-2">
                  <h3 className="text-gray-700 font-semibold text-sm mb-1">Comments</h3>
                  {comments
                    .filter((comment) => comment.story_id === story.id)
                    .map((comment) => (
                      <div key={comment.id} className="text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-xl shadow-inner">
                        <span className="font-semibold">{comment.name || 'Anonymous'}:</span> {comment.text}
                      </div>
                    ))}

                  <div className="flex items-center mt-2 space-x-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment[story.id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({ ...prev, [story.id]: e.target.value }))
                      }
                      className="flex-1 px-3 py-1 text-sm border rounded-xl shadow-sm focus:outline-none"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCommentSubmit(story.id);
                      }}
                      className="text-xs px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600"
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
