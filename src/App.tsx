/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Dish, CartItem, Order, OrderStatus, CustomizationOption } from './types/food';
import { DISHES, RESTAURANTS, PROMO_CODES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrendingSection } from './components/TrendingSection';
import { RestaurantSection } from './components/RestaurantSection';
import { SpecialOffers } from './components/SpecialOffers';
import { DishCard } from './components/DishCard';
import { CustomizeModal } from './components/CustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { LocationModal } from './components/LocationModal';
import { Footer } from './components/Footer';
import { ArrowUpDown, CheckCircle, Search, Bike } from 'lucide-react';

export default function App() {
  // Navigation & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>('CRAVE20'); // Welcome coupon pre-applied
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // User Custom Location State
  const [selectedLocation, setSelectedLocation] = useState('Flat 402, Green Valley Heights, MG Road');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price-asc' | 'prep-time'>('recommended');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart Calculations
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  let discountAmount = 0;
  let isFreeDelivery = false;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.discountPercent) {
      discountAmount = (subtotal * promo.discountPercent) / 100;
    } else if (promo.flatDiscount) {
      discountAmount = Math.min(subtotal, promo.flatDiscount);
    }
    if (promo.freeDelivery) {
      isFreeDelivery = true;
    }
  }

  const baseDeliveryFee = subtotal > 399 || subtotal === 0 ? 0 : 35;
  const deliveryFee = isFreeDelivery ? 0 : baseDeliveryFee;
  const tax = subtotal > 0 ? (subtotal - discountAmount) * 0.05 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  // Add Item to Cart Handler
  const handleAddToCart = (
    dish: Dish,
    quantity: number,
    selectedSize: string,
    selectedAddons: CustomizationOption[],
    specialInstructions: string
  ) => {
    const sizeExtra = dish.sizes?.find((s) => s.name === selectedSize)?.extraPrice || 0;
    const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
    const unitPrice = dish.price + sizeExtra + addonsTotal;
    const totalPrice = unitPrice * quantity;

    const addonKey = selectedAddons.map((a) => a.id).sort().join('-');
    const cartItemId = `${dish.id}-${selectedSize}-${addonKey}-${specialInstructions.slice(0, 10)}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: updated[existingIndex].unitPrice * newQty
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            dish,
            quantity,
            selectedSize,
            selectedAddons,
            specialInstructions,
            unitPrice,
            totalPrice
          }
        ];
      }
    });

    showToast(`Added ${quantity}x "${dish.name}" to your basket!`);
  };

  // Quick Add
  const handleQuickAdd = (dish: Dish) => {
    const defaultSize = dish.sizes && dish.sizes.length > 0 ? dish.sizes[0].name : 'Standard';
    handleAddToCart(dish, 1, defaultSize, [], '');
  };

  // Update Item Quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty
          };
        }
        return item;
      })
    );
  };

  // Remove Item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Promo Code Validation
  const handleApplyPromo = (code: string): { success: boolean; message: string } => {
    const normalized = code.trim().toUpperCase();
    if (PROMO_CODES[normalized]) {
      setAppliedPromo(normalized);
      return { success: true, message: `Coupon "${normalized}" applied! ${PROMO_CODES[normalized].label}` };
    }
    return { success: false, message: `Invalid code "${code}". Try "CRAVE20" or "FREESHIP".` };
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // Order Placement & Live Tracking Trigger
  const handleOrderPlaced = (order: Order) => {
    setActiveOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsOrderTrackerOpen(true);
    showToast(`Order #${order.id} confirmed! Live GPS tracking activated.`);
  };

  const handleUpdateOrderStatus = (newStatus: OrderStatus) => {
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        status: newStatus
      });
      showToast(`Order status updated to: ${newStatus.replace('_', ' ').toUpperCase()}`);
    }
  };

  const handleCancelOrder = () => {
    setActiveOrder(null);
    setIsOrderTrackerOpen(false);
    showToast('Active order cleared.');
  };

  // Handler for Track Order button in Hero/Nav
  const handleTrackOrderClick = () => {
    if (activeOrder) {
      setIsOrderTrackerOpen(true);
    } else {
      showToast('No active order yet! Choose your favorite dishes and place an order to track live.');
      const el = document.getElementById('trending-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trending dishes subset for the Trending Section
  const trendingDishes = useMemo(() => {
    return [
      DISHES.find((d) => d.id === 'dish-1')!, // Truffle Burrata Margherita
      DISHES.find((d) => d.id === 'dish-2')!, // Double Wagyu Smash
      DISHES.find((d) => d.id === 'dish-9')!, // Old Delhi Butter Chicken
      DISHES.find((d) => d.id === 'dish-3')!, // Kurobuta Tonkotsu Ramen
    ].filter(Boolean);
  }, []);

  // Filter & Sort Pipeline for Full Menu: Guaranteed to NEVER be empty
  const { displayDishes, isFallback } = useMemo(() => {
    // 1. Strict Filter
    let matches = DISHES.filter((dish) => {
      if (selectedRestaurantId && dish.restaurantId !== selectedRestaurantId) {
        return false;
      }
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      if (selectedDietary !== 'all') {
        if (!dish.dietary.includes(selectedDietary as any)) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesRestaurant = dish.restaurantName.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesIngredient = dish.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesRestaurant && !matchesDesc && !matchesIngredient) {
          return false;
        }
      }
      return true;
    });

    let fallbackActive = false;

    // 2. If strict filter has no match (e.g. selected restaurant has no pizza),
    // fallback to showing that category from all partner kitchens
    if (matches.length === 0 && selectedCategory !== 'all') {
      matches = DISHES.filter((dish) => {
        if (dish.category !== selectedCategory) return false;
        if (selectedDietary !== 'all' && !dish.dietary.includes(selectedDietary as any)) return false;
        return true;
      });
      fallbackActive = matches.length > 0;
    }

    // 3. If still empty, match dietary or restaurant
    if (matches.length === 0) {
      if (selectedDietary !== 'all') {
        matches = DISHES.filter((dish) => dish.dietary.includes(selectedDietary as any));
      } else if (selectedRestaurantId) {
        matches = DISHES.filter((dish) => dish.restaurantId === selectedRestaurantId);
      }
      fallbackActive = matches.length > 0;
    }

    // 4. Absolute guaranteed fallback: ALWAYS return top chef specialties so user is NEVER stranded!
    if (matches.length === 0) {
      matches = DISHES.slice(0, 8);
      fallbackActive = true;
    }

    const sorted = [...matches].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'prep-time') return a.prepTimeMinutes - b.prepTimeMinutes;
      return 0;
    });

    return { displayDishes: sorted, isFallback: fallbackActive };
  }, [selectedRestaurantId, selectedCategory, selectedDietary, searchQuery, sortBy]);

  const activeRestaurant = RESTAURANTS.find((r) => r.id === selectedRestaurantId);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      
      {/* Top Navigation Bar with Prominent Delivering To */}
      <Navbar
        cartItemCount={cartItemCount}
        cartTotal={grandTotal}
        onOpenCart={() => setIsCartOpen(true)}
        activeOrder={activeOrder}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        selectedLocation={selectedLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('menu-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectDietary={(diet) => {
          setSelectedDietary(diet);
          const el = document.getElementById('menu-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectRestaurant={(id) => {
          setSelectedRestaurantId(id);
          const el = document.getElementById('menu-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onApplyPromo={(code) => {
          const res = handleApplyPromo(code);
          showToast(res.message);
        }}
        appliedPromo={appliedPromo}
        onOpenCustomize={(dish) => setCustomizingDish(dish)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Floating Active Order Strip: ONLY SHOWN WHEN USER ACTUALLY HAS AN ACTIVE ORDER */}
      {activeOrder && (
        <div className="bg-gradient-to-r from-amber-500/20 via-neutral-900 to-amber-500/20 border-b border-amber-500/40 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <Bike className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white">Live Order {activeOrder.id}:</span>
              <span className="truncate max-w-[200px] sm:max-w-md">
                {activeOrder.status === 'delivered' ? 'Delivered at destination!' : `En route to ${activeOrder.deliveryAddress}`}
              </span>
            </div>

            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Open Live GPS Tracker ➔
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Simplified Hero Section */}
        <Hero
          onExploreMenu={() => {
            const el = document.getElementById('trending-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onTrackOrder={handleTrackOrderClick}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('menu-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          deliveryLocation={selectedLocation}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
        />

        {/* Trending Right Now Section */}
        <TrendingSection
          trendingDishes={trendingDishes}
          onOpenCustomize={(d) => setCustomizingDish(d)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Top Kitchens Near You */}
        <RestaurantSection
          restaurants={RESTAURANTS}
          selectedRestaurantId={selectedRestaurantId}
          onSelectRestaurant={(id) => {
            setSelectedRestaurantId(id);
            const el = document.getElementById('menu-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Special Offers & Deals */}
        <SpecialOffers
          onApplyCode={(code) => {
            const res = handleApplyPromo(code);
            showToast(res.message);
          }}
          appliedPromo={appliedPromo}
        />

        {/* Live Menu Catalog */}
        <section id="menu-catalog" className="py-12 border-b border-neutral-800/80 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="space-y-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {activeRestaurant ? `${activeRestaurant.name} Menu` : 'Explore Complete Menu'}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    {activeRestaurant
                      ? activeRestaurant.cuisine
                      : 'Freshly prepared upon order with authentic recipes and high-heat ovens.'}
                  </p>
                </div>

                {/* Dietary Filter Segmented Controls */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start md:self-auto">
                  {[
                    { id: 'all', label: 'All Dishes' },
                    { id: 'veg', label: '🌱 Vegetarian' },
                    { id: 'non-veg', label: '🥩 Non-Veg' },
                    { id: 'gluten-free', label: '🌾 Gluten-Free' },
                    { id: 'chef-special', label: '⭐ Chef Specials' }
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      onClick={() => setSelectedDietary(diet.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        selectedDietary === diet.id
                          ? 'bg-amber-400 text-black shadow-sm font-bold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {diet.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-toolbar: Category chips & Sorting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-neutral-800/80 text-xs">
                
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  <span className="text-neutral-500 font-semibold uppercase tracking-wider text-[11px] shrink-0">
                    Category:
                  </span>
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'pizza', label: '🍕 Pizza' },
                    { id: 'burger', label: '🍔 Burgers' },
                    { id: 'ramen', label: '🍜 Ramen' },
                    { id: 'indian', label: '🍛 Indian' },
                    { id: 'bowls', label: '🥗 Healthy' },
                    { id: 'desserts', label: '🍰 Desserts' },
                    { id: 'sides', label: '🍟 Sides' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors shrink-0 ${
                        selectedCategory === c.id
                          ? 'bg-neutral-800 text-amber-400 border border-neutral-700 font-bold'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-neutral-400 tabular-nums">
                    Showing <strong className="text-white">{displayDishes.length}</strong> {displayDishes.length === 1 ? 'dish' : 'dishes'}
                  </span>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-neutral-300">
                    <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-xs text-neutral-200 focus:outline-none cursor-pointer"
                    >
                      <option value="recommended" className="bg-neutral-900 text-white">Recommended</option>
                      <option value="rating" className="bg-neutral-900 text-white">Top Rated</option>
                      <option value="price-asc" className="bg-neutral-900 text-white">Price: Low to High</option>
                      <option value="prep-time" className="bg-neutral-900 text-white">Fastest Prep Time</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* Always Rendered Dishes Grid - Never Empty */}
            {isFallback && (
              <div className="mb-6 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-300 animate-in fade-in">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                  <span>Is selection ke liye hamare partner kitchens ki top chef recommendations pesh hain.</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDietary('all');
                    setSelectedRestaurantId(null);
                    setSearchQuery('');
                  }}
                  className="font-bold underline text-amber-400 hover:text-white cursor-pointer shrink-0"
                >
                  View All Dishes
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onOpenCustomize={(d) => setCustomizingDish(d)}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>

          </div>
        </section>
      </main>

      {/* Clean Footer with Bright History & Shaan */}
      <Footer
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onSelectRestaurant={(id) => {
          setSelectedRestaurantId(id);
          const el = document.getElementById('menu-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals & Slide-out Drawers */}
      <CustomizeModal
        dish={customizingDish}
        onClose={() => setCustomizingDish(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discountAmount}
        deliveryFee={deliveryFee}
        tax={tax}
        total={grandTotal}
        defaultLocation={selectedLocation}
        onOrderPlaced={handleOrderPlaced}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        order={activeOrder}
        onClose={() => setIsOrderTrackerOpen(false)}
        onUpdateStatus={handleUpdateOrderStatus}
        onCancelOrder={handleCancelOrder}
      />

      {/* Customer Home / Custom Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentAddress={selectedLocation}
        onSaveAddress={(newAddr) => {
          setSelectedLocation(newAddr);
          showToast(`Delivery address set to: ${newAddr}`);
        }}
      />

      {/* Floating Bottom Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-amber-500/80 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
