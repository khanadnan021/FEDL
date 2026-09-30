import React from 'react';
import { HERO_IMAGE } from '../data/mockData';
import { Sparkles, MapPin, ArrowRight, Bike, Compass } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onTrackOrder: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  deliveryLocation: string;
  onOpenLocationModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onTrackOrder,
  selectedCategory,
  onSelectCategory,
  deliveryLocation,
  onOpenLocationModal,
}) => {
  // Enhanced craving categories with attractive food icons per instructions
  const categories = [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'burger', label: 'Burgers', icon: '🍔' },
    { id: 'ramen', label: 'Ramen', icon: '🍜' },
    { id: 'indian', label: 'Indian', icon: '🍛' },
    { id: 'bowls', label: 'Healthy', icon: '🥗' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-10 lg:py-12 border-b border-neutral-800/60 bg-gradient-to-b from-neutral-900/50 via-neutral-950 to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, 1-2 line description, 2 CTAs, Location & Categories */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Prominent Delivery Location Pill */}
            <div
              onClick={onOpenLocationModal}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-xs cursor-pointer transition-all group"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-neutral-400">Delivering to:</span>
              <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-[280px]">
                Home · {deliveryLocation}
              </span>
              <span className="text-amber-400 font-bold group-hover:underline text-[11px] ml-1">
                Change
              </span>
            </div>

            {/* Simplified 2-Line Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Chef-crafted food,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
                delivered to your door.
              </span>
            </h1>

            {/* Reduced 1-2 Line Description */}
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Order freshly prepared artisan meals from premier local kitchens with real-time GPS tracking right to your doorstep.
            </p>

            {/* Two Clear CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onTrackOrder}
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-600 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <Bike className="w-4 h-4 text-amber-400" />
                <span>Track Order</span>
              </button>
            </div>

            {/* Improved Craving Categories with Attractive Food Icons */}
            <div className="space-y-2.5 pt-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Popular Cravings:
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-amber-400 text-black shadow-md shadow-amber-400/25 scale-105'
                          : 'bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-850'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Clean Hero Image with Simplified Uncrowded Promo Pill */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl shadow-black/80 aspect-[16/11] sm:aspect-[4/3] group">
              <img
                src={HERO_IMAGE}
                alt="Chef-crafted food delivery feast"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              
              {/* Simplified, uncrowded promotional chip */}
              <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/85 backdrop-blur-md border border-neutral-800 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">20% OFF Your First Order</p>
                    <p className="text-[11px] text-neutral-400">Use code <span className="font-mono text-amber-400 font-bold">CRAVE20</span></p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onExploreMenu}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
