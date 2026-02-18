// Playful noodle-themed SVG decorations for the Indomie microsite

export const NoodleBowl = ({ className = "", color: _color = "#DC2626" }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bowl */}
    <ellipse cx="100" cy="140" rx="70" ry="15" fill="#EF4444" opacity="0.3"/>
    <path d="M30 100 Q30 160, 100 170 Q170 160, 170 100 L170 90 Q170 80, 160 80 L40 80 Q30 80, 30 90 Z" fill="#DC2626"/>
    <ellipse cx="100" cy="90" rx="70" ry="20" fill="#EF4444"/>
    
    {/* Noodles */}
    <path d="M60 70 Q50 50, 70 40 Q90 30, 80 50 Q70 70, 60 70" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
    <path d="M100 75 Q110 55, 130 45 Q150 40, 140 60 Q130 75, 120 80" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
    <path d="M80 65 Q75 45, 95 35 Q115 30, 110 50 Q100 65, 90 70" fill="#FEF08A" stroke="#F59E0B" strokeWidth="2"/>
    <path d="M120 70 Q125 50, 145 45 Q160 45, 150 65 Q140 75, 130 75" fill="#FEF08A" stroke="#F59E0B" strokeWidth="2"/>
    
    {/* Chopsticks */}
    <line x1="150" y1="30" x2="120" y2="85" stroke="#8B4513" strokeWidth="3" strokeLinecap="round"/>
    <line x1="160" y1="25" x2="130" y2="80" stroke="#8B4513" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const FloatingNoodle = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ animationDelay: `${delay}s` }}
  >
    <path 
      d="M10 50 Q30 30, 50 50 Q70 70, 90 50" 
      stroke="#F59E0B" 
      strokeWidth="8" 
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
    <path 
      d="M15 50 Q35 30, 55 50 Q75 70, 85 50" 
      stroke="#FCD34D" 
      strokeWidth="6" 
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const NoodlePacket = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 150 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Packet */}
    <rect x="20" y="20" width="110" height="160" rx="5" fill="#DC2626"/>
    <rect x="25" y="25" width="100" height="150" rx="3" fill="#EF4444"/>
    
    {/* Label design */}
    <ellipse cx="75" cy="70" rx="35" ry="35" fill="#FCD34D"/>
    <text x="75" y="80" fontSize="24" fontWeight="bold" fill="#DC2626" textAnchor="middle">Mi</text>
    
    {/* Decorative lines */}
    <line x1="30" y1="120" x2="120" y2="120" stroke="#FEF08A" strokeWidth="2"/>
    <line x1="30" y1="130" x2="120" y2="130" stroke="#FEF08A" strokeWidth="2"/>
    <line x1="30" y1="140" x2="120" y2="140" stroke="#FEF08A" strokeWidth="2"/>
    
    {/* Top seal */}
    <rect x="40" y="10" width="70" height="15" rx="3" fill="#8B0000"/>
  </svg>
);

export const ChiliPepper = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path d="M45 20 Q40 10, 50 5 Q55 8, 52 15 L48 25" fill="#16A34A" stroke="#15803D" strokeWidth="2"/>
    
    {/* Pepper body */}
    <path 
      d="M45 25 Q35 40, 35 70 Q35 100, 45 130 Q50 145, 55 130 Q65 100, 65 70 Q65 40, 55 25 Q50 20, 45 25" 
      fill="#DC2626" 
      stroke="#B91C1C" 
      strokeWidth="2"
    />
    
    {/* Highlight */}
    <ellipse cx="52" cy="50" rx="6" ry="15" fill="#EF4444" opacity="0.6"/>
  </svg>
);

export const SteamingBowl = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Steam */}
    <path d="M60 30 Q65 20, 70 30 Q75 40, 70 50" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" opacity="0.6">
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M100 20 Q105 10, 110 20 Q115 30, 110 40" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" opacity="0.6">
      <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
    </path>
    <path d="M140 30 Q145 20, 150 30 Q155 40, 150 50" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" opacity="0.6">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/>
    </path>
    
    {/* Bowl */}
    <ellipse cx="100" cy="160" rx="80" ry="20" fill="#DC2626" opacity="0.3"/>
    <path d="M25 110 Q25 175, 100 185 Q175 175, 175 110 L175 95 Q175 85, 165 85 L35 85 Q25 85, 25 95 Z" fill="#DC2626"/>
    <ellipse cx="100" cy="95" rx="75" ry="22" fill="#EF4444"/>
    <ellipse cx="100" cy="95" rx="65" ry="18" fill="#FEF08A"/>
  </svg>
);

