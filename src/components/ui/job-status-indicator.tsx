import type { JobStatusType } from '@/types/events.types';
import { Check } from 'lucide-react';
import React from 'react';

interface JobStatusIndicatorProps {
  jobStatus: JobStatusType[];
}

// Spinner Component
const Spinner = () => (
  <div className="relative w-4 h-4 flex-shrink-0">
    <div className="absolute inset-0 border-2 border-neutral-200 rounded-full"></div>
    <div className="absolute inset-0 border-2 border-transparent border-t-neutral-500 rounded-full animate-spin"></div>
  </div>
);

// Check Icon Component
const CheckIcon = () => (
  <div className="w-5 h-5 flex-shrink-0 bg-green-800 rounded-full flex items-center justify-center animate-[scaleIn_0.3s_ease-out]">
    <Check className="w-3 h-3 text-white" strokeWidth={3} />
  </div>
);

// Main Component
export const JobStatusIndicator = ({ jobStatus }: JobStatusIndicatorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-sm border border-gray-100 p-2">
        <div className="flex flex-col">
          {jobStatus.map((job, index) => (
            <React.Fragment key={job.id}>
              <div className="flex items-center justify-start gap-3">
                {/* Status Icon */}
                <div className="">
                  {job.isInProgress ? <Spinner /> : <CheckIcon />}
                </div>

                {/* Message */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-relaxed transition-all duration-300 ${
                    job.isInProgress 
                      ? 'text-gray-500 font-light' 
                      : 'text-gray-700'
                  }`}>
                    {job.message}
                  </p>
                </div>
              </div>
              
              {/* Vertical Connector Line */}
              {index < jobStatus.length - 1 && (
                <div className="w-px h-4 bg-gray-300 ml-2 my-1"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

