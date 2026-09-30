import { Dish, Restaurant, LabSubmissionInfo, Review } from '../types/food';

// Dish food photography
import heroPlatterImg from '../assets/images/hero_food_platter_1790784939416.jpg';
import pizzaImg from '../assets/images/dish_artisan_pizza_1790784954519.jpg';
import burgerImg from '../assets/images/dish_gourmet_burger_1790784966287.jpg';
import ramenImg from '../assets/images/dish_tonkotsu_ramen_1790784986133.jpg';

export const HERO_IMAGE = heroPlatterImg;

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Azad Restaurant',
    cuisine: 'Mughlai, Kebabs & Biryani',
    rating: 4.8,
    reviewsCount: 840,
    deliveryMinutes: '20-30 min',
    minOrder: 199,
    deliveryFee: 0,
    address: 'Bazaar Road, Mumbai',
    heroTag: 'Famous seekh kebabs, slow-simmered pulav, tandoori treats, and royal custard',
    badge: 'Iconic Heritage',
    logoLetter: 'A',
    image: '/kitchens/azad.png',
    discountOffer: '20% OFF on Orders Over ₹399'
  },
  {
    id: 'rest-2',
    name: 'Mangalore Naaz Restaurant',
    cuisine: 'Coastal, Mangalorean & North Indian',
    rating: 4.7,
    reviewsCount: 620,
    deliveryMinutes: '15-25 min',
    minOrder: 149,
    deliveryFee: 29,
    address: '281 SBS Road, CSMT Mumbai',
    heroTag: 'Hearty Mangalorean curries, fragrant ghee roast, and hot tandoori breads',
    badge: 'CSMT Landmark',
    logoLetter: 'M',
    image: '/kitchens/naaz.png',
    discountOffer: 'Free Parotta with Special Curry'
  },
  {
    id: 'rest-3',
    name: 'Cafe Madras',
    cuisine: 'Authentic South Indian & Filter Kaapi',
    rating: 4.9,
    reviewsCount: 1420,
    deliveryMinutes: '15-25 min',
    minOrder: 99,
    deliveryFee: 0,
    address: 'Circle House, Matunga, Mumbai',
    heroTag: 'Estd 1940: Crispy butter dosas, soft steamed idlis, rasam vada, and filter coffee',
    badge: 'Estd 1940 Legend',
    logoLetter: 'C',
    image: '/kitchens/madras.png',
    discountOffer: 'Complimentary Mysore Pak on ₹299+'
  },
  {
    id: 'rest-4',
    name: 'Ramashray',
    cuisine: 'South Indian Pure Veg & Sheera',
    rating: 4.9,
    reviewsCount: 1890,
    deliveryMinutes: '15-20 min',
    minOrder: 99,
    deliveryFee: 0,
    address: 'Bhandarkar Road, Matunga Mumbai',
    heroTag: 'World-famous pineapple sheera, podi thatte idlis, and buttery masala dosas',
    badge: 'Pure Veg Icon',
    logoLetter: 'R',
    image: '/kitchens/ramashray.png',
    discountOffer: 'Free Special Sheera on ₹249+'
  }
];