export const NoodleSwirl = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M75 20 Q100 30, 110 50 Q120 75, 110 100 Q90 120, 65 115 Q40 110, 30 85 Q25 60, 40 40 Q55 25, 75 30" 
      stroke="#F59E0B" 
      strokeWidth="12" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M75 25 Q98 33, 105 50 Q115 75, 105 98 Q88 115, 65 110 Q43 105, 35 85 Q30 63, 43 45 Q58 30, 75 35" 
      stroke="#FCD34D" 
      strokeWidth="8" 
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const SpiceParticles = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="40" r="3" fill="#DC2626" opacity="0.7">
      <animate attributeName="cy" values="40;180;40" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="80" cy="20" r="4" fill="#F59E0B" opacity="0.7">
      <animate attributeName="cy" values="20;190;20" dur="5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="120" cy="50" r="2" fill="#DC2626" opacity="0.7">
      <animate attributeName="cy" values="50;185;50" dur="3.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="160" cy="30" r="3" fill="#F59E0B" opacity="0.7">
      <animate attributeName="cy" values="30;180;30" dur="4.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="50" cy="70" r="2" fill="#FCD34D" opacity="0.7">
      <animate attributeName="cy" values="70;190;70" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="140" cy="80" r="3" fill="#FCD34D" opacity="0.7">
      <animate attributeName="cy" values="80;185;80" dur="6s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export const NoodleStrand = ({ className = "", variant = 1 }: { className?: string; variant?: number }) => {
  const paths = [
    "M0 50 Q25 30, 50 50 Q75 70, 100 50",
    "M0 50 Q30 70, 60 50 Q90 30, 120 50",
    "M0 50 Q20 40, 40 55 Q60 70, 80 55 Q100 40, 120 50"
  ];
  
  return (
    <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d={paths[variant % 3]} 
        stroke="#F59E0B" 
        strokeWidth="6" 
        strokeLinecap="round"
        fill="none"
      />
      <path 
        d={paths[variant % 3]} 
        stroke="#FCD34D" 
        strokeWidth="4" 
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

// Ramen Topping Illustrations
export const GreenOnion = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Green tops */}
    <path d="M30 10 Q28 5, 25 15 L22 50 Q22 55, 25 55 Q28 55, 28 50 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5"/>
    <path d="M40 5 Q38 0, 35 10 L32 45 Q32 50, 35 50 Q38 50, 38 45 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5"/>
    <path d="M50 8 Q48 3, 45 13 L42 48 Q42 53, 45 53 Q48 53, 48 48 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5"/>
    
    {/* White stems */}
    <rect x="22" y="50" width="6" height="60" rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
    <rect x="32" y="45" width="6" height="65" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5"/>
    <rect x="42" y="48" width="6" height="62" rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
  </svg>
);

export const Cabbage = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer leaves */}
    <path d="M60 20 Q30 25, 25 50 Q20 75, 45 85 Q60 90, 75 85 Q100 75, 95 50 Q90 25, 60 20" fill="#86EFAC" stroke="#22C55E" strokeWidth="2"/>
    
    {/* Inner leaves - lighter */}
    <path d="M60 30 Q40 33, 37 50 Q35 67, 52 75 Q60 78, 68 75 Q85 67, 83 50 Q80 33, 60 30" fill="#BBF7D0" stroke="#4ADE80" strokeWidth="2"/>
    
    {/* Center - lightest */}
    <ellipse cx="60" cy="52" rx="18" ry="20" fill="#D9F99D" stroke="#84CC16" strokeWidth="1.5"/>
    
    {/* Vein details */}
    <path d="M60 32 L60 75" stroke="#22C55E" strokeWidth="1" opacity="0.4"/>
    <path d="M45 45 Q60 48, 75 45" stroke="#22C55E" strokeWidth="1" opacity="0.4"/>
    <path d="M42 58 Q60 60, 78 58" stroke="#22C55E" strokeWidth="1" opacity="0.4"/>
  </svg>
);

export const Egg = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Egg white */}
    <ellipse cx="50" cy="45" rx="40" ry="30" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="2"/>
    <path d="M20 40 Q15 50, 25 58 Q40 65, 55 62 Q70 59, 80 50 Q85 42, 78 35" fill="#FFFBEB" opacity="0.5"/>
    
    {/* Egg yolk */}
    <ellipse cx="50" cy="45" rx="18" ry="16" fill="#FDE047" stroke="#FACC15" strokeWidth="2"/>
    <ellipse cx="50" cy="45" rx="14" ry="12" fill="#FEF08A"/>
    
    {/* Highlight on yolk */}
    <ellipse cx="55" cy="40" rx="5" ry="4" fill="#FFFBEB" opacity="0.8"/>
  </svg>
);

export const Mushroom = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mushroom cap */}
    <path d="M50 30 Q20 35, 15 55 Q12 70, 30 75 L70 75 Q88 70, 85 55 Q80 35, 50 30" fill="#D4A574" stroke="#A67C52" strokeWidth="2"/>
    
    {/* Cap highlights */}
    <ellipse cx="40" cy="50" rx="8" ry="6" fill="#E5C8A3" opacity="0.7"/>
    <ellipse cx="65" cy="48" rx="6" ry="5" fill="#E5C8A3" opacity="0.6"/>
    
    {/* Stem */}
    <rect x="42" y="70" width="16" height="40" rx="6" fill="#F5E6D3" stroke="#D4C5B0" strokeWidth="2"/>
    
    {/* Stem shadow */}
    <rect x="50" y="72" width="8" height="36" rx="3" fill="#E5D4BC" opacity="0.5"/>
    
    {/* Gills under cap */}
    <path d="M30 75 Q35 78, 40 75" stroke="#A67C52" strokeWidth="1" opacity="0.4"/>
    <path d="M45 76 Q50 79, 55 76" stroke="#A67C52" strokeWidth="1" opacity="0.4"/>
    <path d="M60 75 Q65 78, 70 75" stroke="#A67C52" strokeWidth="1" opacity="0.4"/>
  </svg>
);

