export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface Dish {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  category: 'pizza' | 'burger' | 'ramen' | 'indian' | 'bowls' | 'desserts' | 'sides';
  description: string;
  price: number;
  image: string;
  calories: number;
  prepTimeMinutes: number;
  rating: number;
  reviewsCount: number;
  dietary: ('veg' | 'non-veg' | 'gluten-free' | 'chef-special')[];
  spiceLevel: 0 | 1 | 2 | 3;
  ingredients: string[];
  sizes?: { name: string; extraPrice: number }[];
  addonOptions?: CustomizationOption[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewsCount: number;
  deliveryMinutes: string;
  minOrder: number;
  deliveryFee: number;
  address: string;
  heroTag: string;
  badge?: string;
  logoLetter: string;
  image: string;
  discountOffer?: string;
}

export interface CartItem {
  cartItemId: string;
  dish: Dish;
  quantity: number;
  selectedSize?: string;
  selectedAddons: CustomizationOption[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'placed' | 'kitchen' | 'in_transit' | 'delivered';

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddress: string;
  contactPhone: string;
  paymentMethod: 'card' | 'upi' | 'cod';
  estimatedMinutes: number;
  riderName: string;
  riderPhone: string;
  riderVehicle: string;
}

export interface StudentMember {
  id: string;
  name: string;
  rollNumber: string;
  role: string;
  tasks: string[];
}

export interface LabSubmissionInfo {
  assignmentTitle: string;
  courseCode: string;
  courseName: string;
  deadline: string;
  batch: string;
  groupNumber: string;
  projectTopic: string;
  students: StudentMember[];
}

export interface Review {
  id: string;
  userName: string;
  dishName: string;
  rating: number;
  date: string;
  comment: string;
  userAvatarLetter: string;
}
