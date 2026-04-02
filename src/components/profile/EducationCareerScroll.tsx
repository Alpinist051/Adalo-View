import { GraduationCap, Briefcase } from 'lucide-react';
import { Card } from '../ui/card';

interface EducationCareerScrollProps {
  education?: {
    degree: string;
    school: string;
    year?: string;
  };
  occupation?: {
    title: string;
    company: string;
  };
}

export function EducationCareerScroll({ education, occupation }: EducationCareerScrollProps) {
  if (!education && !occupation) return null;

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-3 pb-1">
        {/* Education Card */}
        {education && (
          <Card className="flex-shrink-0 w-[280px] h-10 border-[#3457D5]/20 bg-gradient-to-r from-[#3457D5]/5 to-transparent">
            <div className="flex items-center gap-2.5 h-full px-3">
              <div className="w-6 h-6 bg-[#3457D5]/15 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-3.5 h-3.5 text-[#3457D5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-gray-900 truncate">{education.degree}</p>
                  {education.year && (
                    <span className="text-[10px] text-gray-400 flex-shrink-0">'{education.year.slice(-2)}</span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 truncate">{education.school}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Career Card */}
        {occupation && (
          <Card className="flex-shrink-0 w-[280px] h-10 border-[#3457D5]/20 bg-gradient-to-r from-[#3457D5]/5 to-transparent">
            <div className="flex items-center gap-2.5 h-full px-3">
              <div className="w-6 h-6 bg-[#3457D5]/15 rounded-full flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-3.5 h-3.5 text-[#3457D5]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">{occupation.title}</p>
                <p className="text-[11px] text-gray-500 truncate">{occupation.company}</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
