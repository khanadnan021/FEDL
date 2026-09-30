import React from 'react';
import { Dish } from '../types/food';
import { Star, Plus, Flame, Clock } from 'lucide-react';

interface TrendingSectionProps {
  trendingDishes: Dish[];
  onOpenCustomize: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  trendingDishes,
  onOpenCustomize,
  onQuickAdd,
}) => {
  return (
    <section id="trending-section" className="py-10 border-b border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs">
                <Flame className="w-3.5 h-3.5 fill-orange-400" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Most Ordered Today
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Trending Right Now
            </h2>
          </div>

          <a
            href="#menu-catalog"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer hidden sm:block"
          >
            View All Dishes ➔
          </a>
        </div>

        {/* Trending Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingDishes.map((dish) => (
            <div
              key={dish.id}
              className="group bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
            >
              {/* Image Container with 4:3 Aspect */}
              <div
                className="relative aspect-[4/3] bg-neutral-800 overflow-hidden cursor-pointer"
                onClick={() => onOpenCustomize(dish)}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60" />

                {/* Rating Badge */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-neutral-950/85 backdrop-blur-md border border-neutral-800 rounded-lg px-2 py-1 text-[11px] font-bold text-amber-400 shadow">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="tabular-nums">{dish.rating}</span>
                </div>

                {/* Prep Time */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[11px] text-neutral-300 bg-neutral-950/80 backdrop-blur-md px-2 py-0.5 rounded-md font-medium">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  <span>{dish.prepTimeMinutes} mins</span>
                </div>
              </div>

              {/* Dish Info & Action */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] text-amber-400 font-semibold truncate">
                    {dish.restaurantName}
                  </p>
                  <h3
                    onClick={() => onOpenCustomize(dish)}
                    className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer mt-1 line-clamp-1"
                  >
                    {dish.name}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                {/* Price and Add button */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <p className="text-base font-extrabold text-white tabular-nums">
                    ${dish.price.toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={() => onQuickAdd(dish)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md shadow-amber-400/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
                    title="Add to cart"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
