import React from 'react';
import { Review } from '../types/food';
import { Star, ShieldCheck, Heart } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section id="diner-reviews" className="py-12 border-b border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verified Patron Experiences</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Loved by Students, Faculty & Foodies
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Every review corresponds to an authentic verified thermal delivery dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span className="text-amber-400 font-bold">4.92 / 5.0</span>
            <span className="text-neutral-600">·</span>
            <span>Over 1,200+ dishes rated</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 text-amber-400 font-bold flex items-center justify-center text-xs">
                      {rev.userAvatarLetter}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{rev.userName}</p>
                      <p className="text-[11px] text-neutral-400">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Ordered: <strong className="text-amber-400/90 font-medium">{rev.dishName}</strong></span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
