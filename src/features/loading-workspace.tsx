import { Loader2, Map, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const EmptySessionFallback = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Initializing session",
      description: "Setting up your workspace"
    },
    {
      icon: <Map className="w-5 h-5" />,
      title: "Creating empty storymap",
      description: "This may take a few seconds"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update current step based on progress
        if (newProgress >= 25 && currentStep < 1) setCurrentStep(1);
        else if (newProgress >= 50 && currentStep < 2) setCurrentStep(2);
        else if (newProgress >= 75 && currentStep < 3) setCurrentStep(3);
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8">
      {/* Main content container */}
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        
        {/* Primary visual indicator */}
        <div className="relative">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 w-24 h-24 bg-primary/20 rounded-full animate-ping"></div>
          <div className="absolute inset-2 w-20 h-20 bg-primary/30 rounded-full animate-ping animation-delay-200"></div>
          
          {/* Main icon container */}
          <div className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
              <Map className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          {/* Spinning progress indicator */}
          <div className="absolute inset-0 w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-primary/20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                d="M18 2.0845 a 16 16 0 0 1 0 31.831 a 16 16 0 0 1 0 -31.831"
              />
              <path
                className="text-primary transition-all duration-300 ease-out"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845 a 16 16 0 0 1 0 31.831 a 16 16 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

        {/* Status text */}
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Creating New Session
          </h2>
          <p className="text-sm text-muted-foreground">
            Setting up your personalized StoryMap workspace
          </p>
        </div>

        {/* Progress steps */}
        <div className="w-full space-y-3">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                index <= currentStep 
                  ? 'bg-primary/5 border border-primary/20' 
                  : 'bg-muted/30 border border-transparent'
              }`}
            >
              {/* Step icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : index === currentStep
                    ? 'bg-primary/20 text-primary animate-pulse'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {index < currentStep ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : index === currentStep ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  step.icon
                )}
              </div>
              
              {/* Step content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
                <p className={`text-xs transition-colors duration-300 ${
                  index <= currentStep ? 'text-muted-foreground' : 'text-muted-foreground/60'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default EmptySessionFallback;