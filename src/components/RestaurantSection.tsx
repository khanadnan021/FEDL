import React, { useState } from 'react';
import { Restaurant } from '../types/food';
import { Star, Clock, Bike, Check, Tag, Sparkles, ArrowRight, ImagePlus } from 'lucide-react';

interface RestaurantSectionProps {
  restaurants: Restaurant[];
  selectedRestaurantId: string | null;
  onSelectRestaurant: (id: string | null) => void;
}

export const RestaurantSection: React.FC<RestaurantSectionProps> = ({
  restaurants,
  selectedRestaurantId,
  onSelectRestaurant
}) => {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (restaurantId: string) => {
    setImageErrorMap((prev) => ({ ...prev, [restaurantId]: true }));
  };

  return (
    <section id="featured-kitchens" className="py-12 border-b border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Handpicked Partners</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Top Kitchens Near You
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Verified chef-led kitchens delivering hot artisan dining with real-time GPS tracking.
            </p>
          </div>

          {selectedRestaurantId && (
            <button
              type="button"
              onClick={() => onSelectRestaurant(null)}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer self-start sm:self-auto flex items-center gap-1"
            >
              <span>Showing filtered kitchen</span>
              <span>· View All</span>
            </button>
          )}
        </div>

        {/* High-End Restaurants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => {
            const isSelected = selectedRestaurantId === restaurant.id;
            const hasImageError = Boolean(imageErrorMap[restaurant.id]);

            return (
              <div
                key={restaurant.id}
                onClick={() => onSelectRestaurant(isSelected ? null : restaurant.id)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10 -translate-y-1'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1'
                }`}
              >
                {/* Visual Banner Image Area */}
                <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                  {!hasImageError ? (
                    <>
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(restaurant.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40" />
                    </>
                  ) : (
                    /* Elegant placeholder while waiting for user upload */
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-b border-neutral-800/80 text-center">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-black text-amber-400">{restaurant.logoLetter}</span>
                      </div>
                      <span className="text-[11px] font-bold text-neutral-300 flex items-center gap-1">
                        <ImagePlus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ready for {restaurant.image.replace('/kitchens/', '')}</span>
                      </span>
                      <span className="text-[10px] text-neutral-500 mt-0.5">
                        Upload to public/kitchens/
                      </span>
                    </div>
                  )}

                  {/* Top Badges: Michelin / Chef recommended & Rating */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {restaurant.badge ? (
                      <span className="bg-neutral-950/85 backdrop-blur-md border border-neutral-700/80 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
                        {restaurant.badge}
                      </span>
                    ) : <span />}

                    <div className="flex items-center gap-1 bg-neutral-950/90 backdrop-blur-md border border-neutral-700/80 rounded-lg px-2.5 py-1 text-[11px] font-bold text-amber-400 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="tabular-nums">{restaurant.rating}</span>
                      <span className="text-neutral-400 text-[10px]">({restaurant.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Bottom Ribbon on Image: Discount / Perk */}
                  {restaurant.discountOffer && (
                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-lg">
                        <Tag className="w-3 h-3 text-black stroke-[2.5]" />
                        <span>{restaurant.discountOffer}</span>
                      </div>
                    </div>
                  )}

                  {/* Selected Kitchen Overlay Badge */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-500/10 flex items-center justify-center pointer-events-none">
                      <div className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Filter Active</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {restaurant.name}
                      </h3>
                    </div>

                    <p className="text-xs text-amber-400/90 font-medium mt-0.5 truncate">
                      {restaurant.cuisine}
                    </p>

                    <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                      {restaurant.heroTag}
                    </p>
                  </div>

                  {/* Delivery & Fee Footer */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-300">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{restaurant.deliveryMinutes}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-medium">
                      <Bike className="w-3.5 h-3.5 text-neutral-400" />
                      <span className={restaurant.deliveryFee === 0 ? 'text-emerald-400 font-bold' : ''}>
                        {restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee} Delivery`}
                      </span>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
