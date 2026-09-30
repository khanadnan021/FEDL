import React, { useState } from 'react';
import { Dish, CustomizationOption } from '../types/food';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';

interface CustomizeModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (
    dish: Dish,
    quantity: number,
    selectedSize: string,
    selectedAddons: CustomizationOption[],
    specialInstructions: string
  ) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  dish,
  onClose,
  onAddToCart
}) => {
  if (!dish) return null;

  const defaultSize = dish.sizes && dish.sizes.length > 0 ? dish.sizes[0].name : 'Standard';
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
  const [selectedAddons, setSelectedAddons] = useState<CustomizationOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Calculate dynamic unit price
  const sizeExtra = dish.sizes?.find((s) => s.name === selectedSize)?.extraPrice || 0;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = dish.price + sizeExtra + addonsTotal;
  const grandTotal = unitPrice * quantity;

  const toggleAddon = (addon: CustomizationOption) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleConfirm = () => {
    onAddToCart(dish, quantity, selectedSize, selectedAddons, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Photo */}
        <div className="relative h-56 sm:h-64 w-full bg-neutral-800 overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2.5 py-1 rounded-md">
              {dish.restaurantName}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
              {dish.name}
            </h2>
          </div>
        </div>

        {/* Modal Body / Scrollable Controls */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
          {/* Description */}
          <p className="text-sm text-neutral-300 leading-relaxed">
            {dish.description}
          </p>

          {/* Size Options (if available) */}
          {dish.sizes && dish.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Select Portion Size
                </label>
                <span className="text-xs text-neutral-500 font-medium">Required</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {dish.sizes.map((size) => {
                  const isSelected = selectedSize === size.name;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size.name)}
                      className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/50 text-white'
                          : 'bg-neutral-800/60 border-neutral-700/80 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{size.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <span className="text-xs text-neutral-400 mt-1 tabular-nums">
                        {size.extraPrice === 0 ? 'Standard' : `+$${size.extraPrice.toFixed(2)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Addons / Extras (if available) */}
          {dish.addonOptions && dish.addonOptions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Optional Chef Add-Ons & Enhancements
                </label>
                <span className="text-xs text-neutral-500 font-medium">Optional</span>
              </div>
              <div className="space-y-2">
                {dish.addonOptions.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/80 text-white'
                          : 'bg-neutral-800/40 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-amber-400 border-amber-400 text-black'
                              : 'border-neutral-600 bg-neutral-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{addon.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-amber-400 tabular-nums">
                        +${addon.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Kitchen Notes / Special Requests
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Dressing on the side, well-done crisp crust, no scallions..."
              rows={2}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs sm:text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Modal Footer: Quantity Stepper & Add to Cart button */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm rounded-xl flex items-center justify-between shadow-lg shadow-amber-400/10 transition-all cursor-pointer hover:scale-[1.01]"
          >
            <span>Add to Order</span>
            <span className="tabular-nums font-extrabold text-base">
              ${grandTotal.toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
