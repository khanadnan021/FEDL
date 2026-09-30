import React, { useState } from 'react';
import { ShoppingBag, MapPin, Search, ChevronDown, Bike, Menu, X } from 'lucide-react';
import { Order } from '../types/food';

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
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

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
              title="Click to set or change your home delivery address"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Clean Primary Navigation with 'More' dropdown for secondary items */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-neutral-300">
            <a href="#trending-section" className="hover:text-amber-400 transition-colors">Trending</a>
            <a href="#menu-catalog" className="hover:text-amber-400 transition-colors">Menu</a>
            
            {/* Secondary dropdown for Kitchens, How it Works, Reviews */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors py-1 cursor-pointer"
              >
                <span>Discover</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsMoreMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-2xl p-2 shadow-2xl z-40 animate-in fade-in zoom-in-95">
                    <a
                      href="#featured-kitchens"
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="block px-3 py-2 rounded-xl text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                      Top Kitchens
                    </a>
                    <a
                      href="#how-it-works"
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="block px-3 py-2 rounded-xl text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                      How BiteCraft Works
                    </a>
                    <a
                      href="#special-offers"
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="block px-3 py-2 rounded-xl text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                      Special Offers
                    </a>
                    <a
                      href="#diner-reviews"
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="block px-3 py-2 rounded-xl text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                      Customer Reviews
                    </a>
                  </div>
                </>
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
                {cartTotal > 0 ? `$${cartTotal.toFixed(2)}` : 'Cart'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl"
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
              href="#menu-catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-900 rounded-xl text-neutral-200 text-center font-medium"
            >
              📖 Full Menu
            </a>
            <a
              href="#featured-kitchens"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-900 rounded-xl text-neutral-200 text-center font-medium"
            >
              👨‍🍳 Top Kitchens
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-900 rounded-xl text-neutral-200 text-center font-medium"
            >
              ⚡ How It Works
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
