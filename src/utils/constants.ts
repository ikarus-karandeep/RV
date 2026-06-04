import type { TrailerType, SizeOption, ConfiguratorStep } from '../types';

export const STEPS: ConfiguratorStep[] = [
  { id: 'exterior-safety', label: 'EXTERIOR & SAFETY' },
  { id: 'van-specs', label: 'VAN SPECS' },
  { id: 'living-layout', label: 'LIVING LAYOUT' },
  // { id: 'base-van-systems', label: 'BASE VAN SYSTEMS' },
  { id: 'comfort-technology', label: 'COMFORT & TECHNOLOGY' },
  { id: 'adventure-utility', label: 'ADVENTURE & UTILITY' },
];
export const LAYOUT_TECH_ITEMS = [
  // Living Layout
  { id: 'microwave', name: 'MICROWAVE', price: 700, category: 'LIVING LAYOUT' },
  { id: 'Hot Water System', name: 'Hot Water System', price: 850, category: 'LIVING LAYOUT' },
  { id: 'Underslung Water Tank', name: 'Underslung Water Tank', price: 1100, category: 'LIVING LAYOUT' },
  { id: 'Rear Shower Point', name: 'Rear Shower Point', price: 1100, category: 'LIVING LAYOUT' },
  { id: 'electric-bed-upgrade', name: 'ELECTRIC R&R BED UPGRADE', price: 2500, category: 'LIVING LAYOUT' },
  { id: 'rear-bench-anchor-points', name: 'REAR BENCH SEAT PET & STORAGE ANCHOR POINTS', price: 9300, category: 'LIVING LAYOUT' },
  // Comfort & Technology
  { id: 'diesel-night-heater', name: 'DIESEL NIGHT HEATER', price: 700, category: 'COMFORT & TECHNOLOGY' },
  { id: 'thermostat-upgrade', name: 'THERMOSTAT COMFORT CONTROLLER UPGRADE', price: 700, category: 'COMFORT & TECHNOLOGY' },
  { id: 'digital-display', name: 'DIGITAL DISPLAY CONTROLLER SCREEN', price: 250, category: 'COMFORT & TECHNOLOGY' },
  { id: 'campervan-wifi', name: 'CAMPERVAN WIFI', price: 700, category: 'COMFORT & TECHNOLOGY' },
  { id: 'upholstery-upgrade', name: 'UPHOLSTERY UPGRADE TO LEATHERETTE', price: 250, category: 'COMFORT & TECHNOLOGY' },
  // Adventure & Utility
  { id: 'reimo-awning-rail', name: 'REIMO AWNING RAIL', price: 2600, category: 'ADVENTURE & UTILITY' },
  { id: 'fiamma-awning', name: 'FIAMMA F45S AWNING', price: 2500, category: 'ADVENTURE & UTILITY' },
  { id: 'scenic-pop-top', name: 'SCENIC POP TOP CANVAS', price: 1400, category: 'ADVENTURE & UTILITY' },
  { id: 'detachable-tow-bar', name: 'DETACHABLE TOW BAR', price: 700, category: 'ADVENTURE & UTILITY' },
  { id: 'led-lights', name: 'LED FRONT & REAR LIGHTS', price: 2600, category: 'ADVENTURE & UTILITY' },
  // Exterior & Safety
  { id: 'bumper-colour-coding', name: 'BUMPER COLOUR CODING', price: 2500, category: 'EXTERIOR & SAFETY' },
  { id: 'dual-tone', name: 'DUAL TONE', price: 2500, category: 'EXTERIOR & SAFETY' },
];

export const BUMPER_COLORS = [
  { id: 'pearl-black', label: 'Deep Pearl Black', color: '#1a1a1a' },
  { id: 'cherry-red', label: 'Cherry Red', color: '#9a1a1b' },
  { id: 'copper-bronze', label: 'Copper Bronze', color: '#7a5a4a' },
  { id: 'bright-orange', label: 'Bright Orange', color: '#f28c33' },
  { id: 'bay-leaf-green', label: 'Bay Leaf Green', color: '#3c9c7c' },
  { id: 'candy-white', label: 'Candy White', color: '#e5e5e5' },
  { id: 'starlight-blue', label: 'Starlight Blue', color: '#3d4d5d' },
  { id: 'ravenna-blue', label: 'Ravenna Blue', color: '#0047ab' },
  { id: 'bright-yellow', label: 'Bright Yellow', color: '#f7ca44' },
  { id: 'ascot-grey', label: 'Ascot Grey', color: '#9e9c96' },
  { id: 'bamboo-green', label: 'Bamboo Green', color: '#3c5c5c' },
  { id: 'custom', label: 'Custom', color: '#4a4a4a' },
];

