export const LocationPin = () => {
    return (
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer location pin shape */}
        <path
          d="M50 10 C35 10, 23 22, 23 37 C23 52, 50 85, 50 85 C50 85, 77 52, 77 37 C77 22, 65 10, 50 10 Z"
          fill="#ea580c"
          stroke="#ea580c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Inner circle */}
        <circle
          cx="50"
          cy="37"
          r="8"
          fill="white"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    );
  };