export const Carrot = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Carrot leaves */}
    <path d="M45 15 Q40 5, 35 18 L38 30" fill="#16A34A" stroke="#15803D" strokeWidth="1.5"/>
    <path d="M50 10 Q48 2, 43 15 L45 28" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5"/>
    <path d="M55 15 Q60 5, 65 18 L62 30" fill="#16A34A" stroke="#15803D" strokeWidth="1.5"/>
    
    {/* Carrot body */}
    <path d="M48 30 Q45 35, 42 50 Q38 80, 40 110 Q42 125, 50 130 Q58 125, 60 110 Q62 80, 58 50 Q55 35, 52 30" fill="#F97316" stroke="#EA580C" strokeWidth="2"/>
    
    {/* Carrot details/lines */}
    <path d="M44 50 Q48 52, 52 50" stroke="#DC2626" strokeWidth="1" opacity="0.3"/>
    <path d="M42 70 Q50 73, 58 70" stroke="#DC2626" strokeWidth="1" opacity="0.3"/>
    <path d="M41 90 Q50 93, 59 90" stroke="#DC2626" strokeWidth="1" opacity="0.3"/>
    <path d="M42 110 Q50 112, 58 110" stroke="#DC2626" strokeWidth="1" opacity="0.3"/>
    
    {/* Highlight */}
    <ellipse cx="53" cy="60" rx="3" ry="12" fill="#FED7AA" opacity="0.6"/>
  </svg>
);

export const BokChoy = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Leaves - dark green */}
    <path d="M30 20 Q20 25, 22 50 Q24 70, 32 75 L35 40 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5"/>
    <path d="M50 15 Q40 18, 38 45 Q37 65, 42 72 L48 35 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5"/>
    <path d="M70 20 Q80 25, 78 50 Q76 70, 68 75 L65 40 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5"/>
    
    {/* Stems - light green/white */}
    <path d="M32 75 Q35 85, 38 100 Q40 112, 43 115" fill="#D9F99D" stroke="#84CC16" strokeWidth="2"/>
    <path d="M42 72 Q45 85, 48 102 Q49 114, 50 118" fill="#ECFCCB" stroke="#A3E635" strokeWidth="2"/>
    <path d="M68 75 Q65 85, 62 100 Q60 112, 57 115" fill="#D9F99D" stroke="#84CC16" strokeWidth="2"/>
    
    {/* White stem bottoms */}
    <ellipse cx="43" cy="115" rx="8" ry="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1"/>
    <ellipse cx="50" cy="118" rx="8" ry="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1"/>
    <ellipse cx="57" cy="115" rx="8" ry="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1"/>
  </svg>
);

export const Corn = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Corn husk leaves */}
    <path d="M25 30 Q20 35, 22 80 L18 85" fill="#86EFAC" stroke="#22C55E" strokeWidth="1.5" opacity="0.7"/>
    <path d="M55 30 Q60 35, 58 80 L62 85" fill="#86EFAC" stroke="#22C55E" strokeWidth="1.5" opacity="0.7"/>
    
    {/* Corn body */}
    <rect x="30" y="35" width="20" height="60" rx="10" fill="#FDE047" stroke="#FACC15" strokeWidth="2"/>
    
    {/* Corn kernels pattern */}
    <circle cx="35" cy="42" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="40" cy="42" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="45" cy="42" r="2.5" fill="#EAB308" opacity="0.6"/>
    
    <circle cx="37.5" cy="48" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="42.5" cy="48" r="2.5" fill="#EAB308" opacity="0.6"/>
    
    <circle cx="35" cy="54" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="40" cy="54" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="45" cy="54" r="2.5" fill="#EAB308" opacity="0.6"/>
    
    <circle cx="37.5" cy="60" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="42.5" cy="60" r="2.5" fill="#EAB308" opacity="0.6"/>
    
    <circle cx="35" cy="66" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="40" cy="66" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="45" cy="66" r="2.5" fill="#EAB308" opacity="0.6"/>
    
    <circle cx="37.5" cy="72" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="42.5" cy="72" r="2.5" fill="#EAB308" opacity="0.6"/>
    
    <circle cx="35" cy="78" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="40" cy="78" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="45" cy="78" r="2.5" fill="#EAB308" opacity="0.6"/>
    
    <circle cx="37.5" cy="84" r="2.5" fill="#EAB308" opacity="0.6"/>
    <circle cx="42.5" cy="84" r="2.5" fill="#EAB308" opacity="0.6"/>
  </svg>
);