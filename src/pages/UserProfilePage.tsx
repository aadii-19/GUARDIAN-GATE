import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
 

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

    await supabase.storage.from('avatars').remove([filePath]);

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
    let publicUrl = urlData?.publicUrl;

    if (!publicUrl) {
      setLoading(false);
      return;
    }

    publicUrl = `${publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from('user_profiles')
      .upsert({ id: userId, avatar_url: publicUrl });

    if (!updateError) {
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
      alert('Failed to save profile');
    } else {
      alert('Profile saved successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-200 to-red-100 px-6 py-16 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 transition-all duration-300">
        <h2 className="text-4xl font-bold text-center text-red-700 drop-shadow-sm mb-8">Your Profile</h2>

        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40">
            <img
              src={avatarUrl || 'https://via.placeholder.com/150'}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg transition hover:scale-105 duration-300"
            />
            <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-md cursor-pointer transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input id="avatar-upload" type="file" className="hidden" onChange={handleAvatarUpload} disabled={loading} />
          </div>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Blood Group"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-500"
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-500 resize-none"
            rows={3}
          />
        </div>

        <h3 className="text-xl text-red-600 font-semibold mt-10 mb-4">Emergency Contacts</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Emergency Contact 1"
            value={emergency1}
            onChange={(e) => setEmergency1(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Emergency Contact 2"
            value={emergency2}
            onChange={(e) => setEmergency2(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Emergency Contact 3"
            value={emergency3}
            onChange={(e) => setEmergency3(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/60 border border-gray-300 shadow-inner focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-500"
          />
        </div>

        {createdAt && (
          <p className="text-sm text-center text-gray-600 mt-6">
            Profile created at: {new Date(createdAt).toLocaleString()}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg text-white shadow-lg transition-all ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
          }`}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
