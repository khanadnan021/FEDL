import React from 'react';
import { Dish } from '../types/food';
import { Plus, SlidersHorizontal, Star, Flame, Clock } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onOpenCustomize: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onOpenCustomize,
  onQuickAdd
}) => {
  return (
    <article className="group bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
      
      {/* Visual Asset Container (4:3) */}
      <div className="relative aspect-[4/3] bg-neutral-800/80 overflow-hidden cursor-pointer" onClick={() => onOpenCustomize(dish)}>
        <img
          src={dish.image}
          alt={dish.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Dietary Indicator */}
          <div className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-neutral-200">
            {dish.dietary.includes('veg') ? '🌱 Vegetarian' : '🥩 Signature Non-Veg'}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-lg px-2 py-1 text-[11px] font-bold text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="tabular-nums">{dish.rating}</span>
          </div>
        </div>

        {/* Quick prep & calories badge bottom left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] text-neutral-300 font-medium">
          <span className="bg-neutral-950/70 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-400" />
            {dish.prepTimeMinutes}m
          </span>
          <span className="bg-neutral-950/70 backdrop-blur-sm px-2 py-0.5 rounded-md">
            {dish.calories} kcal
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Restaurant & Category metadata with typographic middle dot */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1.5">
            <span className="text-amber-400/90 font-medium truncate">{dish.restaurantName}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="capitalize">{dish.category}</span>
          </div>

          {/* Dish Name */}
          <h3
            onClick={() => onOpenCustomize(dish)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          >
            {dish.name}
          </h3>

          {/* Dish Description */}
          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
            {dish.description}
          </p>

          {/* Ingredient Highlights */}
          <div className="mt-3 flex flex-wrap gap-1">
            {dish.ingredients.slice(0, 3).map((ingredient, i) => (
              <span
                key={i}
                className="text-[11px] text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded-md"
              >
                {ingredient}
              </span>
            ))}
            {dish.ingredients.length > 3 && (
              <span className="text-[11px] text-neutral-500 px-1 py-0.5">
                +{dish.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bottom Pricing & Action Buttons */}
        <div className="mt-5 pt-3.5 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-neutral-500">Starting from</p>
            <p className="text-lg font-extrabold text-white tabular-nums tracking-tight">
              ${dish.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Customize button */}
            <button
              onClick={() => onOpenCustomize(dish)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700/80 rounded-xl transition-all cursor-pointer"
              title="Customize portions and toppings"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>

            {/* Quick Add button */}
            <button
              onClick={() => onQuickAdd(dish)}
              className="w-9 h-9 rounded-xl bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center font-bold shadow-md shadow-amber-400/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Add default selection to cart"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
