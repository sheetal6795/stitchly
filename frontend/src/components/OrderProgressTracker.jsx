import React from 'react';
import { Check, Clock, Scissors, Sparkles, Truck, CheckCircle2 } from 'lucide-react';

const STAGES = [
  { key: 'PLACED', label: 'Placed', icon: Clock, desc: 'Commission Accepted' },
  { key: 'MEASUREMENTS_CONFIRMED', label: 'Measurements', icon: Scissors, desc: 'Pattern Drafted' },
  { key: 'IN_PRODUCTION', label: 'Production', icon: Sparkles, desc: 'Fabric Hand-Stitched' },
  { key: 'FITTINGS_READY', label: 'Fittings Ready', icon: Scissors, desc: 'Toile Validated' },
  { key: 'SHIPPED', label: 'Shipped', icon: Truck, desc: 'In Transit' },
  { key: 'COMPLETED', label: 'Delivered', icon: CheckCircle2, desc: 'Commission Complete' },
];

export const OrderProgressTracker = ({ currentStatus }) => {
  const currentIdx = STAGES.findIndex((s) => s.key === currentStatus);
  const activeIdx = currentIdx >= 0 ? currentIdx : 0;
  const isCancelled = currentStatus === 'CANCELLED';

  if (isCancelled) {
    return (
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-medium flex items-center justify-between">
        <span>Order has been Cancelled</span>
        <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-200">Cancelled</span>
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Progress bar background line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-couture-800 -z-0" />
        
        {/* Active progress bar line */}
        <div
          className="absolute top-4 left-6 h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 -z-0 transition-all duration-700"
          style={{ width: `${(activeIdx / (STAGES.length - 1)) * 92}%` }}
        />

        {STAGES.map((stage, idx) => {
          const isPassed = idx < activeIdx;
          const isCurrent = idx === activeIdx;
          const Icon = stage.icon;

          return (
            <div key={stage.key} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isPassed
                    ? 'bg-gold-500 text-couture-950 ring-2 ring-gold-400 shadow-glow-gold'
                    : isCurrent
                    ? 'bg-couture-950 text-gold-400 ring-2 ring-gold-400 ring-offset-2 ring-offset-couture-950 animate-pulse'
                    : 'bg-couture-900 text-couture-500 ring-1 ring-couture-700'
                }`}
              >
                {isPassed ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              <span
                className={`text-[11px] font-semibold mt-2 text-center transition-colors ${
                  isCurrent
                    ? 'text-gold-300 font-bold'
                    : isPassed
                    ? 'text-couture-200'
                    : 'text-couture-500'
                }`}
              >
                {stage.label}
              </span>

              <span className="text-[9px] text-couture-500 hidden sm:block text-center mt-0.5">
                {stage.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
