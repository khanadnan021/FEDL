import React from 'react';
import { Tag, Sparkles, Check, ArrowRight } from 'lucide-react';

interface SpecialOffersProps {
  onApplyCode: (code: string) => void;
  appliedPromo: string | null;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  onApplyCode,
  appliedPromo,
}) => {
  const deals = [
    {
      code: 'CRAVE20',
      title: '20% OFF Welcome Deal',
      desc: 'Get 20% off on your first food order with no minimum limit.',
      tag: 'Most Popular',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    },
    {
      code: 'FREESHIP',
      title: 'Free Priority Delivery',
      desc: 'Zero delivery fee on all chef-crafted orders above $30.',
      tag: 'Free Shipping',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    },
    {
      code: 'WELCOME5',
      title: '$5 Instant Credit',
      desc: 'Instant $5 deduction applied at checkout to your subtotal.',
      tag: 'Flat Discount',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30',
    },
  ];

  return (
    <section id="special-offers" className="py-10 border-b border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Deals & Vouchers</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Special Offers For You
            </h2>
          </div>
          <p className="text-xs text-neutral-400">
            Tap any voucher code to apply it directly to your food basket
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {deals.map((deal) => {
            const isApplied = appliedPromo === deal.code;
            return (
              <div
                key={deal.code}
                className={`p-5 rounded-2xl bg-gradient-to-br ${deal.color} border flex flex-col justify-between space-y-4`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300">
                      {deal.tag}
                    </span>
                    {isApplied && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        Applied
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mt-2.5">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {deal.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white bg-neutral-900/80 px-2.5 py-1 rounded-lg border border-neutral-700">
                    <Tag className="w-3 h-3 text-amber-400" />
                    <span>{deal.code}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onApplyCode(deal.code)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-500 text-black font-extrabold'
                        : 'bg-amber-400 hover:bg-amber-300 text-black'
                    }`}
                  >
                    {isApplied ? 'In Basket ✓' : 'Apply Code'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
