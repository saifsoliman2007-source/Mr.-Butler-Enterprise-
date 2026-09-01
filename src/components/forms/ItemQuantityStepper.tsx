import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface ItemQuantityStepperProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  itemName?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const ItemQuantityStepper: React.FC<ItemQuantityStepperProps> = ({
  count,
  onIncrement,
  onDecrement,
  min = 0,
  max = 99,
  itemName = 'item',
  className = '',
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center bg-white dark:bg-slate-800 rounded-xl border border-[#D9E3F6] dark:border-slate-700 shadow-2xs shrink-0 overflow-hidden select-none ${className}`}
      role="group"
      aria-label={`Quantity selector for ${itemName}`}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={count <= min}
        aria-label={`Decrease ${itemName}`}
        className={`${
          isSm ? 'w-7 h-7' : 'w-8 h-8'
        } flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95`}
      >
        <Minus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>

      <span
        className={`${
          isSm ? 'w-6 text-xs' : 'w-7 text-xs sm:text-sm'
        } text-center font-mono font-bold text-[#00444D] dark:text-white`}
      >
        {count}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={count >= max}
        aria-label={`Increase ${itemName}`}
        className={`${
          isSm ? 'w-7 h-7' : 'w-8 h-8'
        } flex items-center justify-center text-white bg-[#00444D] hover:bg-[#0D5D68] active:bg-[#00343B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95`}
      >
        <Plus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>
    </div>
  );
};
