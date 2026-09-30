import React, { useState } from 'react';
import { X, MapPin, Navigation, Home, Briefcase, Plus, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onSaveAddress: (newAddress: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentAddress,
  onSaveAddress,
}) => {
  if (!isOpen) return null;

  const [houseNo, setHouseNo] = useState('');
  const [streetAddress, setStreetAddress] = useState(currentAddress);
  const [landmark, setLandmark] = useState('');
  const [addressType, setAddressType] = useState<'home' | 'work' | 'other'>('home');
  const [isLocating, setIsLocating] = useState(false);

  // Quick saved suggestions
  const recentSaved = [
    { label: 'Home', address: 'Flat 402, Green Valley Heights, MG Road' },
    { label: 'Office / Work', address: 'Tower B, 5th Floor, Cyber Tech Park' },
  ];

  const handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      const detected = 'Sector 14, Main Avenue, Near City Center';
      setStreetAddress(detected);
      setLandmark('Near Central Metro Gate 2');
    }, 800);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetAddress.trim()) return;

    let full = streetAddress.trim();
    if (houseNo.trim()) {
      full = `${houseNo.trim()}, ${full}`;
    }
    if (landmark.trim()) {
      full = `${full} (Landmark: ${landmark.trim()})`;
    }

    onSaveAddress(full);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Enter Your Delivery Address</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Apne ghar ya office ka exact address add karein</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4">
          
          {/* Detect Current Location Button */}
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="w-full py-2.5 px-3 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl text-xs font-semibold text-amber-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Detecting current GPS location...' : 'Use Current Device Location (Auto-detect)'}</span>
          </button>

          {/* Address Fields */}
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                House / Flat / Floor No.
              </label>
              <input
                type="text"
                placeholder="e.g. Flat 301, Block B / House No. 45"
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 placeholder:text-neutral-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Complete Street / Society / Area Address *
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Sunshine Residency, Near North Metro Station, Sector 21"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 placeholder:text-neutral-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Nearby Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Opp. City Mall / Behind Water Tank"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 placeholder:text-neutral-500"
              />
            </div>
          </div>

          {/* Address Tag Selector */}
          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-2">Save as:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'work', label: 'Work', icon: Briefcase },
                { id: 'other', label: 'Other', icon: MapPin },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = addressType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAddressType(item.id as any)}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400 text-amber-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="pt-2 border-t border-neutral-800/80">
            <span className="text-[11px] text-neutral-500 block mb-1.5 font-medium">Or choose quick sample:</span>
            <div className="space-y-1.5">
              {recentSaved.map((r, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setStreetAddress(r.address);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60 hover:border-neutral-700 cursor-pointer text-xs text-neutral-300"
                >
                  <span className="font-medium text-white">{r.label}:</span>
                  <span className="text-neutral-400 truncate max-w-[240px]">{r.address}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-3 py-3 px-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirm & Set Delivery Address</span>
          </button>
        </form>

      </div>
    </div>
  );
};
