interface PawIconProps {
  className?: string;
  size?: number;
}

export function PawIcon({ className = '', size = 20 }: PawIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Main pad */}
      <ellipse cx="12" cy="17" rx="4" ry="3" />
      
      {/* Top left toe */}
      <ellipse cx="7" cy="10" rx="2" ry="2.5" />
      
      {/* Top middle-left toe */}
      <ellipse cx="10" cy="7" rx="2" ry="2.5" />
      
      {/* Top middle-right toe */}
      <ellipse cx="14" cy="7" rx="2" ry="2.5" />
      
      {/* Top right toe */}
      <ellipse cx="17" cy="10" rx="2" ry="2.5" />
    </svg>
  );
}
