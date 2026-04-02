import { Award, TrendingUp, Footprints, Target } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface WalkingStatsProfileProps {
  lifetimeDistance: number;
  petName?: string;
}

export function WalkingStatsProfile({ lifetimeDistance, petName = 'your pet' }: WalkingStatsProfileProps) {
  const badges = [
    { id: 1, name: '5km Club', icon: '🏃', distance: 5, unlocked: true },
    { id: 2, name: '10km Pro', icon: '⚡', distance: 10, unlocked: true },
    { id: 3, name: '50km Hero', icon: '⭐', distance: 50, unlocked: true },
    { id: 4, name: '100km Legend', icon: '🏆', distance: 100, unlocked: true },
    { id: 5, name: '200km Champion', icon: '👑', distance: 200, unlocked: false },
    { id: 6, name: '500km Master', icon: '💎', distance: 500, unlocked: false },
  ];

  const nextBadge = badges.find(b => !b.unlocked);
  const unlockedCount = badges.filter(b => b.unlocked).length;
  
  return (
    <div className="space-y-3">
      {/* Main Walking Stats Card */}
      <Card className="p-4 bg-gradient-to-br from-[#3457D5] to-[#5B7FE8] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10" />
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Footprints className="w-4 h-4" />
            </div>
            <h3 className="font-semibold">Walking Statistics</h3>
          </div>
          
          <div className="mb-3">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold">{lifetimeDistance}</span>
              <span className="text-lg text-white/80">km</span>
            </div>
            <p className="text-sm text-white/90">walked with {petName}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/20">
            <div className="text-center">
              <div className="text-lg font-bold">45</div>
              <div className="text-[10px] text-white/70">Total Walks</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">18.4</div>
              <div className="text-[10px] text-white/70">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />
                22%
              </div>
              <div className="text-[10px] text-white/70">Growth</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements/Badges */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#3457D5]" />
            <h3 className="font-semibold">Walking Achievements</h3>
          </div>
          <Badge variant="secondary" className="bg-[#3457D5]/10 text-[#3457D5]">
            {unlockedCount}/{badges.length}
          </Badge>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`text-center p-3 rounded-lg border-2 transition-all ${
                badge.unlocked
                  ? 'border-[#3457D5] bg-[#3457D5]/5'
                  : 'border-gray-200 bg-gray-50 opacity-50'
              }`}
            >
              <div className={`text-3xl mb-1 ${!badge.unlocked && 'grayscale'}`}>
                {badge.icon}
              </div>
              <p className={`text-[10px] font-medium ${badge.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                {badge.name}
              </p>
              {badge.unlocked && (
                <Badge className="mt-1 text-[10px] h-5 bg-[#3457D5]">Unlocked</Badge>
              )}
            </div>
          ))}
        </div>

        {/* Next Goal */}
        {nextBadge && (
          <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{nextBadge.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-900">Next: {nextBadge.name}</p>
                  <Target className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{lifetimeDistance}/{nextBadge.distance} km</span>
                </div>
                <Progress 
                  value={(lifetimeDistance / nextBadge.distance) * 100} 
                  className="h-2 bg-amber-200"
                />
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
