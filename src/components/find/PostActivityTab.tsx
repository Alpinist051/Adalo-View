import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Image, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';

export function PostActivityTab() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="p-4 space-y-4">
      {/* Info Card */}
      <Card className="p-4 bg-gradient-to-br from-[#3457D5]/10 to-blue-50 border-[#3457D5]/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#3457D5] rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-1">Create an Activity or Event</h4>
            <p className="text-xs text-gray-600">
              Organize playdates, group walks, cafe meetups, or any pet-friendly gathering!
            </p>
          </div>
        </div>
      </Card>

      {/* Form */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Activity Details</h3>
        
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Activity Title *</Label>
            <Input 
              id="title" 
              placeholder="e.g., Group Dog Playdate at Riverside Park"
              className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
            />
          </div>

          {/* Activity Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Activity Type *</Label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="walk">Group Walk</SelectItem>
                <SelectItem value="playdate">Playdate</SelectItem>
                <SelectItem value="cafe">Cafe Meetup</SelectItem>
                <SelectItem value="park">Park Hangout</SelectItem>
                <SelectItem value="beach">Beach Trip</SelectItem>
                <SelectItem value="training">Training Session</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your activity... What pets are welcome? Any special requirements?"
              className="min-h-[100px] border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  id="date" 
                  type="date" 
                  className="pl-10 border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  id="time" 
                  type="time" 
                  className="pl-10 border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="location"
                placeholder="Enter address or place name"
                className="pl-10 border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
              />
            </div>
          </div>

          {/* Map Preview */}
          <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Map preview will appear here</p>
              <p className="text-xs text-gray-400">Tap to adjust location</p>
            </div>
          </div>

          {/* Max Participants */}
          <div className="space-y-2">
            <Label htmlFor="max-participants">Max Participants</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="max-participants"
                type="number"
                placeholder="Leave empty for unlimited"
                className="pl-10 border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
              />
            </div>
          </div>

          {/* Pet Requirements */}
          <div className="space-y-2">
            <Label htmlFor="pet-requirements">Pet Requirements</Label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]">
                <SelectValue placeholder="Any pets welcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pets Welcome</SelectItem>
                <SelectItem value="dogs-only">Dogs Only</SelectItem>
                <SelectItem value="cats-only">Cats Only</SelectItem>
                <SelectItem value="small">Small Pets Only</SelectItem>
                <SelectItem value="large">Large Pets Only</SelectItem>
                <SelectItem value="friendly">Friendly Pets Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Photo */}
          <div className="space-y-2">
            <Label>Add Photo (Optional)</Label>
            <Button variant="outline" className="w-full border-dashed border-2 h-24 border-gray-300 hover:border-[#3457D5] hover:bg-[#3457D5]/5">
              <div className="text-center">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Add a cover photo</p>
              </div>
            </Button>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Label htmlFor="public" className="font-semibold text-sm cursor-pointer">
                  Public Activity
                </Label>
              </div>
              <p className="text-xs text-gray-500">
                {isPublic 
                  ? 'Anyone can see and join this activity' 
                  : 'Only invited people can see this activity'}
              </p>
            </div>
            <Switch 
              id="public" 
              checked={isPublic} 
              onCheckedChange={setIsPublic}
              className="data-[state=checked]:bg-[#3457D5]"
            />
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              Please ensure your activity follows community guidelines and local regulations regarding pets in public spaces.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1">
              Save Draft
            </Button>
            <Button className="flex-1 bg-[#3457D5] hover:bg-[#2A47B0]">
              Publish Activity
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
