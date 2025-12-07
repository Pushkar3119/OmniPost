import React from 'react';
import { BarChart, Users, Calendar, ArrowUpRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back, OmniUser.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Users size={24} />
            </div>
            <span className="text-green-600 text-sm font-medium flex items-center">
              <ArrowUpRight size={16} className="mr-1" /> +12%
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">24.5k</h3>
          <p className="text-slate-500 text-sm">Total Reach</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Calendar size={24} />
            </div>
            <span className="text-slate-400 text-sm font-medium">Pending</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">8</h3>
          <p className="text-slate-500 text-sm">Scheduled Posts</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
            <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
              <BarChart size={24} />
            </div>
            <span className="text-green-600 text-sm font-medium flex items-center">
              <ArrowUpRight size={16} className="mr-1" /> +5%
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">4.2%</h3>
          <p className="text-slate-500 text-sm">Avg. Engagement</p>
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Recent Scheduled Posts</h2>
        </div>
        <div className="p-6">
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-slate-200 rounded-md"></div>
                            <div>
                                <p className="font-medium text-slate-900">Growth Hack #{i}</p>
                                <p className="text-sm text-slate-500">Instagram • Carousel</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-sm font-medium text-slate-700">Tomorrow</p>
                             <p className="text-xs text-slate-500">09:4{i} AM</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
