import { useState } from 'react';
import { ArrowLeft, Camera, Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  bio: string;
}

interface EditProfileProps {
  username: string;
  avatar: string;
  bio: string;
  pets: Pet[];
  education?: {
    degree: string;
    school: string;
    year?: string;
  };
  occupation?: {
    title: string;
    company: string;
  };
  onBack: () => void;
  onSave: (data: any) => void;
}

export function EditProfile({
  username,
  avatar,
  bio,
  pets,
  education,
  occupation,
  onBack,
  onSave,
}: EditProfileProps) {
  const [formData, setFormData] = useState({
    username,
    bio,
    education: education || { degree: '', school: '', year: '' },
    occupation: occupation || { title: '', company: '' },
    pets,
  });

  const handleSave = () => {
    onSave(formData);
    onBack();
  };

  return (
    <div className="bg-white min-h-screen pb-2">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-lg">Edit Profile</h1>
          <Button 
            size="sm" 
            className="bg-[#3457D5] hover:bg-[#2A47B0]"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-[#3457D5]">
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3457D5] rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-sm text-[#3457D5] font-medium">Change Profile Photo</p>
        </div>

        {/* Basic Info */}
        <Card className="p-4 space-y-4 border-gray-200">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent text-sm"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent text-sm resize-none"
              placeholder="Tell us about yourself and your pets"
            />
          </div>
        </Card>

        {/* Education */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3">Education</h3>
          <Card className="p-4 space-y-4 border-gray-200">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Degree</label>
              <input
                type="text"
                value={formData.education.degree}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  education: { ...formData.education, degree: e.target.value }
                })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent text-sm"
                placeholder="e.g., B.S. in Computer Science"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">School</label>
              <input
                type="text"
                value={formData.education.school}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  education: { ...formData.education, school: e.target.value }
                })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent text-sm"
                placeholder="e.g., University of California, Berkeley"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Graduation Year</label>
              <input
                type="text"
                value={formData.education.year}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  education: { ...formData.education, year: e.target.value }
                })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent text-sm"
                placeholder="e.g., 2020"
              />
            </div>
          </Card>
        </div>

        {/* Occupation */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-3">Professional Experience</h3>
          <Card className="p-4 space-y-4 border-gray-200">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Job Title</label>
              <input
                type="text"
                value={formData.occupation.title}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  occupation: { ...formData.occupation, title: e.target.value }
                })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent text-sm"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Company</label>
              <input
                type="text"
                value={formData.occupation.company}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  occupation: { ...formData.occupation, company: e.target.value }
                })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent text-sm"
                placeholder="e.g., Tech Company Inc."
              />
            </div>
          </Card>
        </div>

        {/* Pets */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-gray-900">My Pets</h3>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-[#3457D5] text-[#3457D5] hover:bg-[#3457D5]/10"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Pet
            </Button>
          </div>
          <div className="space-y-3">
            {formData.pets.map((pet, index) => (
              <Card key={pet.id} className="p-4 border-gray-200">
                <div className="flex gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={pet.image} 
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={pet.name}
                      onChange={(e) => {
                        const newPets = [...formData.pets];
                        newPets[index] = { ...newPets[index], name: e.target.value };
                        setFormData({ ...formData, pets: newPets });
                      }}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent"
                      placeholder="Pet name"
                    />
                    <input
                      type="text"
                      value={pet.breed}
                      onChange={(e) => {
                        const newPets = [...formData.pets];
                        newPets[index] = { ...newPets[index], breed: e.target.value };
                        setFormData({ ...formData, pets: newPets });
                      }}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent"
                      placeholder="Breed"
                    />
                    <input
                      type="text"
                      value={pet.age}
                      onChange={(e) => {
                        const newPets = [...formData.pets];
                        newPets[index] = { ...newPets[index], age: e.target.value };
                        setFormData({ ...formData, pets: newPets });
                      }}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent"
                      placeholder="Age"
                    />
                  </div>
                </div>
                <textarea
                  value={pet.bio}
                  onChange={(e) => {
                    const newPets = [...formData.pets];
                    newPets[index] = { ...newPets[index], bio: e.target.value };
                    setFormData({ ...formData, pets: newPets });
                  }}
                  rows={2}
                  className="w-full mt-3 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#3457D5] focus:border-transparent resize-none"
                  placeholder="Tell us about your pet"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
