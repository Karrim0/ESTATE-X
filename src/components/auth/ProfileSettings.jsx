// src/components/auth/ProfileSettings.jsx

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Camera, Save, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const ProfileSettings = () => {
  const { user, updateUser, changePassword } = useAuth();
  const { showSuccess, showError } = useNotifications();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile form
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    bio: user?.bio || '',
    location: user?.location?.city || ''
  });
  
  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await updateUser(profileData);
      
      if (result.success) {
        showSuccess('Profile updated successfully');
      } else {
        showError(result.message || 'Failed to update profile');
      }
    } catch (error) {
      showError('An error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      
      if (result.success) {
        showSuccess('Password changed successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        showError(result.message || 'Failed to change password');
      }
    } catch (error) {
      showError('An error occurred while changing password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-gray-200 mb-8">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'security', label: 'Security', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="animate-in slide-in-from-right duration-300">
          
          {/* Avatar Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border-2 border-gray-200 hover:bg-gray-50">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Upload a new profile picture
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleProfileSubmit} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="animate-in slide-in-from-right duration-300">
          <form onSubmit={handlePasswordSubmit} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
            
            <div className="space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Confirm new password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;