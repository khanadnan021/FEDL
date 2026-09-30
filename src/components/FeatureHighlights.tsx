import React from 'react';
import { Clock, ChefHat, Navigation, ShieldCheck } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Clock,
      title: '18–28 min Delivery',
      desc: 'Swift kitchen dispatch and thermal sealed bags',
    },
    {
      icon: ChefHat,
      title: 'Chef Crafted',
      desc: 'Artisan recipes with handpicked fresh ingredients',
    },
    {
      icon: Navigation,
      title: 'Live GPS',
      desc: 'Real-time doorstep courier tracking on map',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      desc: 'Instant UPI, Cards & Cash on Delivery supported',
    },
  ];

  return (
    <section className="py-6 border-b border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5 hidden xs:block">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
