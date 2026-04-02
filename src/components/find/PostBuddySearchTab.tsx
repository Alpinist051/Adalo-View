import { useState } from 'react';
import { MapPin, Clock, Users, Image, AlertCircle, Dog } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';

export function PostBuddySearchTab() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="p-4 space-y-4">
      {/* Info Card */}
      <Card className="p-4 bg-gradient-to-br from-[#3457D5]/10 to-blue-50 border-[#3457D5]/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#3457D5] rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-1">Find Walking Buddies</h4>
            <p className="text-xs text-gray-600">
              Post your availability and preferences to find perfect walking companions for your pet!
            </p>
          </div>
        </div>
      </Card>

      {/* Form */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Buddy Search Details</h3>
        
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Post Title *</Label>
            <Input 
              id="title" 
              placeholder="e.g., Looking for morning walking buddy"
              className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
            />
          </div>

          {/* Pet Type */}
          <div className="space-y-2">
            <Label htmlFor="pet-type">Your Pet Type *</Label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]">
                <SelectValue placeholder="Select your pet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pet Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pet-size">Pet Size</Label>
              <Select>
                <SelectTrigger className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (0-20 lbs)</SelectItem>
                  <SelectItem value="medium">Medium (21-50 lbs)</SelectItem>
                  <SelectItem value="large">Large (51-100 lbs)</SelectItem>
                  <SelectItem value="xlarge">Extra Large (100+ lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pet-age">Pet Age</Label>
              <Select>
                <SelectTrigger className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="puppy">Puppy (0-1 year)</SelectItem>
                  <SelectItem value="young">Young (1-3 years)</SelectItem>
                  <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                  <SelectItem value="senior">Senior (7+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">About You & Your Pet *</Label>
            <Textarea
              id="description"
              placeholder="Tell potential buddies about yourself and your pet... Personality, energy level, training status, etc."
              className="min-h-[100px] border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
            />
          </div>

          {/* Preferred Walking Time */}
          <div className="space-y-2">
            <Label htmlFor="time-preference">Preferred Walking Time *</Label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]">
                <SelectValue placeholder="When do you prefer to walk?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="early-morning">Early Morning (5-8 AM)</SelectItem>
                <SelectItem value="morning">Morning (8-11 AM)</SelectItem>
                <SelectItem value="midday">Midday (11 AM-2 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (2-5 PM)</SelectItem>
                <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                <SelectItem value="night">Night (8 PM+)</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Days Available */}
          <div className="space-y-2">
            <Label>Days Available *</Label>
            <div className="grid grid-cols-4 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <Button 
                  key={day}
                  variant="outline" 
                  className="h-10 text-xs hover:bg-[#3457D5] hover:text-white hover:border-[#3457D5]"
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Preferred Area *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="location"
                placeholder="Enter your area or neighborhood"
                className="pl-10 border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]"
              />
            </div>
          </div>

          {/* Distance Willing to Travel */}
          <div className="space-y-2">
            <Label htmlFor="distance">Distance Willing to Travel</Label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]">
                <SelectValue placeholder="How far will you travel?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Within 1 mile</SelectItem>
                <SelectItem value="3">Within 3 miles</SelectItem>
                <SelectItem value="5">Within 5 miles</SelectItem>
                <SelectItem value="10">Within 10 miles</SelectItem>
                <SelectItem value="any">Any distance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Looking For */}
          <div className="space-y-2">
            <Label htmlFor="looking-for">Looking For *</Label>
            <Select>
              <SelectTrigger className="border-gray-300 focus:border-[#3457D5] focus:ring-[#3457D5]">
                <SelectValue placeholder="What type of buddy are you seeking?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Pet Owner</SelectItem>
                <SelectItem value="dogs">Dog Owners Only</SelectItem>
                <SelectItem value="cats">Cat Owners Only</SelectItem>
                <SelectItem value="small-dogs">Small Dog Owners</SelectItem>
                <SelectItem value="large-dogs">Large Dog Owners</SelectItem>
                <SelectItem value="similar">Similar Size Pets</SelectItem>
                <SelectItem value="similar-age">Similar Age Pets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add Photo */}
          <div className="space-y-2">
            <Label>Add Pet Photo (Optional)</Label>
            <Button variant="outline" className="w-full border-dashed border-2 h-24 border-gray-300 hover:border-[#3457D5] hover:bg-[#3457D5]/5">
              <div className="text-center">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Add a photo of your pet</p>
              </div>
            </Button>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Label htmlFor="public" className="font-semibold text-sm cursor-pointer">
                  Public Post
                </Label>
              </div>
              <p className="text-xs text-gray-500">
                {isPublic 
                  ? 'Anyone can see your buddy search' 
                  : 'Only approved connections can see this'}
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
              For your safety, meet in public places and let someone know where you're going. Never share personal information until you feel comfortable.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1">
              Save Draft
            </Button>
            <Button className="flex-1 bg-[#3457D5] hover:bg-[#2A47B0]">
              Post Buddy Search
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
