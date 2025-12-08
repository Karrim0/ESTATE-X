import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  LayoutDashboard,
  Search,
  Heart,
  Bell,
  User,
  Menu,
  X,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";

/**
 * Professional Header Component for B2B Real Estate Platform
 * Features:
 * - Clean, corporate design
 * - Quick access to key features
 * - Notifications & User menu
 * - Responsive mobile menu
 */

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      text: "New property matches your criteria",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      text: "Price drop on saved property",
      time: "1h ago",
      unread: true,
    },
    { id: 3, text: "Auction ending in 2 hours", time: "3h ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const navLinks = [
    { path: "/", label: "Properties", icon: Building2 },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/analytics", label: "Analytics", icon: TrendingUp },
    { path: "/saved", label: "Saved", icon: Heart, badge: 5 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Building2 className="text-white" size={28} />
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Estate<span className="text-blue-600">PRO</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Professional Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        active
                          ? "bg-white text-blue-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button (Desktop) */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 hover:text-gray-900 border border-gray-300">
              <Search size={18} />
              <span className="text-sm font-medium">Quick Search</span>
              <kbd className="px-2 py-0.5 bg-white rounded text-xs font-mono border border-gray-300">
                ⌘K
              </kbd>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUserMenuOpen(false);
                }}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell size={22} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border-2 border-gray-200 animate-in slide-in-from-top-5 duration-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-500">
                      {unreadCount} unread
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notif.unread ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 font-medium">
                              {notif.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    John Smith
                  </p>
                  <p className="text-xs text-gray-500">Premium Account</p>
                </div>
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-200 animate-in slide-in-from-top-5 duration-200">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <p className="font-bold text-gray-900">John Smith</p>
                    <p className="text-sm text-gray-600">john@realestate.com</p>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        ⭐ Premium
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <LayoutDashboard size={18} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Dashboard
                      </span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <Settings size={18} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Settings
                      </span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors text-left text-red-600">
                      <LogOut size={18} />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          active
                            ? "bg-white text-blue-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Close dropdowns on outside click */}
      {(userMenuOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setUserMenuOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
