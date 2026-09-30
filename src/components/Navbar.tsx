import React, { useState, useRef } from 'react';
import {
  ShoppingBag,
  MapPin,
  Search,
  Bike,
  Menu,
  X,
  ChevronDown,
  Flame,
  ChefHat,
  Tag,
  Utensils,
  Star,
  Clock,
  ArrowRight,
  Check,
  Plus,
  Sparkles
} from 'lucide-react';
import { Order, Dish } from '../types/food';
import { DISHES, RESTAURANTS, PROMO_CODES } from '../data/mockData';

interface NavbarProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeOrder: Order | null;
  onOpenOrderTracker: () => void;
  selectedLocation: string;
  onOpenLocationModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory?: (category: string) => void;
  onSelectDietary?: (dietary: string) => void;
  onSelectRestaurant?: (restaurantId: string | null) => void;
  onApplyPromo?: (code: string) => void;
  appliedPromo?: string | null;
  onOpenCustomize?: (dish: Dish) => void;
  onQuickAdd?: (dish: Dish) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  activeOrder,
  onOpenOrderTracker,
  selectedLocation,
  onOpenLocationModal,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onSelectDietary,
  onSelectRestaurant,
  onApplyPromo,
  appliedPromo,
  onOpenCustomize,
  onQuickAdd,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'trending' | 'kitchens' | 'offers' | 'menu' | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced hover handlers so mouse move between nav link and dropdown is smooth
  const handleMouseEnter = (menu: 'trending' | 'kitchens' | 'offers' | 'menu') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const closeDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(null);
  };

  // Top 4 trending dishes for dropdown
  const topTrendingDishes = [
    DISHES.find((d) => d.id === 'dish-1')!, // Truffle Burrata Margherita
    DISHES.find((d) => d.id === 'dish-2')!, // Double Wagyu Smash
    DISHES.find((d) => d.id === 'dish-9')!, // Azad Butter Chicken
    DISHES.find((d) => d.id === 'dish-3')!, // Tonkotsu Ramen
  ].filter(Boolean);

  const categories = [
    { id: 'all', label: 'All Dishes', icon: '✨', count: '12 items' },
    { id: 'pizza', label: 'Artisan Pizzas', icon: '🍕', count: 'Wood-fired' },
    { id: 'burger', label: 'Wagyu Burgers', icon: '🍔', count: 'Smash grill' },
    { id: 'ramen', label: 'Craft Ramen', icon: '🍜', count: '20hr broth' },
    { id: 'indian', label: 'Royal Indian', icon: '🍛', count: 'Claypot gravies' },
    { id: 'bowls', label: 'Healthy Bowls', icon: '🥗', count: 'Organic greens' },
    { id: 'desserts', label: 'Sweet Treats', icon: '🍰', count: 'Fresh daily' },
    { id: 'sides', label: 'Crispy Sides', icon: '🍟', count: 'Fries & dips' },
  ];

  const dietaryFilters = [
    { id: 'all', label: 'All Cuisines', emoji: '🍽️' },
    { id: 'veg', label: '🌱 Pure Vegetarian', emoji: '🌱' },
    { id: 'non-veg', label: '🥩 Non-Vegetarian', emoji: '🥩' },
    { id: 'gluten-free', label: '🌾 Gluten-Free', emoji: '🌾' },
    { id: 'chef-special', label: '⭐ Chef Specials', emoji: '⭐' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Brand Logo & Prominent Delivering To */}
          <div className="flex items-center gap-4 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                🍽️
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                BiteCraft
              </span>
            </a>

            {/* Prominent Delivery Location in Top Bar */}
            <div
              onClick={onOpenLocationModal}
              className="hidden md:flex items-center gap-2 pl-3 py-1.5 border-l border-neutral-800 text-left cursor-pointer group"
              title="Click to set or change your delivery address"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="max-w-[190px] lg:max-w-[240px]">
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                  <span>Delivering to</span>
                  <span className="text-amber-400 group-hover:underline">Home</span>
                </p>
                <p className="text-xs text-white font-medium truncate mt-0.2">
                  {selectedLocation}
                </p>
              </div>
              <span className="text-[11px] text-amber-400 font-semibold group-hover:underline pl-1 shrink-0">
                Change
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search pizza, wagyu burger, butter chicken..."
                className="w-full bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-neutral-100 rounded-xl pl-10 pr-8 py-2 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-neutral-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Primary Navigation with Rich Hover Dropdowns */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold text-neutral-300">
            
            {/* 1. TRENDING DROPDOWN */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter('trending')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#trending-section"
                onClick={closeDropdown}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeDropdown === 'trending'
                    ? 'bg-neutral-900 text-amber-400'
                    : 'hover:text-amber-400 hover:bg-neutral-900/60'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${activeDropdown === 'trending' ? 'text-amber-400' : 'text-neutral-400'}`} />
                <span>Trending</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  activeDropdown === 'trending' ? 'rotate-180 text-amber-400' : 'text-neutral-500'
                }`} />
              </a>

              {/* Trending Mega Dropdown Menu */}
              {activeDropdown === 'trending' && (
                <div
                  className="absolute left-0 lg:-left-12 top-full pt-1 w-[420px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('trending')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 shadow-2xl shadow-black/80 rounded-2xl p-4 overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">
                          🔥
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white tracking-tight">Trending Right Now</p>
                          <p className="text-[11px] text-neutral-400">Patron favorites ordered in real time</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        High Demand
                      </span>
                    </div>

                    <div className="space-y-2">
                      {topTrendingDishes.map((dish) => (
                        <div
                          key={dish.id}
                          className="flex items-center justify-between p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-950 transition-all group"
                        >
                          <div
                            onClick={() => {
                              onOpenCustomize?.(dish);
                              closeDropdown();
                            }}
                            className="flex items-center gap-3 cursor-pointer min-w-0 flex-1 pr-2"
                          >
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-neutral-800 group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                                {dish.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-neutral-400">
                                <span className="text-amber-400 font-bold">₹{dish.price}</span>
                                <span>·</span>
                                <span className="flex items-center gap-0.5 text-amber-300">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  {dish.rating}
                                </span>
                                <span>·</span>
                                <span>{dish.prepTimeMinutes}m</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                onQuickAdd?.(dish);
                                closeDropdown();
                              }}
                              title="Quick add to basket"
                              className="p-1.5 bg-neutral-800 hover:bg-amber-400 hover:text-black text-neutral-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onOpenCustomize?.(dish);
                                closeDropdown();
                              }}
                              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Customize
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#trending-section"
                      onClick={closeDropdown}
                      className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Explore all trending items</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 2. KITCHENS DROPDOWN */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter('kitchens')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#featured-kitchens"
                onClick={closeDropdown}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeDropdown === 'kitchens'
                    ? 'bg-neutral-900 text-amber-400'
                    : 'hover:text-amber-400 hover:bg-neutral-900/60'
                }`}
              >
                <ChefHat className={`w-3.5 h-3.5 ${activeDropdown === 'kitchens' ? 'text-amber-400' : 'text-neutral-400'}`} />
                <span>Kitchens</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  activeDropdown === 'kitchens' ? 'rotate-180 text-amber-400' : 'text-neutral-500'
                }`} />
              </a>

              {/* Kitchens Mega Dropdown Menu */}
              {activeDropdown === 'kitchens' && (
                <div
                  className="absolute -left-16 lg:left-0 top-full pt-1 w-[450px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('kitchens')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 shadow-2xl shadow-black/80 rounded-2xl p-4 overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">
                          👨‍🍳
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white tracking-tight">Top Partner Kitchens</p>
                          <p className="text-[11px] text-neutral-400">Click any kitchen to view its dedicated menu</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                        4.8+ Avg Rating
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {RESTAURANTS.map((rest) => (
                        <div
                          key={rest.id}
                          onClick={() => {
                            onSelectRestaurant?.(rest.id);
                            closeDropdown();
                          }}
                          className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-amber-400/50 hover:bg-neutral-950 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <img
                              src={rest.image}
                              alt={rest.name}
                              className="w-8 h-8 rounded-lg object-cover border border-neutral-800 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                                {rest.name}
                              </p>
                              <div className="flex items-center gap-1 text-[10px] text-amber-400">
                                <Star className="w-2.5 h-2.5 fill-amber-400" />
                                <span>{rest.rating}</span>
                                <span className="text-neutral-500">·</span>
                                <span className="text-neutral-400">{rest.deliveryMinutes}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-neutral-400 line-clamp-1">
                            {rest.cuisine}
                          </p>

                          <div className="mt-1.5 pt-1.5 border-t border-neutral-900 flex items-center justify-between text-[10px]">
                            <span className="text-neutral-500 truncate">{rest.badge}</span>
                            <span className="text-amber-400 font-semibold group-hover:underline">View ➔</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#featured-kitchens"
                      onClick={closeDropdown}
                      className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>View all kitchen profiles & addresses</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. OFFERS DROPDOWN */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter('offers')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#special-offers"
                onClick={closeDropdown}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeDropdown === 'offers'
                    ? 'bg-neutral-900 text-amber-400'
                    : 'hover:text-amber-400 hover:bg-neutral-900/60'
                }`}
              >
                <Tag className={`w-3.5 h-3.5 ${activeDropdown === 'offers' ? 'text-amber-400' : 'text-neutral-400'}`} />
                <span>Offers</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  activeDropdown === 'offers' ? 'rotate-180 text-amber-400' : 'text-neutral-500'
                }`} />
              </a>

              {/* Offers Mega Dropdown Menu */}
              {activeDropdown === 'offers' && (
                <div
                  className="absolute -left-20 lg:-left-12 top-full pt-1 w-[400px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('offers')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 shadow-2xl shadow-black/80 rounded-2xl p-4 overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">
                          🏷️
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white tracking-tight">Active Promo Coupons</p>
                          <p className="text-[11px] text-neutral-400">Click apply to add coupon directly to cart</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                        4 Vouchers
                      </span>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(PROMO_CODES).map(([code, promo]) => {
                        const isApplied = appliedPromo === code;
                        return (
                          <div
                            key={code}
                            className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                              isApplied
                                ? 'bg-amber-500/10 border-amber-500/50'
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                                  {code}
                                </span>
                                {promo.discountPercent && (
                                  <span className="text-[10px] text-emerald-400 font-bold">
                                    {promo.discountPercent}% OFF
                                  </span>
                                )}
                                {promo.freeDelivery && (
                                  <span className="text-[10px] text-cyan-400 font-bold">
                                    Free Delivery
                                  </span>
                                )}
                                {promo.flatDiscount && (
                                  <span className="text-[10px] text-orange-400 font-bold">
                                    ₹{promo.flatDiscount} Flat Off
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-300 mt-1 truncate">
                                {promo.label}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                onApplyPromo?.(code);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                                isApplied
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                                  : 'bg-amber-400 hover:bg-amber-300 text-black shadow-sm'
                              }`}
                            >
                              {isApplied ? (
                                <span className="flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" />
                                  Applied
                                </span>
                              ) : (
                                'Apply'
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <a
                      href="#special-offers"
                      onClick={closeDropdown}
                      className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Explore all deals & terms</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 4. FULL MENU DROPDOWN */}
            <div
              className="relative py-4"
              onMouseEnter={() => handleMouseEnter('menu')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#menu-catalog"
                onClick={closeDropdown}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeDropdown === 'menu'
                    ? 'bg-neutral-900 text-amber-400'
                    : 'hover:text-amber-400 hover:bg-neutral-900/60'
                }`}
              >
                <Utensils className={`w-3.5 h-3.5 ${activeDropdown === 'menu' ? 'text-amber-400' : 'text-neutral-400'}`} />
                <span>Full Menu</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  activeDropdown === 'menu' ? 'rotate-180 text-amber-400' : 'text-neutral-500'
                }`} />
              </a>

              {/* Full Menu Mega Dropdown Menu */}
              {activeDropdown === 'menu' && (
                <div
                  className="absolute right-0 top-full pt-1 w-[460px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('menu')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 shadow-2xl shadow-black/80 rounded-2xl p-4 overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">
                          📖
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white tracking-tight">Complete Menu Navigator</p>
                          <p className="text-[11px] text-neutral-400">Quick-jump to your craving or dietary filter</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                        12+ Dishes
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Left Column: Cuisines */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                          By Cuisine
                        </p>
                        <div className="space-y-1">
                          {categories.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                onSelectCategory?.(c.id);
                                closeDropdown();
                              }}
                              className="w-full text-left p-1.5 rounded-lg hover:bg-neutral-800 flex items-center justify-between group transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{c.icon}</span>
                                <span className="text-xs font-semibold text-neutral-300 group-hover:text-amber-400 transition-colors">
                                  {c.label}
                                </span>
                              </div>
                              <span className="text-[10px] text-neutral-500 group-hover:text-neutral-400">
                                {c.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Dietary Preferences */}
                      <div className="border-l border-neutral-800/80 pl-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                          Dietary Preferences
                        </p>
                        <div className="space-y-1.5">
                          {dietaryFilters.map((diet) => (
                            <button
                              key={diet.id}
                              type="button"
                              onClick={() => {
                                onSelectDietary?.(diet.id);
                                closeDropdown();
                              }}
                              className="w-full text-left p-2 rounded-lg bg-neutral-950/60 border border-neutral-800 hover:border-amber-400/40 hover:bg-neutral-950 flex items-center gap-2 group transition-all cursor-pointer"
                            >
                              <span className="text-sm">{diet.emoji}</span>
                              <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                                {diet.label}
                              </span>
                            </button>
                          ))}
                        </div>

                        <div className="mt-4 p-2.5 rounded-xl bg-amber-400/5 border border-amber-400/15">
                          <p className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Quick Tip</span>
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5 leading-snug">
                            All dishes support customized spice levels, portion sizing, and kitchen notes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <a
                      href="#menu-catalog"
                      onClick={() => {
                        onSelectCategory?.('all');
                        onSelectDietary?.('all');
                        onSelectRestaurant?.(null);
                        closeDropdown();
                      }}
                      className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <span>Show All Dishes Without Filters</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Show Live Order Tracking Button ONLY when user actually has an active order */}
            {activeOrder && (
              <button
                onClick={onOpenOrderTracker}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/40 rounded-xl hover:bg-amber-500/25 transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                title="View Live GPS Delivery Tracking"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <Bike className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Track Order ({activeOrder.id})</span>
                <span className="sm:hidden">Tracking</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md shadow-amber-400/20 transition-all cursor-pointer whitespace-nowrap group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-neutral-950 text-amber-400 text-[10px] font-bold rounded-full flex items-center justify-center border border-amber-400">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="tabular-nums font-extrabold">
                {cartTotal > 0 ? `₹${Math.round(cartTotal)}` : 'Cart'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Search & Location Bar */}
        <div className="md:hidden pb-3 pt-1 space-y-2">
          <div
            onClick={onOpenLocationModal}
            className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="truncate text-xs">
                <span className="text-neutral-400">Delivering to: </span>
                <span className="text-white font-semibold">{selectedLocation}</span>
              </div>
            </div>
            <span className="text-[11px] text-amber-400 font-bold shrink-0 ml-2">Change</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search dishes, burgers, pizza..."
              className="w-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-neutral-800 grid grid-cols-2 gap-2 text-xs">
            <a
              href="#trending-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-900 rounded-xl text-neutral-200 text-center font-medium"
            >
              🔥 Trending
            </a>
            <a
              href="#featured-kitchens"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-900 rounded-xl text-neutral-200 text-center font-medium"
            >
              👨‍🍳 Kitchens
            </a>
            <a
              href="#special-offers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-900 rounded-xl text-neutral-200 text-center font-medium"
            >
              🏷️ Offers
            </a>
            <a
              href="#menu-catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-900 rounded-xl text-neutral-200 text-center font-medium"
            >
              📖 Full Menu
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
