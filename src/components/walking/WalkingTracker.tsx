import { useState } from 'react';
import { Play, Pause, Square, MapPin, Clock, TrendingUp, Award, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

interface WalkStats {
  distance: number;
  duration: number;
  avgPace: string;
  calories: number;
}

interface WalkingTrackerProps {
  onBack?: () => void;
}

export function WalkingTracker({ onBack }: WalkingTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWalk, setCurrentWalk] = useState<WalkStats>({
    distance: 0,
    duration: 0,
    avgPace: '0:00',
    calories: 0,
  });

  // Mock stats data
  const weeklyStats = {
    totalDistance: 24.5,
    totalWalks: 12,
    totalTime: '8h 30m',
    avgDistance: 2.04,
  };

  const monthlyStats = {
    totalDistance: 98.3,
    totalWalks: 45,
    totalTime: '32h 15m',
    avgDistance: 2.18,
  };

  const achievements = [
    { id: 1, name: 'First Walk', icon: '🎉', unlocked: true },
    { id: 2, name: '10 Miles', icon: '🏃', unlocked: true },
    { id: 3, name: 'Week Streak', icon: '🔥', unlocked: true },
    { id: 4, name: '50 Miles', icon: '⭐', unlocked: false },
    { id: 5, name: 'Marathon', icon: '🏆', unlocked: false },
  ];

  const handleStartWalk = () => {
    setIsTracking(true);
    setIsPaused(false);
  };

  const handlePauseWalk = () => {
    setIsPaused(!isPaused);
  };

  const handleStopWalk = () => {
    setIsTracking(false);
    setIsPaused(false);
    // Reset or save walk
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="font-bold text-xl">Walking Tracker</h1>
              <p className="text-sm text-gray-500">Track your adventures with your pup</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Walk Tracker */}
        {!isTracking ? (
          <Card className="p-6 bg-gradient-to-br from-green-500 to-blue-500 text-white">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold">Ready for a walk?</h2>
              <p className="text-white/90">Start tracking your route and distance</p>
              <Button
                onClick={handleStartWalk}
                className="bg-white text-green-600 hover:bg-gray-100 w-full"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Walking
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 bg-white">
            <div className="space-y-6">
              {/* Live Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">2.4</p>
                  <p className="text-sm text-gray-500">Miles</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">32:15</p>
                  <p className="text-sm text-gray-500">Duration</p>
                </div>
              </div>

              {/* Map Preview */}
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">GPS Route Map</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={handlePauseWalk}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  {isPaused ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleStopWalk}
                  variant="destructive"
                  className="flex-1"
                  size="lg"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Finish
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Tabs */}
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week" className="space-y-4 mt-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Weekly Progress</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-green-600">{weeklyStats.totalDistance}</p>
                  <p className="text-xs text-gray-500">Total Miles</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{weeklyStats.totalWalks}</p>
                  <p className="text-xs text-gray-500">Total Walks</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{weeklyStats.totalTime}</p>
                  <p className="text-xs text-gray-500">Total Time</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{weeklyStats.avgDistance} mi</p>
                  <p className="text-xs text-gray-500">Avg Distance</p>
                </div>
              </div>
              
              {/* Progress toward goal */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Weekly Goal</span>
                  <span className="font-semibold">{weeklyStats.totalDistance}/30 mi</span>
                </div>
                <Progress value={(weeklyStats.totalDistance / 30) * 100} className="h-2" />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="space-y-4 mt-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Monthly Progress</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-green-600">{monthlyStats.totalDistance}</p>
                  <p className="text-xs text-gray-500">Total Miles</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{monthlyStats.totalWalks}</p>
                  <p className="text-xs text-gray-500">Total Walks</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{monthlyStats.totalTime}</p>
                  <p className="text-xs text-gray-500">Total Time</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{monthlyStats.avgDistance} mi</p>
                  <p className="text-xs text-gray-500">Avg Distance</p>
                </div>
              </div>

              {/* Progress toward goal */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Monthly Goal</span>
                  <span className="font-semibold">{monthlyStats.totalDistance}/120 mi</span>
                </div>
                <Progress value={(monthlyStats.totalDistance / 120) * 100} className="h-2" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievements */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">Achievements</h3>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center ${
                  achievement.unlocked ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="text-3xl mb-1">{achievement.icon}</div>
                <p className="text-xs text-gray-600">{achievement.name}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Share Walk */}
        <Button variant="outline" className="w-full" size="lg">
          Share Your Walk Progress
        </Button>
      </div>
    </div>
  );
}