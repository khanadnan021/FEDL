import React from 'react';
import { ShieldCheck, MapPin, Sparkles, Award, UtensilsCrossed, History, Flame, Crown, ArrowRight } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';

interface FooterProps {
  onOpenLocationModal: () => void;
  onSelectRestaurant?: (restaurantId: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLocationModal, onSelectRestaurant }) => {
  const heritageStories = [
    {
      id: 'rest-4',
      name: 'Ramashray (Matunga)',
      establishedYear: '1939',
      yearsOfGlory: '87 Glorious Years',
      tagline: 'Pure Veg Ki Shaan · Desi Ghee Ka Taj Mahal',
      story: 'Bhandarkar Road par subah 5:30 baje se lagne wali aam aur khas ki kataar Ramashray ki shaan ki gawaah hai. Inka shuddh desi ghee se lathpath Pineapple Sheera aur gun-powder podi thatte idlis Mumbai ke dil ki dhadkan hain.',
      signatureDishes: ['Desi Ghee Pineapple Sheera', 'Butter Podi Thatte Idli', 'Mysore Masala Dosa'],
      badge: 'Estd. 1939 Legend',
      image: '/kitchens/ramashray.png',
      heritageHonor: '85+ years of zero-compromise pure vegetarian mastery'
    },
    {
      id: 'rest-3',
      name: 'Cafe Madras (Matunga Circle)',
      establishedYear: '1940',
      yearsOfGlory: '86 Years of Heritage',
      tagline: 'Pre-Independence Era Ka Shandar Filter Kaapi Ghar',
      story: 'Matunga Circle House mein 1940 se sthit Cafe Madras sirf ek restaurant nahi, balki Mumbai ka aitihasik sanskritik sangam hai. 3 peedhiyon se peetal ke dabarah mein parosi jane wali kadak filter coffee aur crispy butter dosas ki parampara aaj bhi atoot hai.',
      signatureDishes: ['Traditional Brass Dabarah Filter Coffee', 'Crispy Butter Masala Dosa', 'Rasam Vada'],
      badge: 'Estd. 1940 Heritage',
      image: '/kitchens/madras.png',
      heritageHonor: 'Honored across generations by legendary artists & foodies'
    },
    {
      id: 'rest-1',
      name: 'Azad Restaurant (Bazaar Road)',
      establishedYear: 'Heritage Era',
      yearsOfGlory: 'Royal Mughlai Legacy',
      tagline: 'Shahi Dawat, Koyla Sigri Aur Bawarchiyon Ka Hunar',
      story: 'Purani Bombay ke Bazaar Road par roshan Azad Restaurant royal Mughlai zaiqe ka sardar hai. Koyle ki sigri par dheemi aanch par bhune seekh kebabs, makhmali shahi butter chicken aur dum biryani ke zaaiqe mein sadiyon ki nawabi dastaan basti hai.',
      signatureDishes: ['Charcoal Sigri Seekh Kebab', 'Royal Mughlai Butter Chicken', 'Shahi Dum Biryani'],
      badge: 'Royal Bawarchi Legacy',
      image: '/kitchens/azad.png',
      heritageHonor: 'Preserving authentic charcoal sigri slow-cooking methods'
    },
    {
      id: 'rest-2',
      name: 'Mangalore Naaz (CSMT)',
      establishedYear: 'CSMT Landmark',
      yearsOfGlory: 'Coastal Cuisine Pride',
      tagline: 'South Bombay Ka Aitihasik Coastal & Ghee Roast Thikana',
      story: 'Victoria Terminus (CSMT) ke dil mein 281 SBS Road par sthit Mangalore Naaz ne Karnataka ke tatiye ilaqon ke authentic Kundapura masalon aur teekhe Mangalorean ghee roast se poore Mumbai ko apna deewana banaya hai.',
      signatureDishes: ['Kundapura Ghee Roast', 'Flaky Malabar Parotta', 'Coastal Coconut Curry'],
      badge: 'Historic Landmark',
      image: '/kitchens/naaz.png',
      heritageHonor: 'Celebrated bridge connecting Coastal Karnataka & Bombay heritage'
    }
  ];

  return (
    <footer className="bg-neutral-950 border-t-2 border-amber-500/30 text-neutral-300 relative overflow-hidden">
      {/* Decorative ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* Grand Heritage Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-orange-500/15 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase shadow-lg shadow-amber-500/10">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Virasat Aur Shaan · Bright History of Legendary Kitchens</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            80+ Barson Ki Parampara,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
              Mumbai Ke Sabse Shandar Kitchens Ka Asli Swad.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Ye koi aam cloud kitchens nahi hain—ye Bharat ke vo aitihasik culinary institutions hain jinki deewaron mein sadiyon ka tajurba, asli koyle ki aanch, aur shuddh khandani masalon ki be-misaal shaan basti hai.
          </p>
        </div>

        {/* 4 Heritage Showcases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {heritageStories.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-br from-neutral-900/90 via-neutral-900/70 to-neutral-950 border border-neutral-800 hover:border-amber-400/60 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-xl shadow-black/60 flex flex-col justify-between"
            >
              {/* Top Accent Strip */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-amber-400/40 group-hover:scale-105 group-hover:border-amber-400 transition-all shadow-md shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/15 border border-amber-400/30 text-amber-300">
                          {item.badge}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-400">
                          {item.yearsOfGlory}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <span className="text-2xl text-amber-400/30 group-hover:text-amber-400 transition-colors">
                    🏛️
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-amber-400/90 italic">
                  "{item.tagline}"
                </p>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {item.story}
                </p>

                {/* Signature Dishes Tags */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Inki Asli Shaan (Signature Heritage Dishes):</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.signatureDishes.map((dish, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-neutral-950/80 border border-neutral-800 text-[11px] font-medium text-neutral-200"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Order Trigger */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{item.heritageHonor}</span>
                </span>

                <button
                  type="button"
                  onClick={() => onSelectRestaurant?.(item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-md shadow-amber-400/20 hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>Inka Menu Dekhein</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Pillars of Shaan & Honor */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-3xl p-6 sm:p-8 mb-12">
          <div className="text-center mb-6">
            <h4 className="text-base sm:text-lg font-black text-white flex items-center justify-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>BiteCraft Ki Shaan Ke Chaar Aitihasik Stambh</span>
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Kyun hamare zaiqe ki tulna kisi aur se nahi ki ja sakti
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800/70">
              <span className="text-2xl mb-2 block">🏺</span>
              <h5 className="text-xs sm:text-sm font-bold text-white">Pushtaini Gupt Masale</h5>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                3-4 peedhiyon se chali aa rahi secret recipes jo bazaar ke packet wale masalon se koso door hain.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800/70">
              <span className="text-2xl mb-2 block">🔥</span>
              <h5 className="text-xs sm:text-sm font-bold text-white">Koyle Aur Peetal Ki Aanch</h5>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Authentic sigri slow-cooking, traditional tandoor, aur brass filter flasks mein banta asli damdar swad.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800/70">
              <span className="text-2xl mb-2 block">🧈</span>
              <h5 className="text-xs sm:text-sm font-bold text-white">Shuddh Desi Ghee & Makhan</h5>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Har subah taaza daal-chawal ka stone-ground batter aur shuddh desi ghee ka bina kisi kanjoosi ke prayog.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800/70">
              <span className="text-2xl mb-2 block">🛵</span>
              <h5 className="text-xs sm:text-sm font-bold text-white">Ghar Tak Shahi Delivery</h5>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Aitihasik kadhai se seedha thermal insulated packaging mein 20-30 min ke live GPS tracking ke saath dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Address Quick Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800/80 mb-8">
          <div className="flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Aapke Darwaze Tak Heritage Zaiqa</p>
              <p className="text-neutral-400 text-[11px]">Location change karke delivery time aur dishes check karein</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenLocationModal}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs rounded-xl border border-neutral-700 transition-colors cursor-pointer shrink-0"
          >
            Change Delivery Address
          </button>
        </div>

        {/* Bottom Bar: Royal Tribute & Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-xs text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-amber-400 text-black flex items-center justify-center font-bold text-xs">
              🍽️
            </span>
            <span className="font-bold text-neutral-300">BiteCraft</span>
            <span>· Saluting India's Greatest Living Kitchen Legacies</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Thermal Fresh Sealed
            </span>
            <span>·</span>
            <span>© 2026 All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