export const DUAL_TONE_COLORS = [
  { id: 'dt-cherry-red', label: 'Cherry Red', color: '#f5f5f0', isDualTone: true, bottomColor: '#9a1a1b' },
  { id: 'dt-copper-bronze', label: 'Copper Bronze', color: '#f5f5f0', isDualTone: true, bottomColor: '#7a5a4a' },
  { id: 'dt-military-green', label: 'Military Green', color: '#f5f5f0', isDualTone: true, bottomColor: '#8b9a67' },
  { id: 'dt-bright-yellow', label: 'Bright Yellow', color: '#f5f5f0', isDualTone: true, bottomColor: '#f7ca44' },
  { id: 'dt-squirrel-grey', label: 'Squirrel Grey', color: '#f5f5f0', isDualTone: true, bottomColor: '#b5c7cd' },
  { id: 'dt-indium-grey', label: 'Indium Grey', color: '#f5f5f0', isDualTone: true, bottomColor: '#4d5661' },
];

export const TRAILER_TYPES: TrailerType[] = [
  {
    id: 'store-dispense',
    title: 'Store & Dispense',
    description: 'Ideal for businesses focused on ice-creams, drinks and display',
    basePrice: 99999,
    image: 'https://www.figma.com/api/mcp/asset/bca76fbd-971b-4ba0-b4da-da2cff16eec0',
    color: 'rgba(0,83,208,1)',
    features: [
      { id: '1', name: 'Cold Storage' },
      { id: '2', name: 'Enhanced Insulation' },
      { id: '3', name: 'Energy Efficient' },
    ],
    bestSuitedFor: [
      { id: '1', name: 'Coffee Shops', icon: '☕' },
      { id: '2', name: 'Ice Cream', icon: '🍦' },
      { id: '3', name: 'Smoothie Bars', icon: '🥤' },
      { id: '4', name: 'Juice Stands', icon: '🍋' },
      { id: '5', name: 'Sandwich & Salad', icon: '🥗' },
      { id: '6', name: 'Hot Sandwiches', icon: '🔥' },
    ],
    equipmentList: [
      'Reach-in refrigerators & freezers',
      'Undercounter refrigerators',
      'Refrigerated prep tables',
      'Ice makers',
      'Blenders and mixers',
      'Display coolers',
    ],
  },
  {
    id: 'cook-serve',
    title: 'Cook & Serve',
    description: 'Best for businesses involving cooking and grilling items like pizza, BBQ, gyros',
    basePrice: 99999,
    image: 'https://www.figma.com/api/mcp/asset/43ea7fce-eefb-4748-b6fb-d91718a1bdbc',
    color: 'rgba(218,99,75,1)',
    features: [
      { id: '1', name: 'Ventilation System' },
      { id: '2', name: 'Gas Connections' },
      { id: '3', name: 'Heat Resistant Materials' },
    ],
    bestSuitedFor: [
      { id: '1', name: 'Pizza & BBQ', icon: '🍕' },
      { id: '2', name: 'Gyros & Wraps', icon: '🌯' },
      { id: '3', name: 'Burgers', icon: '🍔' },
      { id: '4', name: 'Street Tacos', icon: '🌮' },
      { id: '5', name: 'Fried Chicken', icon: '🍗' },
      { id: '6', name: 'Grilled Meats', icon: '🥩' },
    ],
    equipmentList: [
      'Commercial gas range & griddle',
      'Deep fryers',
      'Commercial oven',
      'Ventilation hood system',
      'Prep tables & cutting surfaces',
      'Commercial refrigerator',
    ],
  },
];

