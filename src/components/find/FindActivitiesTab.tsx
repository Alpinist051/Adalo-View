import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Filter, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface Activity {
  id: string;
  title: string;
  type: string;
  organizer: string;
  organizerAvatar: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  petRequirement: string;
  distance: string;
  image?: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Sunday Morning Dog Playdate',
    type: 'Playdate',
    organizer: 'jessica_paws',
    organizerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: 'This Sunday',
    time: '10:00 AM',
    location: 'Central Dog Park',
    description: 'Bringing all the pups together for some fun! Off-leash area reserved.',
    maxParticipants: 15,
    currentParticipants: 8,
    petRequirement: 'Friendly dogs',
    distance: '0.8 mi',
  },
  {
    id: '2',
    title: 'Pet-Friendly Brunch Meetup',
    type: 'Cafe',
    organizer: 'mike_and_buddy',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    date: 'Saturday',
    time: '11:30 AM',
    location: 'Bark & Brew Cafe',
    description: 'Brunch with our furry friends! The cafe has a pet-friendly patio.',
    maxParticipants: 10,
    currentParticipants: 6,
    petRequirement: 'All pets',
    distance: '1.2 mi',
  },
  {
    id: '3',
    title: 'Beach Walk & Swim',
    type: 'Beach',
    organizer: 'ocean_lover_labs',
    organizerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    date: 'Next Saturday',
    time: '3:00 PM',
    location: 'Dog Beach North',
    description: 'Let your water-loving pups run free on the beach! Bring towels.',
    maxParticipants: 20,
    currentParticipants: 12,
    petRequirement: 'Dogs only',
    distance: '3.5 mi',
  },
  {
    id: '4',
    title: 'Puppy Training Circle',
    type: 'Training',
    organizer: 'trainer_sarah',
    organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    date: 'Friday',
    time: '6:00 PM',
    location: 'Community Center',
    description: 'Free puppy socialization and basic training session. All levels welcome!',
    maxParticipants: 12,
    currentParticipants: 9,
    petRequirement: 'Puppies under 1 year',
    distance: '2.1 mi',
  },
];

export function FindActivitiesTab() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="p-4 space-y-3">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-[#3457D5] hover:bg-[#2A47B0]' : ''}
        >
          All
        </Button>
        <Button
          variant={filter === 'weekend' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('weekend')}
          className={filter === 'weekend' ? 'bg-[#3457D5] hover:bg-[#2A47B0]' : ''}
        >
          This Weekend
        </Button>
        <Button
          variant={filter === 'nearby' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('nearby')}
          className={filter === 'nearby' ? 'bg-[#3457D5] hover:bg-[#2A47B0]' : ''}
        >
          Nearby
        </Button>
        <Button
          variant={filter === 'playdate' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('playdate')}
          className={filter === 'playdate' ? 'bg-[#3457D5] hover:bg-[#2A47B0]' : ''}
        >
          Playdates
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {mockActivities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden hover:shadow-md transition-shadow">
            {/* Image (if exists) */}
            {activity.image && (
              <div className="h-40 bg-gray-200">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-base">{activity.title}</h3>
                  </div>
                  <Badge variant="secondary" className="bg-[#3457D5]/10 text-[#3457D5] text-xs">
                    {activity.type}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs whitespace-nowrap ml-2">
                  {activity.distance}
                </Badge>
              </div>

              {/* Organizer */}
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-6 h-6 border border-gray-200">
                  <AvatarImage src={activity.organizerAvatar} alt={activity.organizer} />
                  <AvatarFallback className="text-xs">{activity.organizer[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600">
                  Organized by <span className="font-medium text-gray-900">{activity.organizer}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {activity.description}
              </p>

              {/* Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{activity.date}</span>
                  <Clock className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-700">{activity.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{activity.location}</span>
                </div>
              </div>

              {/* Participants */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#3457D5]" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      {activity.currentParticipants}/{activity.maxParticipants} joined
                    </p>
                    <p className="text-xs text-gray-500">{activity.petRequirement}</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(Math.min(3, activity.currentParticipants))].map((_, i) => (
                    <div 
                      key={i}
                      className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"
                    />
                  ))}
                  {activity.currentParticipants > 3 && (
                    <div className="w-6 h-6 rounded-full bg-[#3457D5] border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] text-white font-medium">
                        +{activity.currentParticipants - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-[#3457D5] hover:bg-[#2A47B0]">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Join Activity
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-[#3457D5]/20 text-[#3457D5]">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <Button variant="outline" className="w-full">
        Load More Activities
      </Button>
    </div>
  );
}
