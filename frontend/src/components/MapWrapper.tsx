import React from 'react';
import { MapPin, Navigation, Zap } from 'lucide-react';

interface MapWrapperProps {
  children?: React.ReactNode;
  height?: string;
}

export const MapWrapper: React.FC<MapWrapperProps> = ({
  children,
  height = 'h-96',
}) => {
  return (
    <div
      className={`${height} bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative group`}
    >
      {/* Placeholder map container */}
      <div className="w-full h-full flex items-center justify-center">
        {children ? (
          children
        ) : (
          <div className="text-center">
            <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 mb-1">Map not loaded</p>
            <p className="text-xs text-slate-500">
              Integrate Mapbox GL JS or Leaflet
            </p>
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2 z-10">
        <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700">
          <Zap className="w-4 h-4 text-slate-300" />
        </button>
        <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700">
          <Navigation className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* Layer Toggle */}
      <div className="absolute bottom-4 left-4 bg-slate-800 border border-slate-700 rounded-lg p-3 max-w-xs space-y-2 z-10">
        <p className="text-xs font-semibold text-slate-300">Map Layers</p>
        <label className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 cursor-pointer">
          <input type="checkbox" defaultChecked className="rounded" />
          Convoy Routes
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 cursor-pointer">
          <input type="checkbox" className="rounded" />
          Incident Heatmap
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 cursor-pointer">
          <input type="checkbox" className="rounded" />
          High-Risk Zones
        </label>
      </div>
    </div>
  );
};
