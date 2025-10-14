import { Loader2, Map, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const EmptySessionFallback = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Initializing session",
      description: "Setting up your workspace",
      subDescription: "This may take a few seconds"
    },
    {
      icon: <Map className="w-5 h-5" />,
      title: "Creating workspace",
      description: "This may take a few seconds"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => prev + 1);
    }, 80);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8">
      {/* Main content container */}
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        

        {/* Status text */}
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Creating New Session
          </h2>
          <p className="text-sm text-muted-foreground">
            Setting up your personalized workspace
          </p>
        </div>

        {/* Progress steps */}
        <div className="w-full space-y-3">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                index <= currentStep 
                  ? 'bg-background border border-border' 
                  : 'bg-muted/30 border border-transparent'
              }`}
            >
              {/* Step icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-background text-foreground' 
                  : index === currentStep
                    ? 'bg-background text-foreground animate-pulse'
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