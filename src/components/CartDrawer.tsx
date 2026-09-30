import React, { useState } from 'react';
import { CartItem } from '../types/food';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, CheckCircle2, Navigation } from 'lucide-react';
import { PROMO_CODES } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  let discountAmount = 0;
  let isFreeDeliveryByPromo = false;

  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.discountPercent) {
      discountAmount = (subtotal * promo.discountPercent) / 100;
    } else if (promo.flatDiscount) {
      discountAmount = Math.min(subtotal, promo.flatDiscount);
    }
    if (promo.freeDelivery) {
      isFreeDeliveryByPromo = true;
    }
  }

  const baseDeliveryFee = subtotal > 399 || subtotal === 0 ? 0 : 35;
  const deliveryFee = isFreeDeliveryByPromo ? 0 : baseDeliveryFee;
  const taxesAndPackaging = subtotal > 0 ? (subtotal - discountAmount) * 0.05 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + taxesAndPackaging);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim());
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Your Food Basket</h2>
              <span className="text-xs bg-neutral-800 text-neutral-300 font-semibold px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real-time Order Process Notice */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 text-xs text-amber-300">
            <Navigation className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Order checkout leads directly to <strong>Live GPS Rider Tracking</strong></span>
          </div>

          {/* Drawer Content */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-3xl mb-4">
                🍕
              </div>
              <h3 className="text-base font-bold text-white">Your basket is empty</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed">
                Add your favorite artisan pizza, smash burger, or ramen to start your order.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-3.5 space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-neutral-800"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.dish.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-amber-400/90 font-medium truncate">
                          {item.dish.restaurantName}
                        </p>

                        <div className="text-[11px] text-neutral-400 mt-1 space-y-0.5">
                          {item.selectedSize && (
                            <p>Portion: <span className="text-neutral-200">{item.selectedSize}</span></p>
                          )}
                          {item.selectedAddons.length > 0 && (
                            <p>Extras: <span className="text-neutral-300">{item.selectedAddons.map(a => a.name).join(', ')}</span></p>
                          )}
                          {item.specialInstructions && (
                            <p className="italic text-neutral-500 truncate">Note: "{item.specialInstructions}"</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Item Total Row */}
                    <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-white tabular-nums">
                        ₹{Math.round(item.totalPrice)}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-3 border-t border-neutral-800">
                <form onSubmit={handleApplyPromoCode} className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="Coupon Code (CRAVE20)"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white uppercase placeholder:normal-case placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {promoFeedback && (
                    <p className={`text-xs ${promoFeedback.success ? 'text-emerald-400' : 'text-red-400'}`}>
                      {promoFeedback.message}
                    </p>
                  )}

                  {appliedPromo && (
                    <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-2.5 text-xs text-emerald-300">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold font-mono">{appliedPromo}</span>
                        <span className="text-emerald-400/80">({PROMO_CODES[appliedPromo]?.label})</span>
                      </div>
                      <button
                        type="button"
                        onClick={onRemovePromo}
                        className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {!appliedPromo && (
                    <div className="text-[11px] text-neutral-500 flex items-center justify-between">
                      <span>Available offer:</span>
                      <button
                        type="button"
                        onClick={() => {
                          onApplyPromo('CRAVE20');
                          setPromoFeedback({ success: true, message: '20% Welcome coupon applied!' });
                        }}
                        className="text-amber-400 hover:underline font-mono font-bold"
                      >
                        Tap to apply "CRAVE20"
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Price Details */}
              <div className="pt-3 border-t border-neutral-800 space-y-2 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-white tabular-nums font-medium">₹{Math.round(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Applied</span>
                    <span className="tabular-nums font-semibold">-₹{Math.round(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-white tabular-nums font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      `₹${Math.round(deliveryFee)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes & Packaging (5% GST)</span>
                  <span className="text-white tabular-nums font-medium">₹{Math.round(taxesAndPackaging)}</span>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-base text-amber-400 tabular-nums">₹{Math.round(grandTotal)}</span>
                </div>
              </div>

            </div>
          )}

          {/* Drawer Footer CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 space-y-2">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm rounded-xl flex items-center justify-between shadow-lg shadow-amber-400/20 transition-all cursor-pointer group"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums text-base">₹{Math.round(grandTotal)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <p className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1">
                <span>📍 Live GPS Tracking opens after payment</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
