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
                        {/* Gradients */}
                        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0.15">
                                <animate attributeName="stop-opacity" values="0.15;0.25;0.15" dur="6s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0.05">
                                <animate attributeName="stop-opacity" values="0.05;0.12;0.05" dur="6s" repeatCount="indefinite" />
                            </stop>
                        </linearGradient>

                        <linearGradient id="accentGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="oklch(68% 0.13 192)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="oklch(72% 0.09 248)" stopOpacity="0.08" />
                        </linearGradient>

                        <radialGradient id="pulseGrad">
                            <stop offset="0%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="oklch(60.92% 0.212 273.52)" stopOpacity="0" />
                        </radialGradient>

                        {/* Filters */}
                        <filter id="softGlow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="mediumBlur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
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
                                strokeWidth="2"
                                fill="none"
                                opacity="0.15"
                            />
                        </pattern>

                        {/* DNA Helix Pattern */}
                        <symbol id="dnaStrand" viewBox="0 0 40 100">
                            <ellipse cx="10" cy="10" rx="8" ry="3" fill="oklch(60.92% 0.212 273.52)" opacity="0.3" />
                            <ellipse cx="30" cy="30" rx="8" ry="3" fill="oklch(72% 0.09 248)" opacity="0.3" />
                            <ellipse cx="10" cy="50" rx="8" ry="3" fill="oklch(60.92% 0.212 273.52)" opacity="0.3" />
                            <ellipse cx="30" cy="70" rx="8" ry="3" fill="oklch(72% 0.09 248)" opacity="0.3" />
                            <ellipse cx="10" cy="90" rx="8" ry="3" fill="oklch(60.92% 0.212 273.52)" opacity="0.3" />
                            <path d="M 10 10 Q 20 30 30 30 Q 20 50 10 50 Q 20 70 30 70 Q 20 90 10 90"
                                stroke="oklch(60.92% 0.212 273.52)" strokeWidth="1.5" fill="none" opacity="0.2" />
                            <path d="M 30 30 Q 20 50 10 50 Q 20 70 30 70 Q 20 90 10 90"
                                stroke="oklch(72% 0.09 248)" strokeWidth="1.5" fill="none" opacity="0.2" />
                        </symbol>

                        {/* Pill Capsule */}
                        <symbol id="pillCapsule" viewBox="0 0 80 40">
                            <rect x="0" y="0" width="40" height="40" rx="20" fill="oklch(60.92% 0.212 273.52)" opacity="0.25" />
                            <rect x="40" y="0" width="40" height="40" rx="20" fill="oklch(68% 0.13 192)" opacity="0.25" />
                        </symbol>

                        {/* Stethoscope Icon */}
                        <symbol id="stethoscope" viewBox="0 0 100 100">
                            <circle cx="50" cy="20" r="8" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="3" opacity="0.3" />
                            <path d="M 42 20 Q 30 30 30 50 L 30 70 Q 30 85 45 85 L 55 85 Q 70 85 70 70 L 70 50"
                                stroke="oklch(60.92% 0.212 273.52)" strokeWidth="3" fill="none" opacity="0.3" />
                            <circle cx="70" cy="40" r="10" fill="oklch(60.92% 0.212 273.52)" opacity="0.25" />
                        </symbol>
                    </defs>

                    {/* Background Gradient Orbs */}
                    <circle className="medical-orb-1" cx="250" cy="200" r="180" fill="url(#primaryGrad)" filter="url(#mediumBlur)" />
                    <circle className="medical-orb-2" cx="1200" cy="150" r="220" fill="url(#accentGrad)" filter="url(#mediumBlur)" />
                    <circle className="medical-orb-3" cx="1100" cy="700" r="200" fill="url(#primaryGrad)" filter="url(#mediumBlur)" />
                    <circle className="medical-orb-4" cx="300" cy="750" r="160" fill="url(#accentGrad)" filter="url(#mediumBlur)" />

                    {/* Heartbeat Line Animation */}
                    <g className="heartbeat-container">
                        <rect x="0" y="420" width="1440" height="60" fill="url(#heartbeatPattern)">
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                from="0 0"
                                to="-200 0"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>

                    {/* Floating Medical Crosses */}
                    <use href="#medicalCross" x="150" y="100" width="30" height="30" className="float-cross-1" opacity="0.15" />
                    <use href="#medicalCross" x="1250" y="250" width="40" height="40" className="float-cross-2" opacity="0.12" />
                    <use href="#medicalCross" x="800" y="700" width="35" height="35" className="float-cross-3" opacity="0.15" />
                    <use href="#medicalCross" x="400" y="600" width="25" height="25" className="float-cross-4" opacity="0.1" />

                    {/* DNA Strands */}
                    <use href="#dnaStrand" x="100" y="350" width="40" height="100" className="dna-float-1" />
                    <use href="#dnaStrand" x="1300" y="500" width="40" height="100" className="dna-float-2" />

                    {/* Pill Capsules */}
                    <use href="#pillCapsule" x="600" y="150" width="80" height="40" className="pill-float-1" />
                    <use href="#pillCapsule" x="950" y="800" width="80" height="40" className="pill-float-2" />

                    {/* Stethoscope Icons */}
                    <use href="#stethoscope" x="200" y="500" width="60" height="60" className="stetho-float-1" />
                    <use href="#stethoscope" x="1150" y="400" width="70" height="70" className="stetho-float-2" />

                    {/* Pulse Rings */}
                    <g className="pulse-ring-container">
                        <circle cx="720" cy="450" r="100" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" className="pulse-ring-1" opacity="0" />
                        <circle cx="720" cy="450" r="100" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" className="pulse-ring-2" opacity="0" />
                        <circle cx="720" cy="450" r="100" fill="none" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" className="pulse-ring-3" opacity="0" />
                    </g>

                    {/* Circular Medical Particles */}
                    {[...Array(20)].map((_, i) => {
                        const x = 100 + (i * 70) % 1300;
                        const y = 80 + ((i * 173) % 800);
                        const size = 3 + (i % 3);

                        return (
                            <circle
                                key={`particle-${i}`}
                                cx={x}
                                cy={y}
                                r={size}
                                fill="oklch(60.92% 0.212 273.52)"
                                className={`medical-particle particle-${i}`}
                                opacity="0.2"
                            />
                        );
                    })}

                    {/* Connecting Dots Network */}
                    <g opacity="0.08">
                        <line x1="150" y1="115" x2="250" y2="200" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="1" className="connect-line-1" />
                        <line x1="600" y1="170" x2="800" y2="720" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="1" className="connect-line-2" />
                        <line x1="1250" y1="280" x2="1150" y2="450" stroke="oklch(60.92% 0.212 273.52)" strokeWidth="1" className="connect-line-3" />
                    </g>

                    {/* Decorative Plus Signs */}
                    {[...Array(8)].map((_, i) => {
                        const x = 200 + (i * 180) % 1200;
                        const y = 100 + (i * 140) % 700;

                        return (
                            <g key={`plus-${i}`} className={`decorative-plus plus-${i}`} opacity="0.1">
                                <line x1={x} y1={y - 10} x2={x} y2={y + 10} stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                                <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke="oklch(60.92% 0.212 273.52)" strokeWidth="2" />
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-base-100/85 via-base-100/92 to-base-100/88 z-[1]" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
