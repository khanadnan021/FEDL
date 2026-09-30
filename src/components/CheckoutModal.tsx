import React, { useState } from 'react';
import { CartItem, Order } from '../types/food';
import { X, MapPin, Phone, ShieldCheck, CreditCard, Wallet, Banknote, Clock, ArrowRight, Edit3 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  defaultLocation: string;
  onOrderPlaced: (order: Order) => void;
  onOpenLocationModal: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  deliveryFee,
  tax,
  total,
  defaultLocation,
  onOrderPlaced,
  onOpenLocationModal,
}) => {
  if (!isOpen) return null;

  const [deliveryAddress, setDeliveryAddress] = useState(defaultLocation);
  const [houseDetail, setHouseDetail] = useState('');
  const [phone, setPhone] = useState('+1 (555) 389-2049');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'priority'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const speedSurcharge = deliverySpeed === 'priority' ? 40 : 0;
  const finalTotal = total + speedSurcharge;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const fullDestination = houseDetail.trim() 
        ? `${houseDetail.trim()}, ${deliveryAddress}` 
        : deliveryAddress;

      const newOrder: Order = {
        id: `BC-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'placed',
        items,
        subtotal,
        discount,
        deliveryFee: deliveryFee + speedSurcharge,
        tax,
        total: finalTotal,
        deliveryAddress: fullDestination,
        contactPhone: phone,
        paymentMethod,
        estimatedMinutes: deliverySpeed === 'priority' ? 18 : 28,
        riderName: 'Marcus "Jet" Chen',
        riderPhone: '+1 (555) 892-1102',
        riderVehicle: 'Yamaha Aerox Delivery Edition · Plate #BC-948'
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Complete Your Order</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live tracking starts right after confirmation
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePlaceOrder} className="p-6 space-y-6 max-h-[calc(85vh-12rem)] overflow-y-auto">
          
          {/* Section 1: Delivery Address (Custom home address) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <MapPin className="w-4 h-4" />
                <span>1. Delivery Destination</span>
              </div>
              <button
                type="button"
                onClick={onOpenLocationModal}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Change Address</span>
              </button>
            </div>

            <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">{deliveryAddress}</p>
                  <p className="text-[11px] text-neutral-400">Rider will navigate to this GPS location</p>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-400 block mb-1">
                  Flat / House / Floor / Doorstep Note (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flat 302, 3rd Floor / Leave at front door"
                  value={houseDetail}
                  onChange={(e) => setHouseDetail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-neutral-400 block mb-1">Phone Number (for Rider updates & SMS)</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Speed */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Clock className="w-4 h-4" />
              <span>2. Delivery Speed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setDeliverySpeed('standard')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  deliverySpeed === 'standard'
                    ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Standard Dispatch</span>
                  <span className="text-xs text-emerald-400 font-semibold">Included</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">25-35 mins · Direct from kitchen</p>
              </div>

              <div
                onClick={() => setDeliverySpeed('priority')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  deliverySpeed === 'priority'
                    ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">⚡ Priority Express</span>
                  <span className="text-xs text-amber-400 font-bold tabular-nums">+₹40</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">15-20 mins · Dedicated solo rider</p>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Payment Method</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/30'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/30'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <Wallet className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold">UPI / Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/30'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <Banknote className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold">Cash On Delivery</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <label className="text-[11px] text-neutral-400">Card details (Encrypted 256-bit)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                  />
                  <input
                    type="text"
                    defaultValue="09/28"
                    placeholder="MM/YY"
                    className="w-20 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono text-center"
                  />
                  <input
                    type="password"
                    defaultValue="882"
                    placeholder="CVV"
                    className="w-16 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono text-center"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                <label className="text-[11px] text-neutral-400">UPI ID / Mobile Number</label>
                <input
                  type="text"
                  defaultValue="customer@okhdfc"
                  placeholder="name@upi or 9876543210@paytm"
                  className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300 space-y-1">
                <p className="font-semibold text-amber-400">Cash on Delivery Notice</p>
                <p className="text-[11px] text-neutral-400">
                  Please keep exact change of <strong className="text-white tabular-nums">₹{Math.round(finalTotal)}</strong> ready at your doorstep.
                </p>
              </div>
            )}
          </div>

          {/* Section 4: Order Summary */}
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>{items.length} Items Total</span>
              <span className="text-white tabular-nums">₹{Math.round(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount Applied</span>
                <span className="tabular-nums">-₹{Math.round(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Delivery Fee</span>
              <span className="text-white tabular-nums">
                {deliveryFee + speedSurcharge === 0 ? 'FREE' : `₹${Math.round(deliveryFee + speedSurcharge)}`}
              </span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Estimated GST (5%)</span>
              <span className="text-white tabular-nums">₹{Math.round(tax)}</span>
            </div>
            <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
              <span>Total Payable</span>
              <span className="text-lg text-amber-400 tabular-nums">₹{Math.round(finalTotal)}</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-300 disabled:bg-neutral-700 text-black font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                <span>Placing order & starting GPS tracking...</span>
              </div>
            ) : (
              <>
                <span>Place Order & Track Live · ₹{Math.round(finalTotal)}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