export const DISHES: Dish[] = [
  {
    id: 'dish-1',
    name: 'Truffle Burrata Margherita',
    restaurantId: 'rest-1',
    restaurantName: 'Azad Restaurant',
    category: 'pizza',
    description: 'Slow-fermented sourdough pizza crowned with San Marzano tomato sauce, fresh Puglia burrata heart, black summer truffle emulsion, and toasted pine nuts.',
    price: 399,
    image: pizzaImg,
    calories: 780,
    prepTimeMinutes: 18,
    rating: 4.95,
    reviewsCount: 342,
    dietary: ['veg', 'chef-special'],
    spiceLevel: 0,
    ingredients: ['Sourdough Base', 'San Marzano Tomato', 'Puglia Burrata', 'Truffle Oil', 'Fresh Basil', 'EVOO'],
    sizes: [
      { name: '10" Personal Crust', extraPrice: 0 },
      { name: '14" Sharing Artisan Slab', extraPrice: 120 }
    ],
    addonOptions: [
      { id: 'add-1', name: 'Extra Melted Burrata Globe', price: 49 },
      { id: 'add-2', name: 'Hot Calabrian Chilli Honey Dip', price: 29 },
      { id: 'add-3', name: 'Roasted Wild Forest Mushrooms', price: 39 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Double Smoked Wagyu Smash',
    restaurantId: 'rest-2',
    restaurantName: 'Mangalore Naaz Restaurant',
    category: 'burger',
    description: 'Two 100% Wagyu smash patties with lacey crisp edges, double aged cheddar, smoked bacon jam, house dill pickles, and umami burger sauce on toasted brioche.',
    price: 349,
    image: burgerImg,
    calories: 920,
    prepTimeMinutes: 15,
    rating: 4.88,
    reviewsCount: 420,
    dietary: ['non-veg', 'chef-special'],
    spiceLevel: 1,
    ingredients: ['Double Wagyu Patties', 'Toasted Brioche', 'Aged Cheddar', 'Smoked Bacon Jam', 'Dill Pickles', 'Secret Aioli'],
    sizes: [
      { name: 'Double Patty Classic', extraPrice: 0 },
      { name: 'Triple Monster Stack', extraPrice: 99 }
    ],
    addonOptions: [
      { id: 'add-4', name: 'Truffle Parmesan Hand-Cut Fries', price: 49 },
      { id: 'add-5', name: 'Crispy Beer-Battered Onion Rings', price: 39 },
      { id: 'add-6', name: 'Extra Aged Red Leicester Cheese', price: 29 }
    ]
  },
  {
    id: 'dish-3',
    name: 'Kurobuta Tonkotsu Craft Ramen',
    restaurantId: 'rest-3',
    restaurantName: 'Cafe Madras',
    category: 'ramen',
    description: '18-hour slow-extracted pork marrow broth, thin artisanal wheat noodles, torch-charred chashu belly, seasoned ajitsuke tamago, woodear mushrooms, and black garlic oil.',
    price: 369,
    image: ramenImg,
    calories: 820,
    prepTimeMinutes: 20,
    rating: 4.92,
    reviewsCount: 285,
    dietary: ['non-veg', 'chef-special'],
    spiceLevel: 1,
    ingredients: ['18-hr Tonkotsu Broth', 'Handcrafted Ramen Noodles', 'Torch-Seared Chashu', 'Ajitsuke Egg', 'Menma', 'Mayu Oil'],
    sizes: [
      { name: 'Standard Ceramic Bowl', extraPrice: 0 },
      { name: 'Grand Sumo Bowl (+Noodles & Chashu)', extraPrice: 89 }
    ],
    addonOptions: [
      { id: 'add-7', name: 'Extra Ajitsuke Soft-Boiled Egg', price: 29 },
      { id: 'add-8', name: 'Pan-Fried Gyoza Dumplings (3pcs)', price: 49 },
      { id: 'add-9', name: 'Spicy Rayu Chili Crunch Paste', price: 19 }
    ]
  },
  {
    id: 'dish-4',
    name: 'Wild Forest Truffle Funghi Pizza',
    restaurantId: 'rest-1',
    restaurantName: 'Azad Restaurant',
    category: 'pizza',
    description: 'Roasted cremini, shiitake, and portobello mushrooms over a roasted garlic white crema, fontina cheese, fresh thyme, and white truffle glaze.',
    price: 379,
    image: pizzaImg,
    calories: 720,
    prepTimeMinutes: 16,
    rating: 4.85,
    reviewsCount: 198,
    dietary: ['veg'],
    spiceLevel: 0,
    ingredients: ['Sourdough Dough', 'Cremini & Shiitake', 'Fontina Cheese', 'Garlic White Crema', 'Fresh Thyme'],
    sizes: [
      { name: '10" Personal Crust', extraPrice: 0 },
      { name: '14" Medium Crust', extraPrice: 110 }
    ],
    addonOptions: [
      { id: 'add-10', name: 'Caramelized Balsamic Onions', price: 29 },
      { id: 'add-11', name: 'Smoked Provolone Melter', price: 39 }
    ]
  },
  {
    id: 'dish-5',
    name: 'Nashville Hot Crispy Chicken Burger',
    restaurantId: 'rest-2',
    restaurantName: 'Mangalore Naaz Restaurant',
    category: 'burger',
    description: 'Buttermilk-brined chicken thigh double-dredged and fried crispy, dipped in smoky cayenne oil, layered with sweet creamy slaw, tangy pickles, and jalapeño mayo.',
    price: 299,
    image: burgerImg,
    calories: 860,
    prepTimeMinutes: 14,
    rating: 4.89,
    reviewsCount: 310,
    dietary: ['non-veg'],
    spiceLevel: 3,
    ingredients: ['Buttermilk Fried Thigh', 'Nashville Chili Dip', 'Vinegar Slaw', 'Jalapeno Aioli', 'Brioche Bun'],
    sizes: [
      { name: 'Single Fried Thigh', extraPrice: 0 },
      { name: 'Double Clucker Stack', extraPrice: 89 }
    ],
    addonOptions: [
      { id: 'add-12', name: 'Cajun Seasoned Waffle Fries', price: 39 },
      { id: 'add-13', name: 'Smoked Ghost Pepper Mayo Dip', price: 19 }
    ]
  },
  {
    id: 'dish-6',
    name: 'Rainbow Quinoa & Avocado Harvest Bowl',
    restaurantId: 'rest-4',
    restaurantName: 'Ramashray',
    category: 'bowls',
    description: 'Hass avocado fan, tri-color warm quinoa, roasted heirloom cauliflower, edamame, baby spinach, roasted pepitas, and green goddess tahini vinaigrette.',
    price: 279,
    image: heroPlatterImg,
    calories: 510,
    prepTimeMinutes: 12,
    rating: 4.79,
    reviewsCount: 142,
    dietary: ['veg', 'gluten-free', 'chef-special'],
    spiceLevel: 0,
    ingredients: ['Hass Avocado', 'Tri-Color Quinoa', 'Roasted Cauliflower', 'Organic Spinach', 'Edamame', 'Green Goddess Tahini'],
    sizes: [
      { name: 'Standard Bowl', extraPrice: 0 },
      { name: 'Protein Boosted Large', extraPrice: 79 }
    ],
    addonOptions: [
      { id: 'add-17', name: 'Marinated Organic Tofu Cubes', price: 39 },
      { id: 'add-18', name: 'Soft-Poached Free Range Egg', price: 29 },
      { id: 'add-19', name: 'Extra Hass Avocado Half', price: 39 }
    ]
  },
  {
    id: 'dish-7',
    name: 'Cafe Madras Special Butter Masala Dosa',
    restaurantId: 'rest-3',
    restaurantName: 'Cafe Madras',
    category: 'indian',
    description: 'Iconic crisp golden dosa roasted in pure white butter, spiced potato masala filling, accompanied by authentic fresh coconut chutney and hot drumstick sambar.',
    price: 149,
    image: pizzaImg,
    calories: 440,
    prepTimeMinutes: 10,
    rating: 4.96,
    reviewsCount: 580,
    dietary: ['veg', 'chef-special'],
    spiceLevel: 1,
    ingredients: ['Fermented Rice & Urad Batter', 'White Butter', 'Spiced Potato Masala', 'Fresh Coconut Chutney', 'Traditional Sambar'],
    sizes: [
      { name: 'Classic Dosa', extraPrice: 0 },
      { name: 'Mysore Cheese Dosa Combo', extraPrice: 49 }
    ],
    addonOptions: [
      { id: 'add-20', name: 'Hot Steamed Idli Pair (2pcs)', price: 39 },
      { id: 'add-21', name: 'Crispy Medu Vada (1pc)', price: 29 }
    ]
  },
  {
    id: 'dish-8',
    name: 'Ramashray Famous Pineapple Sheera & Podi Idli',
    restaurantId: 'rest-4',
    restaurantName: 'Ramashray',
    category: 'desserts',
    description: 'Legendary rich semolina dessert infused with fresh pineapple chunks, pure desi ghee, saffron, and roasted cashews, paired with mini podi button idlis.',
    price: 129,
    image: ramenImg,
    calories: 390,
    prepTimeMinutes: 6,
    rating: 4.98,
    reviewsCount: 920,
    dietary: ['veg', 'chef-special'],
    spiceLevel: 0,
    ingredients: ['Roasted Semolina', 'Fresh Pineapple Chunks', 'Desi Ghee', 'Saffron', 'Cashews & Raisins'],
    sizes: [
      { name: 'Standard Box', extraPrice: 0 },
      { name: 'Family Festive Slab', extraPrice: 99 }
    ],
    addonOptions: [
      { id: 'add-22', name: 'Strong Filter Coffee Flask', price: 49 },
      { id: 'add-23', name: 'Extra Gunpowder Podi Butter Cup', price: 19 }
    ]
  },
  {
    id: 'dish-9',
    name: 'Azad Royal Mughlai Butter Chicken',
    restaurantId: 'rest-1',
    restaurantName: 'Azad Restaurant',
    category: 'indian',
    description: 'Tender tandoori chicken simmered in a velvety makhani gravy infused with cashew cream, dried fenugreek leaves, and fresh churned white butter, served with crisp garlic butter naan.',
    price: 399,
    image: heroPlatterImg,
    calories: 840,
    prepTimeMinutes: 18,
    rating: 4.96,
    reviewsCount: 612,
    dietary: ['non-veg', 'chef-special'],
    spiceLevel: 2,
    ingredients: ['Tandoor-charred chicken', 'San Marzano makhani gravy', 'Kasuri methi', 'Cashew cream', 'Butter garlic naan'],
    sizes: [
      { name: 'Single Bowl with 2 Naans', extraPrice: 0 },
      { name: 'Family Handi with 4 Naans', extraPrice: 149 }
    ],
    addonOptions: [
      { id: 'add-24', name: 'Extra Butter Garlic Naan', price: 35 },
      { id: 'add-25', name: 'Jeera Pulao Rice Bowl', price: 59 },
      { id: 'add-26', name: 'Mint & Cilantro Raita', price: 25 }
    ]
  },
  {
    id: 'dish-10',
    name: 'Mangalore Naaz Ghee Roast Chicken & Parotta',
    restaurantId: 'rest-2',
    restaurantName: 'Mangalore Naaz Restaurant',
    category: 'indian',
    description: 'Iconic Kundapur style slow-roasted chicken in fiery Byadgi chili paste, crushed spices, and generous dollops of aromatic ghee, served with layered Malabar parottas.',
    price: 379,
    image: burgerImg,
    calories: 780,
    prepTimeMinutes: 16,
    rating: 4.91,
    reviewsCount: 410,
    dietary: ['non-veg', 'chef-special'],
    spiceLevel: 3,
    ingredients: ['Tender Chicken Thighs', 'Pure Desi Ghee', 'Byadgi Chilies', 'Curry Leaves', 'Layered Malabar Parotta'],
    sizes: [
      { name: 'Standard Portion with 2 Parottas', extraPrice: 0 },
      { name: 'Double Roast Feast with 4 Parottas', extraPrice: 129 }
    ],
    addonOptions: [
      { id: 'add-27', name: 'Extra Crispy Malabar Parotta', price: 30 },
      { id: 'add-28', name: 'Tangy Sambar & Chutney Bowl', price: 25 }
    ]
  },
  {
    id: 'dish-11',
    name: 'Truffle Parmesan Hand-Cut French Fries',
    restaurantId: 'rest-1',
    restaurantName: 'Azad Restaurant',
    category: 'sides',
    description: 'Golden double-cooked russet potato fries tossed in aromatic white truffle oil, freshly grated aged parmesan, roasted garlic flakes, and fresh rosemary with garlic aioli.',
    price: 179,
    image: burgerImg,
    calories: 420,
    prepTimeMinutes: 10,
    rating: 4.88,
    reviewsCount: 310,
    dietary: ['veg', 'gluten-free'],
    spiceLevel: 0,
    ingredients: ['Russet Potatoes', 'Truffle Oil', 'Aged Parmesan', 'Rosemary', 'Garlic Aioli Dip'],
    sizes: [
      { name: 'Regular Basket', extraPrice: 0 },
      { name: 'Monster Sharing Platter', extraPrice: 69 }
    ],
    addonOptions: [
      { id: 'add-29', name: 'Melted Cheddar Cheese Dip', price: 35 },
      { id: 'add-30', name: 'Spicy Peri Peri Dust', price: 15 }
    ]
  },
  {
    id: 'dish-12',
    name: 'Crispy Gunpowder Thatte Bites & Chutney',
    restaurantId: 'rest-4',
    restaurantName: 'Ramashray',
    category: 'sides',
    description: 'Bite-sized button idlis pan-roasted in pure golden desi ghee, heavily dusted with spicy Kanchipuram gun-powder podi and toasted curry leaves. Served with coconut chutney.',
    price: 139,
    image: pizzaImg,
    calories: 320,
    prepTimeMinutes: 8,
    rating: 4.97,
    reviewsCount: 540,
    dietary: ['veg', 'gluten-free', 'chef-special'],
    spiceLevel: 1,
    ingredients: ['Steamed Thatte Idli', 'Desi Ghee', 'Kanchipuram Podi', 'Crispy Curry Leaves', 'Coconut Chutney'],
    sizes: [
      { name: '12 Button Bites', extraPrice: 0 },
      { name: '24 Party Bites', extraPrice: 79 }
    ],
    addonOptions: [
      { id: 'add-31', name: 'Extra Ghee Pour', price: 20 },
      { id: 'add-32', name: 'Spicy Tomato Chutney Cup', price: 15 }
    ]
  },
  {
    id: 'dish-13',
    name: 'Crispy Medu Vada Pair & Filter Kaapi Combo',
    restaurantId: 'rest-3',
    restaurantName: 'Cafe Madras',
    category: 'sides',
    description: 'Two golden-fried crispy urad dal vadas with a crunchy crust and fluffy interior, paired with fresh piping hot drumstick sambar and Cafe Madras signature filter coffee flask.',
    price: 159,
    image: ramenImg,
    calories: 380,
    prepTimeMinutes: 9,
    rating: 4.95,
    reviewsCount: 480,
    dietary: ['veg', 'chef-special'],
    spiceLevel: 1,
    ingredients: ['Stone-Ground Urad Dal', 'Peppercorns', 'Ginger', 'Green Chilies', 'Pure Filter Coffee'],
    sizes: [
      { name: 'Vada Pair + 1 Kaapi', extraPrice: 0 },
      { name: 'Vada Trio + 2 Kaapi Flasks', extraPrice: 89 }
    ],
    addonOptions: [
      { id: 'add-33', name: 'Extra Hot Sambar Bowl', price: 25 },
      { id: 'add-34', name: 'Dosa Batter Dip', price: 20 }
    ]
  },
  {
    id: 'dish-14',
    name: 'Azad Royal Shahi Tukda with Pistachio Rabdi',
    restaurantId: 'rest-1',
    restaurantName: 'Azad Restaurant',
    category: 'desserts',
    description: 'Crisp ghee-fried brioche steeped in saffron cardamom syrup, smothered in rich slow-reduced malai rabdi, silver vark, and toasted Iranian slivered pistachios.',
    price: 189,
    image: heroPlatterImg,
    calories: 460,
    prepTimeMinutes: 7,
    rating: 4.94,
    reviewsCount: 390,
    dietary: ['veg', 'chef-special'],
    spiceLevel: 0,
    ingredients: ['Ghee Brioche', 'Saffron Cardamom Syrup', 'Slow-Reduced Rabdi', 'Pistachios', 'Silver Leaf'],
    sizes: [
      { name: 'Classic Shahi Portion', extraPrice: 0 },
      { name: 'Royal Grand Bowl', extraPrice: 79 }
    ],
    addonOptions: [
      { id: 'add-35', name: 'Extra Pistachio Rabdi Cup', price: 39 },
      { id: 'add-36', name: 'Kulfi Scoop', price: 49 }
    ]
  },
  {
    id: 'dish-15',
    name: 'Cafe Madras Authentic Mysore Pak Box',
    restaurantId: 'rest-3',
    restaurantName: 'Cafe Madras',
    category: 'desserts',
    description: 'Melt-in-mouth traditional royal dessert made with roasted besan flour, fragrant green cardamom, and copious amounts of hot pure ghee according to the 1940 recipe.',
    price: 149,
    image: pizzaImg,
    calories: 410,
    prepTimeMinutes: 5,
    rating: 4.92,
    reviewsCount: 420,
    dietary: ['veg', 'gluten-free'],
    spiceLevel: 0,
    ingredients: ['Roasted Gram Flour', 'Pure Desi Ghee', 'Cardamom', 'Cane Sugar'],
    sizes: [
      { name: '250g Gift Box', extraPrice: 0 },
      { name: '500g Festival Box', extraPrice: 120 }
    ],
    addonOptions: [
      { id: 'add-37', name: 'Filter Coffee Flask', price: 49 }
    ]
  },
  {
    id: 'dish-16',
    name: 'Old Bombay Claypot Chicken Biryani Bowl',
    restaurantId: 'rest-1',
    restaurantName: 'Azad Restaurant',
    category: 'bowls',
    description: 'Fragrant long-grain aged Basmati rice layered with marinated tender chicken cuts, caramelized onions, mint, and whole spices, slow-sealed in an earthen claypot with burani raita.',
    price: 349,
    image: heroPlatterImg,
    calories: 760,
    prepTimeMinutes: 16,
    rating: 4.96,
    reviewsCount: 520,
    dietary: ['non-veg', 'chef-special'],
    spiceLevel: 2,
    ingredients: ['Aged Basmati Rice', 'Tender Chicken', 'Saffron Milk', 'Fried Onions', 'Burani Garlic Raita'],
    sizes: [
      { name: 'Single Claypot Bowl', extraPrice: 0 },
      { name: 'Sharing Handi Bowl', extraPrice: 129 }
    ],
    addonOptions: [
      { id: 'add-38', name: 'Extra Salan Gravy', price: 29 },
      { id: 'add-39', name: 'Boiled Egg', price: 19 }
    ]
  },
  {
    id: 'dish-17',
    name: 'South Indian Mini Tiffin Sampler Bowl',
    restaurantId: 'rest-3',
    restaurantName: 'Cafe Madras',
    category: 'bowls',
    description: 'Complete wholesome South Indian breakfast platter: Mini ghee podi masala dosa, 2 steamed button idlis, 1 crispy medu vada, sweet pineapple sheera, sambar, and 2 fresh chutneys.',
    price: 249,
    image: ramenImg,
    calories: 580,
    prepTimeMinutes: 12,
    rating: 4.98,
    reviewsCount: 710,
    dietary: ['veg', 'chef-special'],
    spiceLevel: 1,
    ingredients: ['Mini Masala Dosa', 'Button Idlis', 'Medu Vada', 'Pineapple Sheera', 'Drumstick Sambar'],
    sizes: [
      { name: 'Solo Tiffin Bowl', extraPrice: 0 },
      { name: 'Jumbo Tiffin with Filter Coffee', extraPrice: 59 }
    ],
    addonOptions: [
      { id: 'add-40', name: 'Extra Chutney Trio', price: 25 }
    ]
  },
  {
    id: 'dish-18',
    name: 'Spicy Paneer Tikka Woodfired Pizza',
    restaurantId: 'rest-1',
    restaurantName: 'Azad Restaurant',
    category: 'pizza',
    description: 'Tandoor-charred malai paneer cubes, roasted bell peppers, red onions, fresh mozzarella, and aromatic kasuri methi sprinkle on slow-risen sourdough base.',
    price: 369,
    image: pizzaImg,
    calories: 740,
    prepTimeMinutes: 15,
    rating: 4.90,
    reviewsCount: 380,
    dietary: ['veg'],
    spiceLevel: 2,
    ingredients: ['Sourdough Crust', 'Charred Paneer Tikka', 'Mozzarella', 'Bell Peppers', 'Kasuri Methi'],
    sizes: [
      { name: '10" Personal Crust', extraPrice: 0 },
      { name: '14" Medium Crust', extraPrice: 110 }
    ],
    addonOptions: [
      { id: 'add-41', name: 'Extra Mozzarella Melt', price: 39 },
      { id: 'add-42', name: 'Garlic Butter Crust Brush', price: 19 }
    ]
  },
  {
    id: 'dish-19',
    name: 'Crispy Masala Paneer Brioche Burger',
    restaurantId: 'rest-4',
    restaurantName: 'Ramashray',
    category: 'burger',
    description: 'Thick slab of fresh cottage cheese marinated in coastal spices, panko-crusted and flash fried, topped with mint chutney mayo, pickled red onions, and crisp lettuce on toasted brioche.',
    price: 249,
    image: burgerImg,
    calories: 680,
    prepTimeMinutes: 13,
    rating: 4.87,
    reviewsCount: 290,
    dietary: ['veg', 'chef-special'],
    spiceLevel: 1,
    ingredients: ['Crispy Paneer Slab', 'Toasted Brioche', 'Mint Chutney Aioli', 'Pickled Red Onions', 'Crisp Iceberg'],
    sizes: [
      { name: 'Single Paneer Burger', extraPrice: 0 },
      { name: 'Double Cheese Stack', extraPrice: 69 }
    ],
    addonOptions: [
      { id: 'add-43', name: 'Masala Fries Combo', price: 49 },
      { id: 'add-44', name: 'Extra Cheddar Slice', price: 25 }
    ]
  },
  {
    id: 'dish-20',
    name: 'Spicy Veg Miso Craft Ramen',
    restaurantId: 'rest-3',
    restaurantName: 'Cafe Madras',
    category: 'ramen',
    description: 'Rich roasted sesame and red miso broth, springy wheat noodles, glazed shiitake mushrooms, crisp pak choi, sweet corn kernels, spring onions, and fragrant chili garlic oil.',
    price: 319,
    image: ramenImg,
    calories: 620,
    prepTimeMinutes: 14,
    rating: 4.89,
    reviewsCount: 315,
    dietary: ['veg'],
    spiceLevel: 2,
    ingredients: ['Red Miso Broth', 'Artisanal Noodles', 'Shiitake Mushrooms', 'Pak Choi', 'Chili Garlic Oil'],
    sizes: [
      { name: 'Regular Ceramic Bowl', extraPrice: 0 },
      { name: 'Grand Sumo Bowl', extraPrice: 79 }
    ],
    addonOptions: [
      { id: 'add-45', name: 'Extra Shiitake Mushrooms', price: 39 },
      { id: 'add-46', name: 'Tofu Cubes', price: 29 }
    ]
  },
  {
    id: 'dish-21',
    name: 'Charcoal Sigri Mutton Seekh Kebab (4pcs)',
    restaurantId: 'rest-1',
    restaurantName: 'Azad Restaurant',
    category: 'sides',
    description: 'Succulent hand-minced mutton infused with Azad secret spices, ginger, and green chilies, skewered and charred over glowing charcoal embers. Served with mint chutney and roomali roti.',
    price: 329,
    image: heroPlatterImg,
    calories: 520,
    prepTimeMinutes: 14,
    rating: 4.97,
    reviewsCount: 640,
    dietary: ['non-veg', 'chef-special'],
    spiceLevel: 2,
    ingredients: ['Minced Mutton', 'Secret Spices', 'Charcoal Sigri', 'Mint Chutney', 'Roomali Roti'],
    sizes: [
      { name: 'Plate of 4 Seekhs', extraPrice: 0 },
      { name: 'Family Platter of 8 Seekhs', extraPrice: 169 }
    ],
    addonOptions: [
      { id: 'add-47', name: 'Extra Roomali Roti', price: 25 },
      { id: 'add-48', name: 'Lachha Onion Salad', price: 15 }
    ]
  },
  {
    id: 'dish-22',
    name: 'Mangalorean Crispy Squid & Prawn Rava Fry',
    restaurantId: 'rest-2',
    restaurantName: 'Mangalore Naaz Restaurant',
    category: 'sides',
    description: 'Fresh coastal prawns and squid rings marinated in fiery Kundapura red chili paste and tangy kokum, crusted in coarse golden semolina (rava) and pan-fried till delightfully crisp.',
    price: 339,
    image: burgerImg,
    calories: 490,
    prepTimeMinutes: 12,
    rating: 4.93,
    reviewsCount: 380,
    dietary: ['non-veg', 'chef-special'],
    spiceLevel: 3,
    ingredients: ['Fresh Prawns & Squid', 'Kundapura Chili Paste', 'Kokum Extract', 'Coarse Semolina', 'Curry Leaves'],
    sizes: [
      { name: 'Standard Plate', extraPrice: 0 },
      { name: 'Seafood Lovers Platter', extraPrice: 149 }
    ],
    addonOptions: [
      { id: 'add-49', name: 'Garlic Kokum Dip', price: 25 },
      { id: 'add-50', name: 'Lemon Wedges & Onion Ring Cup', price: 15 }
    ]
  }
];

export const PROMO_CODES: Record<string, { discountPercent?: number; flatDiscount?: number; freeDelivery?: boolean; label: string }> = {
  CRAVE20: {
    discountPercent: 20,
    label: '20% First Order Welcome Discount'
  },
  FREESHIP: {
    freeDelivery: true,
    label: 'Free Priority Doorstep Delivery'
  },
  WELCOME50: {
    flatDiscount: 50,
    label: 'Flat ₹50 Welcome Credit'
  },
  FEWD2026: {
    discountPercent: 20,
    label: 'Special 20% Offer'
  }
};

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Sameer Merchant',
    userAvatarLetter: 'S',
    rating: 5,
    date: 'Yesterday at 8:45 PM',
    dishName: 'Azad Royal Mughlai Butter Chicken',
    comment: 'Azad Restaurant ka butter chicken aur seekh kebab delivery mein bhi bilkul hot aur fresh aaya. Packaging was top-notch!'
  },
  {
    id: 'rev-2',
    userName: 'Ananya Iyer',
    userAvatarLetter: 'A',
    rating: 5,
    date: 'Today at 9:15 AM',
    dishName: 'Cafe Madras Special Butter Masala Dosa',
    comment: 'Cafe Madras Matunga is an emotion! Sambar aur filter coffee flask ke saath subah 20 minute mein deliver ho gaya.'
  },
  {
    id: 'rev-3',
    userName: 'Karthik Prabhu',
    userAvatarLetter: 'K',
    rating: 5,
    date: '2 days ago',
    dishName: 'Ramashray Famous Pineapple Sheera',
    comment: 'Ramashray ka pineapple sheera is unbeatable. Authentic ghee fragrance and live GPS tracking made it so easy to receive.'
  }
];

