import { Footprints, ChevronRight, Award, Dog } from 'lucide-react';
import { Card } from '../ui/card';

// Custom person walking dog icon
const PersonWalkingDogIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Person's head */}
    <circle cx="7" cy="4" r="2" />
    {/* Person's body */}
    <path d="M7 6v6" />
    {/* Person's legs */}
    <path d="M7 12l-2 4" />
    <path d="M7 12l2 4" />
    {/* Person's arm holding leash */}
    <path d="M7 8l3 2" />
    {/* Leash */}
    <path d="M10 10l5 2" />
    {/* Dog body */}
    <ellipse cx="17" cy="14" rx="2.5" ry="2" />
    {/* Dog head */}
    <circle cx="18.5" cy="11.5" r="1.5" />
    {/* Dog legs */}
    <path d="M15.5 15.5v2" />
    <path d="M18.5 15.5v2" />
    {/* Dog tail */}
    <path d="M14.5 13.5l-1.5-1" />
  </svg>
);

interface CompactWalkingBarProps {
  todayDistance: number;
  lifetimeDistance: number;
  weeklyProgress: number;
  weeklyGoal: number;
  recentBadges: string[];
  onExpand: () => void;
  isCollapsed?: boolean;
}

export function CompactWalkingBar({
  todayDistance,
  lifetimeDistance,
  weeklyProgress,
  weeklyGoal,
  recentBadges,
  onExpand,
  isCollapsed = false,
}: CompactWalkingBarProps) {
  const progressPercentage = (weeklyProgress / weeklyGoal) * 100;

  return (
    <Card 
      className={`mx-4 mb-3 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 active:scale-[0.98] border-0 ${
        isCollapsed ? 'mt-2' : 'mt-0'
      }`}
      onClick={onExpand}
    >
      <div className={`bg-gradient-to-r from-[#3457D5] to-[#5B7FE8] transition-all duration-300 ${
        isCollapsed ? 'p-2' : 'p-3'
      }`}>
        <div className="flex items-center justify-between">
          {/* Left: Today's Distance */}
          <div className="flex items-center gap-3">
            <div className={`bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
              isCollapsed ? 'w-8 h-8' : 'w-10 h-10'
            }`}>
              <Footprints className={`text-white transition-all duration-300 ${
                isCollapsed ? 'w-4 h-4' : 'w-5 h-5'
              }`} />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className={`font-bold text-white transition-all duration-300 ${
                  isCollapsed ? 'text-lg' : 'text-2xl'
                }`}>{todayDistance}</span>
                <span className={`text-white/80 transition-all duration-300 ${
                  isCollapsed ? 'text-xs' : 'text-sm'
                }`}>km today</span>
              </div>
              <div className={`text-white/70 transition-all duration-300 overflow-hidden ${
                isCollapsed ? 'text-[10px] max-h-0 opacity-0' : 'text-xs max-h-10 opacity-100'
              }`}>
                {lifetimeDistance} km lifetime
              </div>
            </div>
          </div>

          {/* Right: Badges & Expand */}
          <div className="flex items-center gap-2">
            {/* Mini Badge Icons */}
            <div className={`flex items-center gap-2 transition-all duration-300 overflow-hidden ${
              isCollapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'
            }`}>
              {recentBadges.slice(0, 3).map((badge, index) => (
                <div
                  key={index}
                  className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-sm backdrop-blur-sm"
                >
                  {badge}
                </div>
              ))}
            </div>
            
            {/* Expand Icon */}
            <div className={`bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
              isCollapsed ? 'w-7 h-7' : 'w-8 h-8'
            }`}>
              <ChevronRight className={`text-white transition-all duration-300 ${
                isCollapsed ? 'w-3 h-3' : 'w-4 h-4'
              }`} />
            </div>
          </div>
        </div>

        {/* Mini Progress Bar */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'mt-0 max-h-0 opacity-0' : 'mt-2 max-h-20 opacity-100'
        }`}>
          <div className="flex justify-between text-xs text-white/80 mb-1">
            <span>Weekly Goal</span>
            <span>{weeklyProgress}/{weeklyGoal} km</span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}