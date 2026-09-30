import React from 'react';
import { Search, Sliders, Bike, Heart } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Choose Your Dish',
      desc: 'Explore curated menus from premier local kitchens, from authentic Neapolitan pizzas to claypot curries.',
    },
    {
      step: '02',
      icon: Sliders,
      title: 'Customize Your Order',
      desc: 'Pick your portion size, add extra cheese or toppings, and add custom kitchen instructions.',
    },
    {
      step: '03',
      icon: Bike,
      title: 'Live GPS Dispatch',
      desc: 'Track your assigned courier in real time on our simulated route map from the oven to your doorstep.',
    },
    {
      step: '04',
      icon: Heart,
      title: 'Fresh Doorstep Drop',
      desc: 'Enjoy piping hot, contactless delivery with simple payment via Card, UPI, or Cash on Delivery.',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 border-b border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            How BiteCraft Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Seamless food ordering with fast restaurant dispatch and real-time live courier tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-neutral-700 font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
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
