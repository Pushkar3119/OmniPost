import React, { useState } from 'react';
import { LayoutDashboard, PenTool, Zap, Settings, Menu, X } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { CreationStudio } from './pages/CreationStudio';
import { Automations } from './pages/Automations';

type Page = 'dashboard' | 'create' | 'automations';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const NavItem = ({ page, icon: Icon, label }: { page: Page; icon: any; label: string }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        currentPage === page 
          ? 'bg-purple-100 text-purple-900 font-medium' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside 
        className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 flex flex-col transition-all duration-300 fixed h-full z-20 md:relative`}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
            {isSidebarOpen ? (
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white text-lg">O</div>
                    <span>OmniPost</span>
                </div>
            ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white text-lg mx-auto">O</div>
            )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
            <NavItem page="dashboard" icon={LayoutDashboard} label={isSidebarOpen ? "Dashboard" : ""} />
            <NavItem page="create" icon={PenTool} label={isSidebarOpen ? "Creation Studio" : ""} />
            <NavItem page="automations" icon={Zap} label={isSidebarOpen ? "Automations" : ""} />
        </nav>

        <div className="p-4 border-t border-slate-100">
             <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-600">
                <Settings size={20} />
                {isSidebarOpen && <span>Settings</span>}
             </button>
             <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mt-4 w-full flex justify-center text-slate-300 hover:text-slate-500"
            >
                {isSidebarOpen ? '<< Collapse' : '>>'}
             </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen w-full">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between">
            <span className="font-bold text-lg">OmniPost</span>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <X /> : <Menu />}
            </button>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'create' && <CreationStudio />}
            {currentPage === 'automations' && <Automations />}
        </div>
      </main>
    </div>
  );
}
