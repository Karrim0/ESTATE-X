import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Eye,
  Heart,
  DollarSign,
  Clock,
  Target,
  BarChart3,
  Activity,
  Calendar,
  ArrowUpRight,
  Zap,
  Award,
} from "lucide-react";

/**
 * Professional Dashboard for Real Estate Professionals
 * Features:
 * - Real-time analytics
 * - Performance metrics
 * - Quick actions
 * - Market insights
 */

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock Data - Replace with API
  const stats = {
    totalProperties: 1247,
    activeListings: 892,
    totalViews: 45620,
    savedProperties: 234,
    conversionRate: 12.4,
    avgPrice: 2450000,
    trend: {
      properties: 8.2,
      views: 15.3,
      saved: -2.4,
      conversion: 3.1,
    },
  };

  const recentActivity = [
    {
      id: 1,
      type: "view",
      property: "Luxury Villa in Beverly Hills",
      time: "2m ago",
    },
    { id: 2, type: "saved", property: "Downtown Penthouse", time: "15m ago" },
    { id: 3, type: "inquiry", property: "Beachfront Bungalow", time: "1h ago" },
    { id: 4, type: "offer", property: "Modern Townhouse", time: "3h ago" },
  ];

  const topProperties = [
    {
      id: 1,
      title: "Beverly Hills Villa",
      views: 2340,
      inquiries: 45,
      price: 4500000,
    },
    {
      id: 2,
      title: "Manhattan Penthouse",
      views: 1890,
      inquiries: 38,
      price: 8900000,
    },
    {
      id: 3,
      title: "Miami Beachfront",
      views: 1650,
      inquiries: 32,
      price: 3200000,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, John 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your portfolio today
              </p>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border-2 border-gray-200 shadow-sm">
              {["7d", "30d", "90d", "1y"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    timeRange === range
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {range === "7d" && "Last 7 days"}
                  {range === "30d" && "Last 30 days"}
                  {range === "90d" && "Last 90 days"}
                  {range === "1y" && "Last year"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Properties */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Building2 size={24} className="text-blue-600" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-bold ${
                  stats.trend.properties > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stats.trend.properties > 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                {Math.abs(stats.trend.properties)}%
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                Total Properties
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalProperties.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {stats.activeListings} active listings
              </p>
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Eye size={24} className="text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-green-600">
                <TrendingUp size={16} />
                {stats.trend.views}%
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                Total Views
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalViews.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                +{(stats.totalViews * 0.15).toFixed(0)} this month
              </p>
            </div>
          </div>

          {/* Saved Properties */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <Heart size={24} className="text-red-600" />
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-red-600">
                <TrendingDown size={16} />
                {Math.abs(stats.trend.saved)}%
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                Saved Properties
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.savedProperties}
              </p>
              <p className="text-xs text-gray-500 mt-2">High interest items</p>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Target size={24} className="text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-green-600">
                <TrendingUp size={16} />
                {stats.trend.conversion}%
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                Conversion Rate
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.conversionRate}%
              </p>
              <p className="text-xs text-gray-500 mt-2">Above industry avg</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Area (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Performance Overview
                  </h3>
                  <p className="text-sm text-gray-500">
                    Views and inquiries over time
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
                  View Full Report
                </button>
              </div>

              {/* Placeholder Chart */}
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border-2 border-blue-200">
                <div className="text-center">
                  <BarChart3 size={48} className="text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    Chart Visualization
                  </p>
                  <p className="text-sm text-gray-500">
                    Recharts integration ready
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">245</p>
                  <p className="text-xs text-gray-600 mt-1">New Inquiries</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">$2.4M</p>
                  <p className="text-xs text-gray-600 mt-1">Avg Deal Size</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">18 days</p>
                  <p className="text-xs text-gray-600 mt-1">Avg Close Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity (1 col) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h3>
                <Activity size={20} className="text-gray-400" />
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === "view"
                          ? "bg-blue-100"
                          : activity.type === "saved"
                          ? "bg-red-100"
                          : activity.type === "inquiry"
                          ? "bg-green-100"
                          : "bg-purple-100"
                      }`}
                    >
                      {activity.type === "view" && (
                        <Eye size={18} className="text-blue-600" />
                      )}
                      {activity.type === "saved" && (
                        <Heart size={18} className="text-red-600" />
                      )}
                      {activity.type === "inquiry" && (
                        <Zap size={18} className="text-green-600" />
                      )}
                      {activity.type === "offer" && (
                        <DollarSign size={18} className="text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {activity.property}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </div>

        {/* Top Performing Properties */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Top Performing Properties
              </h3>
              <p className="text-sm text-gray-500">
                Your best performers this month
              </p>
            </div>
            <Award size={24} className="text-yellow-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">
                    Property
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">
                    Views
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">
                    Inquiries
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">
                    Price
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProperties.map((property, idx) => (
                  <tr
                    key={property.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                          #{idx + 1}
                        </div>
                        <span className="font-semibold text-gray-900">
                          {property.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-900">
                        <Eye size={16} className="text-blue-600" />
                        {property.views.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-900">
                        <Zap size={16} className="text-green-600" />
                        {property.inquiries}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-bold text-gray-900">
                        ${(property.price / 1000000).toFixed(1)}M
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                        View
                        <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