export const SIZE_OPTIONS: SizeOption[] = [
  {
    id: '16ft',
    size: '16ft',
    description: 'Perfect for focused menus and mobile operations.',
    price: 99999,
    image: 'https://www.figma.com/api/mcp/asset/fc9d105e-79c4-429c-a66f-87c78452b34f',
    features: [],
  },
  {
    id: '18ft',
    size: '18ft',
    description: 'More room for equipment without sacrificing mobility.',
    price: 99999,
    image: 'https://www.figma.com/api/mcp/asset/fc9d105e-79c4-429c-a66f-87c78452b34f',
    features: [],
  },
  {
    id: '20ft',
    size: '20ft',
    description: 'A versatile size for growing food businesses.',
    price: 99999,
    image: 'https://www.figma.com/api/mcp/asset/fc9d105e-79c4-429c-a66f-87c78452b34f',
    features: [],
  },
  {
    id: '22ft',
    size: '22ft',
    description: 'Balanced workspace for busy service periods.',
    price: 99999,
    image: 'https://www.figma.com/api/mcp/asset/fc9d105e-79c4-429c-a66f-87c78452b34f',
    features: [],
  },
  {
    id: '24ft',
    size: '24ft',
    description: 'Built for larger menus and higher customer demand.',
    price: 99999,
    image: 'https://www.figma.com/api/mcp/asset/fc9d105e-79c4-429c-a66f-87c78452b34f',
    features: [],
  },
  {
    id: '26ft',
    size: '26ft',
    description: 'Extra capacity for expanded kitchen operations.',
    price: 99999,
    image: 'https://www.figma.com/api/mcp/asset/fc9d105e-79c4-429c-a66f-87c78452b34f',
    features: [],
  },
  {
    id: '28ft',
    size: '28ft',
    description: 'High-volume production with room for full crew.',
    price: 99999,
    image: 'https://www.figma.com/api/mcp/asset/fc9d105e-79c4-429c-a66f-87c78452b34f',
    features: [],
  },
  {
    id: '30ft',
    size: '30ft',
    description: 'Our most spacious layout for maximum production capacity.',
    price: 99999,
    image: 'https://www.figma.com/api/mcp/asset/fc9d105e-79c4-429c-a66f-87c78452b34f',
    features: [
      '3–5 person commercial kitchen',
      'Fully segmented prep, cook and serve zones',
      'Maximum flexibility for complex menus',
    ],
  },
];

export type EquipmentItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  trailerTypes: string[]; // which trailer types this belongs to
};

export type EquipmentCategory = {
  id: string;
  name: string;
  trailerTypes: string[];
  items: EquipmentItem[];
};

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  {
    id: 'refrigerators-freezers',
    name: 'Refrigerators/Freezers',
    trailerTypes: ['store-dispense'],
    items: [
      {
        id: 'refrigerator',
        name: 'Refrigerator',
        price: 99999,
        image: 'https://www.figma.com/api/mcp/asset/bca76fbd-971b-4ba0-b4da-da2cff16eec0',
        trailerTypes: ['store-dispense'],
      },
      {
        id: 'reach-in-freezer',
        name: 'Reach-In Freezer',
        price: 99999,
        image: 'https://www.figma.com/api/mcp/asset/bca76fbd-971b-4ba0-b4da-da2cff16eec0',
        trailerTypes: ['store-dispense'],
      },
      {
        id: 'chest-freezer',
        name: 'Chest Freezer',
        price: 99999,
        image: 'https://www.figma.com/api/mcp/asset/bca76fbd-971b-4ba0-b4da-da2cff16eec0',
        trailerTypes: ['store-dispense'],
      },
    ],
  },
  {
    id: 'restaurant-ranges',
    name: 'Restaurant Ranges',
    trailerTypes: ['cook-serve'],
    items: [
      {
        id: 'gas-range',
        name: 'Gas Range',
        price: 99999,
        image: 'https://www.figma.com/api/mcp/asset/43ea7fce-eefb-4748-b6fb-d91718a1bdbc',
        trailerTypes: ['cook-serve'],
      },
      {
        id: 'electric-range',
        name: 'Electric Range',
        price: 99999,
        image: 'https://www.figma.com/api/mcp/asset/43ea7fce-eefb-4748-b6fb-d91718a1bdbc',
        trailerTypes: ['cook-serve'],
      },
    ],
  },
];