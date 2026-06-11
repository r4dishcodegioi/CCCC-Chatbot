'use client';

import { FormulaItem } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';

interface ScentFormulaProps {
  formula: FormulaItem[];
}

export default function ScentFormula({ formula }: ScentFormulaProps) {
  return (
    <div className="flex flex-col">
      {formula.map((item, index) => (
        <div
          key={item.name}
          className="flex justify-between items-center py-4 border-b border-gray-100 animate-fade-in"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <span className="text-sm text-gray-600 font-body">
            {item.drops} <FontAwesomeIcon icon={faDroplet} style={{ color: "rgb(255, 212, 59)", }} />
          </span>
          <span className="text-sm text-gray-800 font-body">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}
