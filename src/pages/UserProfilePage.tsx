import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Card } from '@/components/ui/card';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [emergency1, setEmergency1] = useState('');
  const [emergency2, setEmergency2] = useState('');
  const [emergency3, setEmergency3] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error fetching user:', userError);
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        return;
      }

      setName(data.name || '');
      setAvatarUrl(data.avatar_url || '');
      setEmergency1(data.emergency1 || '');
      setEmergency2(data.emergency2 || '');
      setEmergency3(data.emergency3 || '');
      setBloodGroup(data.blood_group || '');
      setAddress(data.address || '');
      setCreatedAt(data.created_at || '');
    };

    fetchProfile();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    setLoading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    // Delete any existing file at the same path to force an update.
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([filePath]);
    if (deleteError) {
      console.error('Error deleting old avatar (if any):', deleteError.message);
      // We continue even if deletion fails.
    }

    // Upload the new file with upsert enabled
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      setLoading(false);
      return;
    }

    // Get the public URL of the newly uploaded avatar
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    let publicUrl = urlData?.publicUrl;

    if (!publicUrl) {
      console.error('Could not get public URL');
      setLoading(false);
      return;
    }

    // Append a timestamp query parameter to bust cache
    publicUrl = `${publicUrl}?t=${Date.now()}`;

    // Save the new avatar URL to the user's profile
    const { error: updateError } = await supabase
      .from('user_profiles')
      .upsert({ id: userId, avatar_url: publicUrl });

    if (updateError) {
      console.error('Error saving avatar URL:', updateError.message);
    } else {
      setAvatarUrl(publicUrl);
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (!userId) return;
    setLoading(true);

    const { error } = await supabase.from('user_profiles').upsert({
      id: userId,
      name,
      avatar_url: avatarUrl,
      emergency1,
      emergency2,
      emergency3,
      blood_group: bloodGroup,
      address,
    });

    setLoading(false);

    if (error) {
      console.error('Error saving profile:', error.message);
      alert('Failed to save profile');
    } else {
      alert('Profile saved successfully!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Card className="p-10 rounded-3xl shadow-xl border-2 border-red-200 bg-gradient-to-t from-red-300 via-red-400 to-red-500">
        <h2 className="text-4xl font-bold text-center text-white mb-6">User Profile</h2>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <img
              src={avatarUrl || 'https://via.placeholder.com/150'}
              alt="Avatar"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-2 cursor-pointer shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </label>
          </div>
          <input
            id="avatar-upload"
            type="file"
            onChange={handleAvatarUpload}
            className="hidden"
            disabled={loading}
          />
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />

        <input
          type="text"
          placeholder="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="w-full p-4 mb-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-4 mb-6 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />

        <h3 className="text-xl font-semibold text-white mb-4">Emergency Contacts</h3>
        <input
          type="text"
          placeholder="Emergency Contact 1"
          value={emergency1}
          onChange={(e) => setEmergency1(e.target.value)}
          className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />
        <input
          type="text"
          placeholder="Emergency Contact 2"
          value={emergency2}
          onChange={(e) => setEmergency2(e.target.value)}
          className="w-full p-4 mb-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />
        <input
          type="text"
          placeholder="Emergency Contact 3"
          value={emergency3}
          onChange={(e) => setEmergency3(e.target.value)}
          className="w-full p-4 mb-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />

        {createdAt && (
          <p className="text-sm text-gray-200 text-center mb-4">
            Profile created at: {new Date(createdAt).toLocaleString()}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-4 text-xl font-semibold text-white rounded-xl transition transform ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600'
          }`}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </Card>
    </div>
  );
};

export default UserProfile;
