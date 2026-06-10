'use client';

interface OptionButtonProps {
  label: string;
  text: string;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export default function OptionButton({ label, text, onClick, selected = false, disabled = false }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`option-btn w-full text-left px-4 py-3 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
        selected
          ? 'bg-sage/20 border-sage text-deep-green'
          : 'bg-white/60 border-white/50 hover:bg-sage/10 hover:border-sage/30 text-gray-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
        selected
          ? 'bg-sage text-white'
          : 'bg-cream text-tea-brown'
      }`}>
        {label}
      </span>
      <span className="text-sm leading-relaxed">{text}</span>
    </button>
  );
}
