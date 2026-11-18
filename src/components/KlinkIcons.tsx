import React from 'react';
import { Sun, Leaf, Snowflake } from 'lucide-react';
import { Season } from '../types';

export function KlinkBoatEmblem({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="22" cy="21" r="17.5" stroke="#28A99E" strokeWidth="1.6" />
      {/* Mast & T-top spreaders */}
      <path d="M22 5V28" stroke="#006994" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16.5 6.2H27.5" stroke="#006994" strokeWidth="2.4" strokeLinecap="round" />
      {/* Shrouds / rigging */}
      <path
        d="M22 7.5C15.5 11.5 11.5 17 11.5 22.5M22 7.5C28.5 11.5 32.5 17 32.5 22.5"
        stroke="#006994"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Clinker lapstrake hull strakes (bow view) */}
      <path
        d="M10.5 22.5C14 25.5 18 26.8 22 26.8C26 26.8 30 25.5 33.5 22.5"
        stroke="#006994"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12.5 26C15.5 28.4 18.8 29.4 22 29.4C25.2 29.4 28.5 28.4 31.5 26"
        stroke="#006994"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15.5 29.4C17.8 31 19.9 31.6 22 31.6C24.1 31.6 26.2 31 28.5 29.4"
        stroke="#006994"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Sea waves underneath */}
      <path
        d="M8.5 34.2C11.5 32.8 14.5 35.6 17.5 34.2C20.5 32.8 23.5 35.6 26.5 34.2C29.5 32.8 32.5 35.6 35.5 34.2"
        stroke="#28A99E"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M11 37.6C13.8 36.4 16.5 38.8 19.2 37.6C21.9 36.4 24.8 38.8 27.6 37.6C30.2 36.4 31.8 37.8 33.2 37.6"
        stroke="#28A99E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function KlinkLogoPill({
  onClick,
  size = 'md',
}: {
  onClick?: () => void;
  size?: 'sm' | 'md';
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      {...(onClick ? { type: 'button' as const, onClick } : {})}
      className={`inline-flex items-center gap-2 rounded-full bg-[#D7DAD7] border border-white/60 shadow-[0_3px_8px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.7)] transition-transform active:scale-[0.98] ${
        size === 'sm' ? 'px-3.5 py-1.5' : 'px-4 py-1.5'
      } ${onClick ? 'cursor-pointer hover:bg-[#CFD3CF]' : ''}`}
      aria-label="Klink Home"
    >
      <KlinkBoatEmblem className={size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'} />
      <span
        className={`font-medium tracking-tight text-[#006994] select-none ${
          size === 'sm' ? 'text-xl' : 'text-[24px] leading-none'
        }`}
      >
        Klink
      </span>
    </Tag>
  );
}

export function SpringFlowerIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Blossom */}
      <circle cx="12" cy="8.5" r="2" />
      <path d="M12 3.5a2.2 2.2 0 0 1 2.2 2.2c0 .6-.3 1.2-.7 1.6.6.1 1.2.4 1.6.9a2.2 2.2 0 0 1-1.6 3.7c-.5 0-1-.2-1.5-.5-.5.3-1 .5-1.5.5a2.2 2.2 0 0 1-1.6-3.7c.4-.5 1-.8 1.6-.9-.4-.4-.7-1-.7-1.6A2.2 2.2 0 0 1 12 3.5Z" />
      {/* Stem & leaves */}
      <path d="M12 12v8.5" />
      <path d="M12 18.5c-3.2 0-5.5-1.8-5.5-4.5 2.6 0 4.8 1.4 5.5 4.5Z" />
      <path d="M12 18.5c3.2 0 5.5-1.8 5.5-4.5-2.6 0-4.8 1.4-5.5 4.5Z" />
    </svg>
  );
}

export function SeasonIcon({
  season,
  className = 'w-5 h-5',
}: {
  season: Season;
  className?: string;
}) {
  switch (season) {
    case 'spring':
      return <SpringFlowerIcon className={className} />;
    case 'summer':
      return <Sun className={className} aria-hidden="true" />;
    case 'autumn':
      return <Leaf className={className} aria-hidden="true" />;
    case 'winter':
      return <Snowflake className={className} aria-hidden="true" />;
  }
}

export function SailboatWaveIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Main & jib sails */}
      <path d="M12 3v12" />
      <path d="M12 4L5 14h7" />
      <path d="M12 6l6 8h-6" />
      {/* Hull */}
      <path d="M4 16.5h16l-2 2.5H6l-2-2.5Z" />
      {/* Water line */}
      <path d="M3 21c1.5-.8 3 .8 4.5 0s3 .8 4.5 0 3 .8 4.5 0 3 .8 4.5 0" />
    </svg>
  );
}

export function CrossedToolsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Ruler */}
      <path d="M16.5 3.5L20.5 7.5L7.5 20.5L3.5 16.5L16.5 3.5Z" />
      <path d="M14 6l1.5 1.5M11.5 8.5L13 10M9 11l1.5 1.5M6.5 13.5L8 15" />
      {/* Pencil crossing */}
      <path d="M4.5 7.5L7.5 4.5L19.5 16.5L16.5 19.5L4.5 7.5Z" />
      <path d="M16.5 19.5L20.5 20.5L19.5 16.5" />
    </svg>
  );
}

export function BroomIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3v9" />
      <path d="M8.5 12h7" />
      <path d="M7.5 12l-2 8.5h13l-2-8.5" />
      <path d="M9.5 20.5l.5-4.5M12 20.5V16M14.5 20.5l-.5-4.5" />
    </svg>
  );
}

export function BellPlusIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <path d="M12 10.5v4M10 12.5h4" />
    </svg>
  );
}
