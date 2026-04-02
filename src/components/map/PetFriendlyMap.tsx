import { useState } from 'react';
import { MapPin, Search, Plus, Star, AlertTriangle, Coffee, Hotel, Trees, Droplets, Utensils } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface MapMarker {
  id: string;
  name: string;
  type: 'restaurant' | 'hotel' | 'park' | 'water' | 'warning';
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  distance: string;
  description: string;
  facilities: string[];
}

const mockMarkers: MapMarker[] = [
  {
    id: '1',
    name: 'Bark & Brew Cafe',
    type: 'restaurant',
    lat: 40.7589,
    lng: -73.9851,
    rating: 4.8,
    reviews: 234,
    distance: '0.3 mi',
    description: 'Dog-friendly cafe with outdoor seating and water bowls',
    facilities: ['Outdoor Seating', 'Water Bowls', 'Treats Available'],
  },
  {
    id: '2',
    name: 'Central Bark Park',
    type: 'park',
    lat: 40.7829,
    lng: -73.9654,
    rating: 4.9,
    reviews: 567,
    distance: '0.5 mi',
    description: 'Large off-leash dog park with separate areas for small and large dogs',
    facilities: ['Off-Leash Area', 'Water Fountains', 'Waste Stations', 'Agility Equipment'],
  },
  {
    id: '3',
    name: 'Pet Palace Hotel',
    type: 'hotel',
    lat: 40.7489,
    lng: -73.9680,
    rating: 4.6,
    reviews: 189,
    distance: '1.2 mi',
    description: 'Luxury pet-friendly hotel with pet sitting services',
    facilities: ['Pet Sitting', 'Dog Beds', 'Welcome Treats'],
  },
  {
    id: '4',
    name: 'Riverside Water Station',
    type: 'water',
    lat: 40.7729,
    lng: -73.9851,
    rating: 4.5,
    reviews: 89,
    distance: '0.8 mi',
    description: 'Public water fountain for dogs along the riverside trail',
    facilities: ['Water Fountain', 'Waste Bags', 'Shade'],
  },
  {
    id: '5',
    name: 'WARNING: Toxic Plants',
    type: 'warning',
    lat: 40.7629,
    lng: -73.9751,
    rating: 0,
    reviews: 45,
    distance: '0.6 mi',
    description: 'Area contains toxic plants dangerous to dogs. Keep pets on leash.',
    facilities: [],
  },
];

const getMarkerIcon = (type: string) => {
  switch (type) {
    case 'restaurant':
      return <Utensils className="w-4 h-4" />;
    case 'hotel':
      return <Hotel className="w-4 h-4" />;
    case 'park':
      return <Trees className="w-4 h-4" />;
    case 'water':
      return <Droplets className="w-4 h-4" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <MapPin className="w-4 h-4" />;
  }
};

const getMarkerColor = (type: string) => {
  switch (type) {
    case 'restaurant':
      return 'bg-blue-500';
    case 'hotel':
      return 'bg-purple-500';
    case 'park':
      return 'bg-green-500';
    case 'water':
      return 'bg-cyan-500';
    case 'warning':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export function PetFriendlyMap() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filter, setFilter] = useState('all');

  const filteredMarkers = filter === 'all' 
    ? mockMarkers 
    : mockMarkers.filter(m => m.type === filter);

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header with Search */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">Pet-Friendly Places</h1>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Place
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Pet-Friendly Location</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="place-name">Place Name</Label>
                    <Input id="place-name" placeholder="Bark & Brew Cafe" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant/Cafe</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="park">Park</SelectItem>
                        <SelectItem value="water">Water Station</SelectItem>
                        <SelectItem value="warning">Warning/Hazard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address/Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="address"
                        placeholder="123 Park Ave, NY"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the location and pet amenities..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facilities">Facilities (comma separated)</Label>
                    <Input
                      id="facilities"
                      placeholder="Water bowls, Outdoor seating, Treats"
                    />
                  </div>

                  {/* Map Preview */}
                  <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Tap to set location on map</p>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Add Location
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search pet-friendly places..."
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            >
              All
            </Button>
            <Button
              variant={filter === 'restaurant' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('restaurant')}
              className={filter === 'restaurant' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            >
              <Utensils className="w-3 h-3 mr-1" />
              Food
            </Button>
            <Button
              variant={filter === 'park' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('park')}
              className={filter === 'park' ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              <Trees className="w-3 h-3 mr-1" />
              Parks
            </Button>
            <Button
              variant={filter === 'hotel' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('hotel')}
              className={filter === 'hotel' ? 'bg-purple-500 hover:bg-purple-600' : ''}
            >
              <Hotel className="w-3 h-3 mr-1" />
              Hotels
            </Button>
            <Button
              variant={filter === 'warning' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('warning')}
              className={filter === 'warning' ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              Warnings
            </Button>
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="relative bg-gray-100 h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Interactive Map View</p>
            <p className="text-xs text-gray-400">Markers for pet-friendly locations</p>
          </div>
        </div>

        {/* Mock Map Markers */}
        <div className="absolute inset-0">
          {filteredMarkers.slice(0, 3).map((marker, idx) => (
            <div
              key={marker.id}
              className={`absolute ${getMarkerColor(marker.type)} w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform`}
              style={{
                left: `${20 + idx * 30}%`,
                top: `${30 + idx * 20}%`,
              }}
              onClick={() => setSelectedMarker(marker)}
            >
              {getMarkerIcon(marker.type)}
            </div>
          ))}
        </div>
      </div>

      {/* Locations List */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Nearby Locations</h2>
          <Badge variant="secondary">{filteredMarkers.length} places</Badge>
        </div>

        {filteredMarkers.map((marker) => (
          <Card
            key={marker.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedMarker(marker)}
          >
            <div className="flex gap-3">
              <div className={`${getMarkerColor(marker.type)} w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                {getMarkerIcon(marker.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{marker.name}</h3>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    {marker.distance}
                  </Badge>
                </div>

                {marker.type !== 'warning' && (
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{marker.rating}</span>
                    <span className="text-xs text-gray-500">({marker.reviews} reviews)</span>
                  </div>
                )}

                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{marker.description}</p>

                {marker.facilities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {marker.facilities.slice(0, 3).map((facility, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                    {marker.facilities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{marker.facilities.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {marker.type === 'warning' && (
                  <Badge variant="destructive" className="text-xs mt-1">
                    ⚠️ Caution Required
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Marker Detail Modal */}
      {selectedMarker && (
        <Dialog open={!!selectedMarker} onOpenChange={() => setSelectedMarker(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={`${getMarkerColor(selectedMarker.type)} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  {getMarkerIcon(selectedMarker.type)}
                </div>
                <div>
                  <DialogTitle>{selectedMarker.name}</DialogTitle>
                  <p className="text-sm text-gray-500">{selectedMarker.distance} away</p>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              {selectedMarker.type !== 'warning' && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{selectedMarker.rating}</span>
                  <span className="text-sm text-gray-500">({selectedMarker.reviews} reviews)</span>
                </div>
              )}

              <p className="text-sm text-gray-700">{selectedMarker.description}</p>

              {selectedMarker.facilities.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMarker.facilities.map((facility, idx) => (
                      <Badge key={idx} variant="secondary">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                  Get Directions
                </Button>
                <Button variant="outline" className="flex-1">
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
