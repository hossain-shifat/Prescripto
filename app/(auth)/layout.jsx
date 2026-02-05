import '../globals.css'

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen relative overflow-hidden bg-base-100">
            {/* Animated Medical SVG Background */}
            <div className="absolute inset-0 z-0">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1440 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        {/* Enhanced linears */}
                        <linearlinear id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0.2">
                                <animate attributeName="stop-opacity" values="0.2;0.35;0.2" dur="5s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0.08">
                                <animate attributeName="stop-opacity" values="0.08;0.15;0.08" dur="5s" repeatCount="indefinite" />
                            </stop>
                        </linearlinear>

                        <linearlinear id="accentGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="oklch(68% 0.13 192)" stopOpacity="0.18">
                                <animate attributeName="stop-opacity" values="0.18;0.28;0.18" dur="6s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor="oklch(72% 0.09 248)" stopOpacity="0.12">
                                <animate attributeName="stop-opacity" values="0.12;0.2;0.12" dur="6s" repeatCount="indefinite" />
                            </stop>
                        </linearlinear>

                        <linearlinear id="secondaryGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="oklch(72% 0.09 248)" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0.1" />
                        </linearlinear>

                        <radiallinear id="pulseGrad">
                            <stop offset="0%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0" />
                        </radiallinear>

                        {/* Filters */}
                        <filter id="softGlow">
                            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="mediumBlur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
                        </filter>

                        <filter id="strongBlur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                        </filter>

                        {/* Medical Cross Symbol */}
                        <symbol id="medicalCross" viewBox="0 0 60 60">
                            <path
                                d="M 20 0 L 40 0 L 40 20 L 60 20 L 60 40 L 40 40 L 40 60 L 20 60 L 20 40 L 0 40 L 0 20 L 20 20 Z"
                                fill="oklch(60.92% 0.212 273.52)"
                            />
                        </symbol>

                        {/* Heartbeat Line Pattern */}
                        <pattern id="heartbeatPattern" x="0" y="0" width="200" height="60" patternUnits="userSpaceOnUse">
                            <path
                                d="M 0 30 L 40 30 L 45 20 L 50 40 L 55 30 L 200 30"
                                stroke="oklch(60.92% 0.212 273.52)"
                                strokeWidth="2.5"
                                fill="none"
                                opacity="0.2"
                            />
                        </pattern>

                        {/* DNA Helix Pattern */}
                        <symbol id="dnaStrand" viewBox="0 0 40 100">
                            <ellipse cx="10" cy="10" rx="8" ry="3" fill="oklch(60.92% 0.212 273.52)" opacity="0.4" />
                            <ellipse cx="30" cy="30" rx="8" ry="3" fill="oklch(72% 0.09 248)" opacity="0.4" />
                            <ellipse cx="10" cy="50" rx="8" ry="3" fill="oklch(60.92% 0.212 273.52)" opacity="0.4" />
                            <ellipse cx="30" cy="70" rx="8" ry="3" fill="oklch(72% 0.09 248)" opacity="0.4" />
                            <ellipse cx="10" cy="90" rx="8" ry="3" fill="oklch(60.92% 0.212 273.52)" opacity="0.4" />
                            <path d="M 10 10 Q 20 30 30 30 Q 20 50 10 50 Q 20 70 30 70 Q 20 90 10 90"
                                stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" fill="none" opacity="0.3" />
                            <path d="M 30 30 Q 20 50 10 50 Q 20 70 30 70 Q 20 90 10 90"
                                stroke="oklch(72% 0.09 248)" strokeWidth="2" fill="none" opacity="0.3" />
                        </symbol>

                        {/* Pill Capsule */}
                        <symbol id="pillCapsule" viewBox="0 0 80 40">
                            <rect x="0" y="0" width="40" height="40" rx="20" fill="oklch(60.92% 0.212 273.52)" opacity="0.3" />
                            <rect x="40" y="0" width="40" height="40" rx="20" fill="oklch(68% 0.13 192)" opacity="0.3" />
                        </symbol>

                        {/* Stethoscope Icon */}
                        <symbol id="stethoscope" viewBox="0 0 100 100">
                            <circle cx="50" cy="20" r="8" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="3" opacity="0.4" />
                            <path d="M 42 20 Q 30 30 30 50 L 30 70 Q 30 85 45 85 L 55 85 Q 70 85 70 70 L 70 50"
                                stroke="oklch(60.92% 0.212 273.52)" strokeWidth="3" fill="none" opacity="0.4" />
                            <circle cx="70" cy="40" r="10" fill="oklch(60.92% 0.212 273.52)" opacity="0.3" />
                        </symbol>

                        {/* Medical Heart Icon */}
                        <symbol id="heartIcon" viewBox="0 0 100 100">
                            <path d="M 50 85 Q 10 50 10 30 Q 10 10 30 10 Q 40 10 50 25 Q 60 10 70 10 Q 90 10 90 30 Q 90 50 50 85 Z"
                                fill="oklch(60.92% 0.212 273.52)" opacity="0.25" />
                        </symbol>

                        {/* Syringe Icon */}
                        <symbol id="syringe" viewBox="0 0 100 100">
                            <rect x="35" y="10" width="15" height="60" rx="2" fill="oklch(60.92% 0.212 273.52)" opacity="0.3" />
                            <rect x="40" y="70" width="5" height="20" fill="oklch(60.92% 0.212 273.52)" opacity="0.4" />
                            <circle cx="42.5" cy="5" r="3" fill="oklch(68% 0.13 192)" opacity="0.35" />
                        </symbol>

                        {/* Molecule Structure */}
                        <symbol id="molecule" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="8" fill="oklch(60.92% 0.212 273.52)" opacity="0.35" />
                            <circle cx="20" cy="30" r="6" fill="oklch(72% 0.09 248)" opacity="0.3" />
                            <circle cx="80" cy="30" r="6" fill="oklch(68% 0.13 192)" opacity="0.3" />
                            <circle cx="30" cy="80" r="6" fill="oklch(72% 0.09 248)" opacity="0.3" />
                            <circle cx="70" cy="80" r="6" fill="oklch(68% 0.13 192)" opacity="0.3" />
                            <line x1="50" y1="50" x2="20" y2="30" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" opacity="0.25" />
                            <line x1="50" y1="50" x2="80" y2="30" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" opacity="0.25" />
                            <line x1="50" y1="50" x2="30" y2="80" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" opacity="0.25" />
                            <line x1="50" y1="50" x2="70" y2="80" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" opacity="0.25" />
                        </symbol>
                    </defs>

                    {/* Large Background linear Orbs with Enhanced Animation */}
                    <circle className="medical-orb-1" cx="200" cy="180" r="220" fill="url(#primaryGrad)" filter="url(#strongBlur)" />
                    <circle className="medical-orb-2" cx="1250" cy="120" r="280" fill="url(#accentGrad)" filter="url(#strongBlur)" />
                    <circle className="medical-orb-3" cx="1150" cy="720" r="240" fill="url(#secondaryGrad)" filter="url(#strongBlur)" />
                    <circle className="medical-orb-4" cx="250" cy="780" r="200" fill="url(#primaryGrad)" filter="url(#strongBlur)" />
                    <circle className="medical-orb-5" cx="720" cy="450" r="180" fill="url(#accentGrad)" filter="url(#strongBlur)" opacity="0.6" />

                    {/* Animated Heartbeat Lines - Multiple Layers */}
                    <g className="heartbeat-container">
                        <rect x="0" y="350" width="1440" height="60" fill="url(#heartbeatPattern)">
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                from="0 0"
                                to="-200 0"
                                dur="3s"
                                repeatCount="indefinite"
                            />
                        </rect>
                        <rect x="0" y="500" width="1440" height="60" fill="url(#heartbeatPattern)" opacity="0.5">
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                from="0 0"
                                to="200 0"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>

                    {/* Floating Medical Crosses - More Variety */}
                    <use href="#medicalCross" x="120" y="80" width="35" height="35" className="float-cross-1" opacity="0.18" />
                    <use href="#medicalCross" x="1280" y="200" width="45" height="45" className="float-cross-2" opacity="0.15" />
                    <use href="#medicalCross" x="850" y="680" width="38" height="38" className="float-cross-3" opacity="0.18" />
                    <use href="#medicalCross" x="380" y="580" width="28" height="28" className="float-cross-4" opacity="0.12" />
                    <use href="#medicalCross" x="600" y="100" width="32" height="32" className="float-cross-5" opacity="0.15" />
                    <use href="#medicalCross" x="1100" y="500" width="30" height="30" className="float-cross-6" opacity="0.13" />

                    {/* DNA Strands - Enhanced */}
                    <use href="#dnaStrand" x="80" y="320" width="45" height="110" className="dna-float-1" />
                    <use href="#dnaStrand" x="1320" y="480" width="45" height="110" className="dna-float-2" />
                    <use href="#dnaStrand" x="500" y="650" width="40" height="100" className="dna-float-3" />

                    {/* Pill Capsules - More Dynamic */}
                    <use href="#pillCapsule" x="580" y="120" width="85" height="42" className="pill-float-1" />
                    <use href="#pillCapsule" x="920" y="780" width="85" height="42" className="pill-float-2" />
                    <use href="#pillCapsule" x="1200" y="600" width="75" height="38" className="pill-float-3" />

                    {/* Stethoscope Icons */}
                    <use href="#stethoscope" x="180" y="480" width="65" height="65" className="stetho-float-1" />
                    <use href="#stethoscope" x="1180" y="380" width="75" height="75" className="stetho-float-2" />

                    {/* Heart Icons */}
                    <use href="#heartIcon" x="300" y="250" width="50" height="50" className="heart-float-1" />
                    <use href="#heartIcon" x="1000" y="150" width="55" height="55" className="heart-float-2" />
                    <use href="#heartIcon" x="450" y="750" width="45" height="45" className="heart-float-3" />

                    {/* Syringe Icons */}
                    <use href="#syringe" x="700" y="650" width="40" height="40" className="syringe-float-1" />
                    <use href="#syringe" x="250" y="400" width="35" height="35" className="syringe-float-2" />

                    {/* Molecule Structures */}
                    <use href="#molecule" x="900" y="250" width="60" height="60" className="molecule-float-1" />
                    <use href="#molecule" x="350" y="100" width="55" height="55" className="molecule-float-2" />
                    <use href="#molecule" x="1050" y="750" width="50" height="50" className="molecule-float-3" />

                    {/* Enhanced Pulse Rings - Center Focus */}
                    <g className="pulse-ring-container">
                        <circle cx="720" cy="450" r="100" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2.5" className="pulse-ring-1" opacity="0" />
                        <circle cx="720" cy="450" r="100" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2.5" className="pulse-ring-2" opacity="0" />
                        <circle cx="720" cy="450" r="100" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2.5" className="pulse-ring-3" opacity="0" />
                    </g>

                    {/* Additional Pulse Points */}
                    <g className="pulse-ring-container-2">
                        <circle cx="300" cy="200" r="60" fill="none" stroke="oklch(68% 0.13 192)" strokeWidth="2" className="pulse-ring-4" opacity="0" />
                        <circle cx="300" cy="200" r="60" fill="none" stroke="oklch(68% 0.13 192)" strokeWidth="2" className="pulse-ring-5" opacity="0" />
                    </g>

                    <g className="pulse-ring-container-3">
                        <circle cx="1150" cy="700" r="60" fill="none" stroke="oklch(72% 0.09 248)" strokeWidth="2" className="pulse-ring-6" opacity="0" />
                        <circle cx="1150" cy="700" r="60" fill="none" stroke="oklch(72% 0.09 248)" strokeWidth="2" className="pulse-ring-7" opacity="0" />
                    </g>

                    {/* Enhanced Circular Medical Particles */}
                    {[...Array(30)].map((_, i) => {
                        const x = 80 + (i * 65) % 1320;
                        const y = 60 + ((i * 167) % 820);
                        const size = 2.5 + (i % 4);

                        return (
                            <circle
                                key={`particle-${i}`}
                                cx={x}
                                cy={y}
                                r={size}
                                fill="oklch(60.92% 0.212 273.52)"
                                className={`medical-particle particle-${i % 20}`}
                                opacity="0.25"
                            />
                        );
                    })}

                    {/* Enhanced Connecting Dots Network */}
                    <g opacity="0.1">
                        <line x1="135" y1="97" x2="200" y2="180" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="1.5" className="connect-line-1" />
                        <line x1="620" y1="141" x2="850" y2="697" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="1.5" className="connect-line-2" />
                        <line x1="1295" y1="237" x2="1205" y2="447" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="1.5" className="connect-line-3" />
                        <line x1="315" y1="280" x2="463" y2="775" stroke="oklch(68% 0.13 192)" strokeWidth="1.5" className="connect-line-4" />
                        <line x1="1015" y1="177" x2="715" y2="665" stroke="oklch(72% 0.09 248)" strokeWidth="1.5" className="connect-line-5" />
                    </g>

                    {/* Decorative Plus Signs - More Coverage */}
                    {[...Array(12)].map((_, i) => {
                        const x = 150 + (i * 140) % 1250;
                        const y = 80 + (i * 130) % 750;

                        return (
                            <g key={`plus-${i}`} className={`decorative-plus plus-${i % 8}`} opacity="0.12">
                                <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2.5" />
                                <line x1={x - 12} y1={y} x2={x + 12} y2={y} stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2.5" />
                            </g>
                        );
                    })}

                    {/* Subtle Grid Pattern */}
                    <g opacity="0.03">
                        {[...Array(8)].map((_, i) => (
                            <line
                                key={`grid-v-${i}`}
                                x1={180 * (i + 1)}
                                y1="0"
                                x2={180 * (i + 1)}
                                y2="900"
                                stroke="oklch(60.92% 0.212 273.52)"
                                strokeWidth="1"
                            />
                        ))}
                        {[...Array(5)].map((_, i) => (
                            <line
                                key={`grid-h-${i}`}
                                x1="0"
                                y1={180 * (i + 1)}
                                x2="1440"
                                y2={180 * (i + 1)}
                                stroke="oklch(60.92% 0.212 273.52)"
                                strokeWidth="1"
                            />
                        ))}
                    </g>
                </svg>
            </div>

            {/* Multi-layer linear Overlay for Depth */}
            <div className="absolute inset-0 bg-linear-to-br from-base-100/90 via-base-100/95 to-base-100/88 z-10" />
            <div className="absolute inset-0 bg-linear-radial from-transparent via-base-100/30 to-base-100/60 z-20" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