export const INITIAL_LAB_INFO: LabSubmissionInfo = {
  assignmentTitle: 'FEWD LAB Activity 2: UI Recreation Challenge',
  courseName: 'Front-End Web Development Laboratory (CS302)',
  courseCode: 'FEWD-LAB-ACT-02',
  deadline: '30th September 2026',
  projectTopic: 'React-based Online Food Ordering Portal (BiteCraft)',
  groupNumber: 'Group #03',
  batch: 'Batch B · Computer Science & Engineering',
  students: [
    {
      id: 'stu-1',
      name: 'Aarav Patel',
      rollNumber: 'FEWD-2026-041',
      role: 'UI/UX Lead & Design Constitution Engineer',
      tasks: ['Hero split banner', 'Modern card grid', 'Accessibility & color scheme']
    },
    {
      id: 'stu-2',
      name: 'Priya Sharma',
      rollNumber: 'FEWD-2026-088',
      role: 'React Architecture & Cart State Specialist',
      tasks: ['Itemized cart drawer', 'Customization portion matrix', 'Voucher engine']
    },
    {
      id: 'stu-3',
      name: 'Rohan Deshmukh',
      rollNumber: 'FEWD-2026-112',
      role: 'Order Lifecycle & Checkout Workflow Engineer',
      tasks: ['Live 4-stage tracking stepper', 'Simulated GPS courier route', 'Payment validation']
    }
  ]
};
