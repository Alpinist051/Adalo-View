import { useState } from 'react';
import { Play, TrendingUp, Award, ChevronRight, Footprints } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface WalkingWidgetProps {
  onStartWalk: () => void;
  onViewHistory: () => void;
}

export function WalkingWidget({ onStartWalk, onViewHistory }: WalkingWidgetProps) {
  const todayDistance = 3.2;
  const weeklyGoal = 25;
  const weeklyProgress = 18.4;
  const lifetimeDistance = 128.4;
  
  const recentBadges = [
    { id: 1, icon: '🏃', name: '5km Club', earned: true },
    { id: 2, icon: '⚡', name: 'Speed Demon', earned: true },
    { id: 3, icon: '🔥', name: 'Week Warrior', earned: true },
  ];

  const progressPercentage = (weeklyProgress / weeklyGoal) * 100;

  return (
    <Card className="mx-4 mt-4 overflow-hidden bg-gradient-to-br from-[#3457D5] to-[#5B7FE8] text-white shadow-xl">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
      
      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Walking Tracker</h3>
              <p className="text-xs text-white/80">Keep your pup active!</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={onViewHistory}
          >
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Today's Progress */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xs text-white/70 mb-1">Today's Distance</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{todayDistance}</span>
                <span className="text-lg text-white/80">km</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/70 mb-1">Lifetime</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{lifetimeDistance}</span>
                <span className="text-sm text-white/80">km</span>
              </div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/80">Weekly Goal</span>
              <span className="font-semibold">{weeklyProgress}/{weeklyGoal} km</span>
            </div>
            <div className="relative">
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-300" />
            <p className="text-xs font-semibold text-white/90">Recent Achievements</p>
          </div>
          <div className="flex gap-2">
            {recentBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex-1 bg-white/15 backdrop-blur-sm rounded-lg p-2 text-center"
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-[10px] text-white/90 font-medium">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onStartWalk}
          className="w-full bg-white text-[#3457D5] hover:bg-gray-100 font-semibold h-12 text-base shadow-lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Walking Now
        </Button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-lg font-bold">12</div>
            <div className="text-[10px] text-white/70">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">45</div>
            <div className="text-[10px] text-white/70">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-300" />
              18%
            </div>
            <div className="text-[10px] text-white/70">Growth</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
