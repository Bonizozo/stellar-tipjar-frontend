"use client";

export function NoResultsIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="90" className="stroke-current opacity-10" strokeWidth="2" />
      <path
        d="M70 80C70 70 78 60 90 60C102 60 110 70 110 80"
        className="stroke-current"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="80" cy="85" r="3" className="fill-current" />
      <circle cx="100" cy="85" r="3" className="fill-current" />
      <path
        d="M80 100C85 105 95 105 100 100"
        className="stroke-current"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M60 130L140 130M65 140L135 140"
        className="stroke-current opacity-30"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NoDataIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="50" y="60" width="100" height="80" className="stroke-current" strokeWidth="2" />
      <line x1="60" y1="80" x2="140" y2="80" className="stroke-current opacity-30" strokeWidth="1" />
      <line x1="60" y1="100" x2="140" y2="100" className="stroke-current opacity-30" strokeWidth="1" />
      <line x1="60" y1="120" x2="140" y2="120" className="stroke-current opacity-30" strokeWidth="1" />
      <circle cx="100" cy="100" r="30" className="stroke-current opacity-20" strokeWidth="2" />
      <path
        d="M85 85L115 115M115 85L85 115"
        className="stroke-current opacity-40"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ErrorIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" className="stroke-current" strokeWidth="2" />
      <circle cx="100" cy="100" r="70" className="stroke-current opacity-20" strokeWidth="1" />
      <path
        d="M100 60L120 140H80Z"
        className="fill-current opacity-30"
      />
      <circle cx="100" cy="75" r="4" className="fill-current" />
      <line x1="100" y1="85" x2="100" y2="125" className="stroke-current" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function OfflineIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="80" r="30" className="stroke-current" strokeWidth="2" />
      <path
        d="M70 120C70 105 85 95 100 95C115 95 130 105 130 120"
        className="stroke-current"
        strokeWidth="2"
      />
      <path
        d="M50 150L150 50M150 150L50 50"
        className="stroke-current opacity-40"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
