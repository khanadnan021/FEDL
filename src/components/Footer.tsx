import React from 'react';
import { ShieldCheck, Heart, MapPin, Bike } from 'lucide-react';

interface FooterProps {
  onOpenLocationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLocationModal }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-400 text-black flex items-center justify-center font-bold text-sm">
                🍽️
              </span>
              <span className="text-lg font-bold text-white tracking-tight">
                BiteCraft
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Freshly prepared artisanal dining delivered straight to your doorstep with live GPS order tracking, transparent pricing, and instant courier dispatch.
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenLocationModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-amber-400 font-semibold cursor-pointer transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Set or Change Delivery Address</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="text-white font-bold text-xs uppercase tracking-wider">Cuisines</p>
            <ul className="space-y-1.5 text-neutral-400">
              <li><a href="#menu-catalog" className="hover:text-amber-400 transition-colors">Artisan Neapolitan Pizzas</a></li>
              <li><a href="#menu-catalog" className="hover:text-amber-400 transition-colors">Gourmet Wagyu Smash Burgers</a></li>
              <li><a href="#menu-catalog" className="hover:text-amber-400 transition-colors">Simmered Tonkotsu Ramen</a></li>
              <li><a href="#menu-catalog" className="hover:text-amber-400 transition-colors">Organic Green Harvest Bowls</a></li>
            </ul>
          </div>

          {/* Customer Service & Delivery */}
          <div className="space-y-2">
            <p className="text-white font-bold text-xs uppercase tracking-wider">Delivery & Support</p>
            <ul className="space-y-1.5 text-neutral-400">
              <li><span className="text-neutral-300">Live GPS Tracking:</span> Active on all orders</li>
              <li><span className="text-neutral-300">Dispatch Speed:</span> 15-28 mins</li>
              <li><span className="text-neutral-300">Payments:</span> UPI, Cards, Cash On Delivery</li>
              <li><span className="text-neutral-300">Contactless Drop:</span> Supported</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <p>© 2026 BiteCraft Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Contactless Delivery Guaranteed
            </span>
            <span>·</span>
            <span>Live Food Delivery Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
