import { GraduationCap, Briefcase } from 'lucide-react';
import { Card } from '../ui/card';

interface EducationOccupationProps {
  education?: {
    degree: string;
    school: string;
    year: string;
  };
  occupation?: {
    title: string;
    company: string;
  };
}

export function EducationOccupationSection({ education, occupation }: EducationOccupationProps) {
  // Component now returns nothing - both cards removed
  return null;
}
