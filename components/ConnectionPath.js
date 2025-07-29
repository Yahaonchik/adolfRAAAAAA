export default function ConnectionPath() {
  return (
    <div className="connection-path-container">
      <svg 
        className="connection-path-svg" 
        viewBox="0 0 356 826" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient 
            id="connectionGradient" 
            x1="2" 
            y1="326" 
            x2="348" 
            y2="329.5" 
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#606060"/>
            <stop offset="1" stopColor="#ED9E65"/>
          </linearGradient>
        </defs>
        
        {/* Top circle marker */}
        <circle 
          cx="279" 
          cy="8" 
          r="8" 
          fill="url(#connectionGradient)"
        />
        
        {/* Main connecting path */}
        <path 
          d="M279 16V50L279 100L279 150L279 200L279 250L279 300L279 350L279 400L279 450L279 500L279 550L279 600L279 650L279 700L279 750L279 800"
          stroke="url(#connectionGradient)"
          strokeWidth="4"
          strokeDasharray="10,5"
          fill="none"
        />
        
        {/* Bottom circle marker */}
        <circle 
          cx="279" 
          cy="818" 
          r="8" 
          fill="url(#connectionGradient)"
        />
        
        {/* Decorative side elements */}
        <circle cx="50" cy="200" r="4" fill="#ED9E65" opacity="0.6"/>
        <circle cx="308" cy="300" r="4" fill="#ED9E65" opacity="0.6"/>
        <circle cx="30" cy="400" r="4" fill="#ED9E65" opacity="0.6"/>
        <circle cx="330" cy="500" r="4" fill="#ED9E65" opacity="0.6"/>
        <circle cx="60" cy="600" r="4" fill="#ED9E65" opacity="0.6"/>
        
        {/* Connecting lines to side elements */}
        <line x1="50" y1="200" x2="275" y2="200" stroke="#ED9E65" strokeWidth="2" opacity="0.3" strokeDasharray="5,3"/>
        <line x1="283" y1="300" x2="308" y2="300" stroke="#ED9E65" strokeWidth="2" opacity="0.3" strokeDasharray="5,3"/>
        <line x1="30" y1="400" x2="275" y2="400" stroke="#ED9E65" strokeWidth="2" opacity="0.3" strokeDasharray="5,3"/>
        <line x1="283" y1="500" x2="330" y2="500" stroke="#ED9E65" strokeWidth="2" opacity="0.3" strokeDasharray="5,3"/>
        <line x1="60" y1="600" x2="275" y2="600" stroke="#ED9E65" strokeWidth="2" opacity="0.3" strokeDasharray="5,3"/>
      </svg>
    </div>
  );
}
