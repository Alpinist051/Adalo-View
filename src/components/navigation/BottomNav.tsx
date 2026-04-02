import { Home, PlusSquare, User, MapPin, Users } from 'lucide-react';
import { Button } from '../ui/button';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'find', icon: Users, label: 'Find' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'map', icon: MapPin, label: 'Map' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex h-16 w-full max-w-lg items-center justify-around border-t border-gray-200 bg-white shadow-lg sm:mb-3 sm:rounded-2xl sm:border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="icon"
              className="relative h-14 w-14 flex-col items-center justify-center gap-1 rounded-xl"
              onClick={() => onTabChange(tab.id)}
            >
              <Icon
                className={`h-6 w-6 ${
                  isActive ? 'text-[#3457D5]' : 'text-gray-400'
                }`}
              />
              <span className={`text-[10px] ${isActive ? 'text-[#3457D5] font-semibold' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
