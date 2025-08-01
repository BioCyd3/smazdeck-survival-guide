import React from 'react';
import { cn } from '../../lib/utils';
import { 
  Bars3Icon,
  EyeIcon,
  ArrowPathIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const TierListControls = ({ 
  isDragMode, 
  onToggleDragMode, 
  onResetOrder, 
  hasChanges = false,
  onShowInfo,
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-wrap items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700",
      className
    )}>
      {/* Enhanced Mode Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleDragMode}
          className={cn(
            "flex items-center gap-3 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border-2",
            isDragMode
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 shadow-lg shadow-amber-400/30 border-amber-400 hover:shadow-xl hover:shadow-amber-400/40 scale-105"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border-slate-600 hover:border-slate-500 backdrop-blur-sm"
          )}
        >
          {isDragMode ? (
            <>
              <EyeIcon className="w-5 h-5" />
              <span>View Mode</span>
            </>
          ) : (
            <>
              <Bars3Icon className="w-5 h-5" />
              <span>Edit Mode</span>
            </>
          )}
        </button>

        {/* Enhanced mode indicator */}
        <div className="flex items-center gap-3 text-sm">
          <div className={cn(
            "w-3 h-3 rounded-full border-2 transition-all duration-300",
            isDragMode 
              ? "bg-amber-400 border-amber-300 animate-pulse shadow-lg shadow-amber-400/50" 
              : "bg-slate-500 border-slate-400"
          )} />
          <div className="flex flex-col">
            <span className={cn(
              "font-medium transition-colors duration-200",
              isDragMode ? "text-amber-300" : "text-slate-400"
            )}>
              {isDragMode ? 'Editing enabled' : 'View only'}
            </span>
            <span className="text-xs text-slate-500">
              {isDragMode ? 'Drag & drop active' : 'Read-only mode'}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-slate-600" />

      {/* Reset Button */}
      {hasChanges && (
        <button
          onClick={onResetOrder}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Reset Changes
        </button>
      )}

      {/* Info Button */}
      <button
        onClick={onShowInfo}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-300 hover:bg-slate-700 transition-all duration-200"
      >
        <InformationCircleIcon className="w-4 h-4" />
        How to Use
      </button>

      {/* Instructions (shown when in drag mode) */}
      {isDragMode && (
        <div className="w-full mt-4 p-4 bg-amber-400/10 border border-amber-400/30 rounded-lg">
          <div className="flex items-start gap-3">
            <InformationCircleIcon className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-amber-300 font-medium mb-2">
                Drag & Drop Instructions:
              </p>
              <ul className="text-amber-200/80 space-y-1 text-xs">
                <li>• Click and drag any Smaz card to move it between tiers</li>
                <li>• Drop zones will highlight when you drag over them</li>
                <li>• Changes are temporary until you save or export</li>
                <li>• Use "Reset Changes" to undo all modifications</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TierListControls;