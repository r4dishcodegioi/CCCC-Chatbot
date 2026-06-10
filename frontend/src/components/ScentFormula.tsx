'use client';

import { FormulaItem } from '@/lib/types';

interface ScentFormulaProps {
  formula: FormulaItem[];
}

export default function ScentFormula({ formula }: ScentFormulaProps) {
  return (
    <div className="space-y-3">
      {formula.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <div className="flex gap-1">
            {Array.from({ length: item.drops }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-4 rounded-full bg-gradient-to-b from-sage to-deep-green opacity-80"
                style={{
                  animationDelay: `${(index * 3 + i) * 0.1}s`,
                }}
              />
            ))}
          </div>
          <span className="text-sm text-gray-700 font-medium">
            {item.drops} giọt {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}
