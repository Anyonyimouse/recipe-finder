declare module 'lucide-react-native' {
  import React from 'react';

  export interface LucideProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    className?: string;
    fill?: string;
    style?: any;
  }

  export type Icon = React.FC<LucideProps>;

  export const Heart: Icon;
  export const Star: Icon;
  export const Search: Icon;
  export const Clock: Icon;
  export const Users: Icon;
  export const ChefHat: Icon;
  export const Flame: Icon;
  export const ArrowLeft: Icon;
  export const Trash2: Icon;
  export const Plus: Icon;
  export const Check: Icon;
  export const Calendar: Icon;
  export const ShoppingBag: Icon;
  export const Volume2: Icon;
  export const VolumeX: Icon;
  export const Play: Icon;
  export const Pause: Icon;
  export const RotateCcw: Icon;
  export const Utensils: Icon;
  export const UtensilsCrossed: Icon;
  export const Filter: Icon;
  export const CheckSquare: Icon;
  export const Square: Icon;
  export const RefreshCw: Icon;
  export const Info: Icon;
  export const AlertCircle: Icon;
  export const Sparkles: Icon;
  export const Camera: Icon;
  export const Image: Icon;
  export const Mic: Icon;
  export const MicOff: Icon;
  export const X: Icon;
  export const Edit: Icon;
  export const Share2: Icon;
  export const Bookmark: Icon;
  export const Apple: Icon;
  export const Zap: Icon;
  export const ShieldAlert: Icon;
  export const Scale: Icon;
  export const ChevronRight: Icon;
  export const ChevronDown: Icon;
  export const ChevronUp: Icon;
  export const ChevronLeft: Icon;
  export const CheckCircle: Icon;
  export const CheckCircle2: Icon;
  export const Compass: Icon;
  export const Home: Icon;
  export const AlignJustify: Icon;
  export const Minus: Icon;
  export const Download: Icon;
  export const Dumbbell: Icon;
  export const Wheat: Icon;
  export const Droplets: Icon;
  export const Pin: Icon;
  export const Maximize2: Icon;
  export const Timer: Icon;

  export const LucideIcon: Icon;
}
