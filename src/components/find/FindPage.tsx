import { useState } from 'react';
import { Users, Calendar, Compass, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { FindBuddiesTab } from './FindBuddiesTab';
import { PostActivityTab } from './PostActivityTab';
import { PostBuddySearchTab } from './PostBuddySearchTab';
import { FindActivitiesTab } from './FindActivitiesTab';

export function FindPage() {
  const [activeTab, setActiveTab] = useState('buddies');
  const [showPostOptions, setShowPostOptions] = useState(false);

  const handlePostBuddySearch = () => {
    setShowPostOptions(false);
    setActiveTab('post-buddy');
  };

  const handlePostEvent = () => {
    setShowPostOptions(false);
    setActiveTab('post-event');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          <h1 className="font-bold text-xl text-gray-900">Find</h1>
          <p className="text-sm text-gray-500">Connect with pet lovers nearby</p>
        </div>
      </div>

      {/* Button Row */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-10 p-4">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            onClick={() => setActiveTab('buddies')}
            className={`flex items-center justify-center gap-2 py-3 font-bold text-sm ${
              activeTab === 'buddies' 
                ? 'border-[#3457D5] text-[#3457D5]' 
                : 'border-black text-black'
            }`}
          >
            <Users className="w-6 h-6" />
            Buddies
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab('activities')}
            className={`flex items-center justify-center gap-2 py-3 font-bold text-sm ${
              activeTab === 'activities' 
                ? 'border-[#3457D5] text-[#3457D5]' 
                : 'border-black text-black'
            }`}
          >
            <Compass className="w-6 h-6" />
            Activities
          </Button>
          <Button
            onClick={() => setShowPostOptions(true)}
            className="flex items-center justify-center gap-2 py-3 bg-[#3457D5] hover:bg-[#2A47B0] text-white font-bold text-sm"
          >
            <Plus className="w-6 h-6" />
            Post
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-0">
        {activeTab === 'buddies' && <FindBuddiesTab />}
        {activeTab === 'activities' && <FindActivitiesTab />}
        {activeTab === 'post-buddy' && <PostBuddySearchTab />}
        {activeTab === 'post-event' && <PostActivityTab />}
      </div>

      {/* Post Options Dialog */}
      <Dialog open={showPostOptions} onOpenChange={setShowPostOptions}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>What would you like to post?</DialogTitle>
            <DialogDescription>Choose an option to post a new item.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={handlePostBuddySearch}
              className="w-full py-6 bg-white border-2 border-[#3457D5] text-[#3457D5] hover:bg-[#3457D5] hover:text-white font-bold text-base"
            >
              <Users className="w-6 h-6 mr-2" />
              Post a Buddies Search
            </Button>
            <Button
              onClick={handlePostEvent}
              className="w-full py-6 bg-[#3457D5] hover:bg-[#2A47B0] text-white font-bold text-base"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Post an Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}