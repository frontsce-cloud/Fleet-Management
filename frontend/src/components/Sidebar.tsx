import React, { useState } from 'react';
import {
  LayoutDashboard,
  Truck,
  Users,
  Map,
  Bell,
  MessageSquare,
  BarChart3,
  Shield,
  ChevronDown,
  X,
} from 'lucide-react';
import { useFleetStore } from '@/store/fleetStore';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'fleet', icon: Truck, label: 'Fleet' },
  { id: 'convoys', icon: Users, label: 'Convoys' },
  { id: 'monitoring', icon: Map, label: 'Live Monitoring' },
  { id: 'alerts', icon: Bell, label: 'Alerts', badge: 7 },
  { id: 'communications', icon: MessageSquare, label: 'Communications' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'security', icon: Shield, label: 'Security' },
];

const REGIONS = ['Kenya', 'DRC', 'Tanzania', 'Mali', 'All'];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { selectedRegion, setSelectedRegion } = useFleetStore();
  const [regionOpen, setRegionOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-30 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed md:static left-0 top-0 h-screen w-80 md:w-72 bg-slate-950 border-r border-slate-800 flex flex-col z-40">
        {/* Header */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            C
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-white">
              ConvoyGuard
            </h1>
            <p className="text-xs text-slate-500">Fleet • Convoy • Security</p>
          </div>

          {/* Close button mobile */}
          <button
            onClick={onClose}
            className="ml-auto p-2 hover:bg-slate-800 rounded-lg md:hidden"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  onClose?.();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-900/40 border border-blue-700/50 text-white'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Region Selector */}
        <div className="p-4 border-t border-slate-800">
          <div className="relative">
            <button
              onClick={() => setRegionOpen(!regionOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors text-slate-300 text-sm font-medium"
            >
              <span>{selectedRegion}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  regionOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {regionOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-lg z-50">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      setSelectedRegion(region);
                      setRegionOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      selectedRegion === region
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
