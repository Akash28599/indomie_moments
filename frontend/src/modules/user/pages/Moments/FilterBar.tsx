import { Filter, TrendingUp } from 'lucide-react';
import type { FilterType } from './types/moments';
import { FILTER_BUTTONS } from './constant/moments.constants';

interface FilterBarProps {
  active: FilterType;
  onChange: (value: FilterType) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ active, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filter by:</span>
        </div>

        <div className="flex gap-3">
          {FILTER_BUTTONS.map((btn) => (
            <button
              key={btn.key}
              onClick={() => onChange(btn.key)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                active === btn.key
                  ? btn.activeClass
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {btn.showTrendingIcon && (
                <TrendingUp className="w-4 h-4 inline mr-2" />
              )}
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
