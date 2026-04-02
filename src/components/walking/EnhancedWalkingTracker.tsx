import { useState, useEffect } from 'react';
import { Play, Pause, Square, MapPin, Clock, TrendingUp, Award, ArrowLeft, Share2, Zap, Target, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface WalkingTrackerProps {
  onBack?: () => void;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export function EnhancedWalkingTracker({ onBack }: WalkingTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [currentPace, setCurrentPace] = useState('0:00');
  const [currentCalories, setCurrentCalories] = useState(0);

  // Simulate tracking
  useEffect(() => {
    if (isTracking && !isPaused) {
      const interval = setInterval(() => {
        setCurrentDistance(prev => +(prev + 0.01).toFixed(2));
        setCurrentDuration(prev => prev + 1);
        setCurrentCalories(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTracking, isPaused]);

  // Weekly data for chart
  const weeklyData = [
    { day: 'Mon', distance: 2.4, duration: 35 },
    { day: 'Tue', distance: 3.1, duration: 45 },
    { day: 'Wed', distance: 1.8, duration: 28 },
    { day: 'Thu', distance: 4.2, duration: 58 },
    { day: 'Fri', distance: 2.9, duration: 42 },
    { day: 'Sat', distance: 5.3, duration: 72 },
    { day: 'Sun', distance: 3.8, duration: 51 },
  ];

  // Monthly data
  const monthlyData = [
    { week: 'Week 1', distance: 15.2 },
    { week: 'Week 2', distance: 18.7 },
    { week: 'Week 3', distance: 21.4 },
    { week: 'Week 4', distance: 24.5 },
  ];

  // Pace data over time
  const paceData = [
    { time: '0', pace: 0 },
    { time: '5', pace: 13.2 },
    { time: '10', pace: 12.8 },
    { time: '15', pace: 13.5 },
    { time: '20', pace: 12.9 },
    { time: '25', pace: 13.1 },
    { time: '30', pace: 12.7 },
  ];

  const weeklyStats = {
    totalDistance: 24.5,
    totalWalks: 12,
    totalTime: '8h 30m',
    avgDistance: 2.04,
    avgPace: '13:15',
    totalCalories: 1840,
  };

  const monthlyStats = {
    totalDistance: 98.3,
    totalWalks: 45,
    totalTime: '32h 15m',
    avgDistance: 2.18,
    avgPace: '13:02',
    totalCalories: 7320,
  };

  const achievements: Achievement[] = [
    { 
      id: 1, 
      name: 'First Steps', 
      description: 'Complete your first walk',
      icon: '🎉', 
      unlocked: true 
    },
    { 
      id: 2, 
      name: '10 Miles', 
      description: 'Walk a total of 10 miles',
      icon: '🏃', 
      unlocked: true,
      progress: 24.5,
      target: 10
    },
    { 
      id: 3, 
      name: 'Week Warrior', 
      description: 'Walk 7 days in a row',
      icon: '🔥', 
      unlocked: true,
      progress: 7,
      target: 7
    },
    { 
      id: 4, 
      name: 'Marathon', 
      description: 'Walk 26.2 miles in one month',
      icon: '🏆', 
      unlocked: false,
      progress: 24.5,
      target: 26.2
    },
    { 
      id: 5, 
      name: '50 Miles', 
      description: 'Walk a total of 50 miles',
      icon: '⭐', 
      unlocked: false,
      progress: 24.5,
      target: 50
    },
    { 
      id: 6, 
      name: 'Speed Demon', 
      description: 'Maintain under 12 min/mile pace',
      icon: '⚡', 
      unlocked: false,
      progress: 45,
      target: 100
    },
    { 
      id: 7, 
      name: 'Century Club', 
      description: 'Walk 100 total miles',
      icon: '💯', 
      unlocked: false,
      progress: 24.5,
      target: 100
    },
    { 
      id: 8, 
      name: 'Social Butterfly', 
      description: 'Walk with 10 different buddies',
      icon: '🦋', 
      unlocked: false,
      progress: 3,
      target: 10
    },
  ];

  const handleStartWalk = () => {
    setIsTracking(true);
    setIsPaused(false);
    setCurrentDistance(0);
    setCurrentDuration(0);
    setCurrentCalories(0);
  };

  const handlePauseWalk = () => {
    setIsPaused(!isPaused);
  };

  const handleStopWalk = () => {
    setIsTracking(false);
    setIsPaused(false);
    setShowShareDialog(true);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex-1">
              <h1 className="font-bold text-xl">Walking Tracker</h1>
              <p className="text-sm text-gray-500">Track your adventures with your pup</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Walk Tracker */}
        {!isTracking ? (
          <Card className="p-6 bg-gradient-to-br from-green-500 to-blue-500 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            <div className="relative text-center space-y-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
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
          <div className="space-y-4">
            {/* Live Stats Card */}
            <Card className="p-6 bg-white">
              <div className="space-y-6">
                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-1">
                      {currentDistance.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Miles
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-1">
                      {formatDuration(currentDuration)}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4" />
                      Duration
                    </div>
                  </div>
                </div>

                {/* Secondary Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{currentPace}</div>
                      <div className="text-xs text-gray-500">Avg Pace</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{currentCalories}</div>
                      <div className="text-xs text-gray-500">Calories</div>
                    </div>
                  </div>
                </div>

                {/* Live Map Preview */}
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      <path
                        d="M 20 100 Q 60 60, 100 80 T 180 90 T 260 70 T 340 100"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg animate-pulse">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">GPS Tracking Active</p>
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
                    className="flex-1 bg-red-500 hover:bg-red-600"
                    size="lg"
                  >
                    <Square className="w-5 h-5 mr-2" />
                    Finish
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Stats Tabs with Charts */}
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week" className="space-y-4 mt-4">
            {/* Quick Stats */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Weekly Overview</h3>
                <Badge className="bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{weeklyStats.totalDistance}</div>
                  <div className="text-xs text-gray-500 mt-1">Total Miles</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalWalks}</div>
                  <div className="text-xs text-gray-500 mt-1">Walks</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{weeklyStats.avgPace}</div>
                  <div className="text-xs text-gray-500 mt-1">Avg Pace</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">{weeklyStats.totalTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Cal:</span>
                  <span className="font-semibold">{weeklyStats.totalCalories}</span>
                </div>
              </div>
              
              {/* Progress toward goal */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Weekly Goal (30 mi)</span>
                  <span className="font-semibold">{Math.round((weeklyStats.totalDistance / 30) * 100)}%</span>
                </div>
                <Progress value={(weeklyStats.totalDistance / 30) * 100} className="h-3" />
              </div>
            </Card>

            {/* Distance Chart */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Daily Distance</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="distance" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fill="url(#colorDistance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Duration Chart */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Daily Duration (minutes)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="duration" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="space-y-4 mt-4">
            {/* Quick Stats */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Monthly Overview</h3>
                <Badge className="bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +18%
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{monthlyStats.totalDistance}</div>
                  <div className="text-xs text-gray-500 mt-1">Total Miles</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{monthlyStats.totalWalks}</div>
                  <div className="text-xs text-gray-500 mt-1">Walks</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{monthlyStats.avgPace}</div>
                  <div className="text-xs text-gray-500 mt-1">Avg Pace</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">{monthlyStats.totalTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Cal:</span>
                  <span className="font-semibold">{monthlyStats.totalCalories}</span>
                </div>
              </div>

              {/* Progress toward goal */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Monthly Goal (120 mi)</span>
                  <span className="font-semibold">{Math.round((monthlyStats.totalDistance / 120) * 100)}%</span>
                </div>
                <Progress value={(monthlyStats.totalDistance / 120) * 100} className="h-3" />
              </div>
            </Card>

            {/* Weekly Progress Chart */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Weekly Progress</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="distance" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Pace Trend */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Average Pace Trend (min/mile)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={paceData}>
                  <defs>
                    <linearGradient id="colorPace" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    label={{ value: 'Minutes', position: 'insideBottom', offset: -5, style: { fontSize: 12, fill: '#6b7280' } }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pace" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    fill="url(#colorPace)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievements */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">Achievements</h3>
            <Badge variant="secondary" className="ml-auto">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  achievement.unlocked 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-40'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className={`font-semibold text-sm ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-yellow-500 text-white ml-2">
                          Unlocked!
                        </Badge>
                      )}
                    </div>
                    {!achievement.unlocked && achievement.progress !== undefined && achievement.target && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{achievement.progress}/{achievement.target}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Share Button */}
        <Button 
          variant="outline" 
          className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50" 
          size="lg"
          onClick={() => setShowShareDialog(true)}
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Your Progress
        </Button>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Walk</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Walk Summary Card */}
            <Card className="p-4 bg-gradient-to-br from-green-500 to-blue-500 text-white">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Walk Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-3">
                  <div>
                    <div className="text-3xl font-bold">{currentDistance.toFixed(2)}</div>
                    <div className="text-sm text-white/80">Miles</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{formatDuration(currentDuration)}</div>
                    <div className="text-sm text-white/80">Duration</div>
                  </div>
                </div>

                <div className="flex justify-around text-sm border-t border-white/20 pt-3">
                  <div>
                    <div className="font-semibold">{currentCalories}</div>
                    <div className="text-white/80 text-xs">Calories</div>
                  </div>
                  <div>
                    <div className="font-semibold">{currentPace}</div>
                    <div className="text-white/80 text-xs">Avg Pace</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Share Options */}
            <div className="space-y-2">
              <Button className="w-full bg-green-500 hover:bg-green-600" size="lg">
                Share to PawShare Feed
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="lg">
                  Save as Image
                </Button>
                <Button variant="outline" size="lg">
                  Copy Stats
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}