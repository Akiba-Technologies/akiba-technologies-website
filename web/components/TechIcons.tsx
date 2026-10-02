import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export function TechIcon({ name, size = 32 }: { name: string; size?: number }) {
  const s = size;
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (id) {
    // === CUSTOM EXTENSIONS ===
    case "fastapi":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#059669" />
          <path d="M13 3L6 13h5l-2 8 8-11h-5l2-7z" fill="#FFFFFF" />
        </svg>
      );
    case "restapi":
    case "rest":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="4" fill="#0284C7" />
          <path d="M7 10h3a1.5 1.5 0 010 3H7m0-3v5m7-5l3 5m-3 0l3-5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "azure":
    case "azureopenai":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12.5 3L4 18h6.5l4-7.5L12.5 3z" fill="#0089D6" />
          <path d="M14 10.5l-3.5 6.5H20l-4-9-2 2.5z" fill="#0072C6" />
        </svg>
      );

    // === AI & ML ===
    case "openai":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21.5 10.3a5.5 5.5 0 00-.5-4.1 5.7 5.7 0 00-4.6-2.8 5.6 5.6 0 00-3.8.9 5.5 5.5 0 00-4.3-.4 5.6 5.6 0 00-3.6 3.1 5.6 5.6 0 00-.7 4.1 5.5 5.5 0 00.5 4.1 5.7 5.7 0 004.6 2.8 5.6 5.6 0 003.8-.9 5.5 5.5 0 004.3.4 5.6 5.6 0 003.6-3.1 5.6 5.6 0 00.7-4.1zm-8.8 9.9a4.2 4.2 0 01-2.4-.7l.1-.1 3.5-2a.7.7 0 00.4-.6v-4.9l1.5.9v4.2a4.2 4.2 0 01-3.1 3.2zm-7.6-4.4a4.2 4.2 0 01-.6-2.5l.1.1 3.5 2a.7.7 0 00.7 0l4.2-2.5v1.7l-3.6 2.1a4.2 4.2 0 01-4.3-.9zm-1.2-7.5a4.2 4.2 0 011.8-1.8v.1l3.5 2a.7.7 0 00.7 0l4.2 2.5-1.5.8-3.6-2.1a4.2 4.2 0 00-5.1.5zm11.3 2.1l-4.2-2.5 1.5-.9 3.6 2.1a4.2 4.2 0 012.3 3.6 4.2 4.2 0 01-.5 2l-.1-.1-3.5-2a.7.7 0 00-.7 0v-2.2zm2.8 6.5a4.2 4.2 0 01-1.8 1.8v-.1l-3.5-2a.7.7 0 00-.7 0l-4.2-2.5 1.5-.8 3.6 2.1a4.2 4.2 0 005.1-.5zm-7.7-1.7l-1.9-1.1 1.9-1.1 1.9 1.1-1.9 1.1z"
            fill="#10A37F"
          />
        </svg>
      );
    case "tensorflow":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L3 7.2v9.6l4-2.3V9.5l5-2.9 5 2.9v5l4 2.3V7.2L12 2z" fill="#FF6F00" />
          <path d="M12 9.5l-5 2.9v5l5-2.9 5 2.9v-5l-5-2.9z" fill="#FFA800" />
        </svg>
      );
    case "pytorch":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M13.2 3.5a7.5 7.5 0 00-5 1.8 7.5 7.5 0 00-2.3 5.4c0 3.8 2.8 6.8 6.5 7.3v-2.2a5.2 5.2 0 01-4.3-5.1c0-2.8 2.2-5.1 5-5.1a5.1 5.1 0 013.7 1.6l1.6-1.6a7.4 7.4 0 00-5.2-2.1zm2.3 2.1l-.8.8a1.1 1.1 0 11-1.6-1.6l.8-.8a1.1 1.1 0 111.6 1.6z"
            fill="#EE4C2C"
          />
        </svg>
      );
    case "langchain":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="6" width="7" height="12" rx="3.5" stroke="#1C3C3C" strokeWidth="2.5" />
          <rect x="14" y="6" width="7" height="12" rx="3.5" stroke="#2563EB" strokeWidth="2.5" />
          <path d="M8 12h8" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "huggingface":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#FFD21E" />
          <path d="M8 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm8 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#000" />
          <path d="M8 15.5c1.2 1.5 2.6 2 4 2s2.8-.5 4-2" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "scikitlearn":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="6" fill="#F89939" fillOpacity="0.85" />
          <circle cx="15" cy="15" r="6" fill="#3499CD" fillOpacity="0.85" />
          <path d="M12 9l3 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "numpy":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6l8-4 8 4v12l-8 4-8-4V6z" stroke="#4D77CF" strokeWidth="2" fill="#E8EFFF" />
          <path d="M8 9v6l8-6v6" stroke="#4D77CF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pandas":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="5" y="4" width="4" height="16" rx="2" fill="#130754" />
          <rect x="11" y="9" width="4" height="11" rx="2" fill="#FFD43B" />
          <rect x="17" y="13" width="4" height="7" rx="2" fill="#E70488" />
        </svg>
      );
    case "keras":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#D00000" />
          <path d="M7 6v12m0-6l6-6m-4 7l5 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "apachespark":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2l2.5 6.5L21 11l-5.5 4.5L17 22l-5-4-5 4 1.5-6.5L3 11l6.5-2.5L12 2z" fill="#E25A1C" />
        </svg>
      );
    case "python":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M11.9 2c-3.1 0-5 .7-5 2.8v2.1h5.1v.7H4.6C2.5 7.6 2 9.5 2 12.1c0 2.8 1.2 4.3 3.3 4.3h1.8v-2.3c0-1.8 1.5-3.3 3.3-3.3h5.1c1.5 0 2.7-1.2 2.7-2.7V4.8C18.2 2.7 16.2 2 11.9 2zm-1.8 2.2a.9.9 0 110 1.8.9.9 0 010-1.8z"
            fill="#3776AB"
          />
          <path
            d="M12.1 22c3.1 0 5-.7 5-2.8v-2.1H12v-.7h7.4c2.1 0 2.6-1.9 2.6-4.5 0-2.8-1.2-4.3-3.3-4.3h-1.8v2.3c0 1.8-1.5 3.3-3.3 3.3H8.5c-1.5 0-2.7 1.2-2.7 2.7v3.3c0 2.1 2 2.8 6.3 2.8zm1.8-2.2a.9.9 0 110-1.8.9.9 0 010 1.8z"
            fill="#FFD43B"
          />
        </svg>
      );
    case "opencv":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="7" r="4.5" stroke="#EA2027" strokeWidth="2.5" />
          <circle cx="7" cy="16" r="4.5" stroke="#009432" strokeWidth="2.5" />
          <circle cx="17" cy="16" r="4.5" stroke="#0652DD" strokeWidth="2.5" />
        </svg>
      );

    // === MOBILE DEV ===
    case "kotlin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="kotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7F52FF" />
              <stop offset="100%" stopColor="#C711E1" />
            </linearGradient>
          </defs>
          <path d="M2 2h20L12 12l10 10H2V2z" fill="url(#kotGrad)" />
        </svg>
      );
    case "swift":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.5 17c-2.3 2.8-5.8 4.5-9.7 4.5-3.8 0-7.3-1.6-9.7-4.2 2.8.2 5.8-.5 8.2-2.1-3.2-.2-5.9-1.9-7-4.6 1 .2 2.1.2 3.1-.1C2.5 9.4 1 6.8 1.5 4c1.3 1.5 3 2.7 4.9 3.4 1.8.7 3.8 1 5.8.7-.3-.8-.4-1.6-.4-2.5 0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2 1.3-.3 2.6-.8 3.8-1.5-.4 1.4-1.4 2.5-2.6 3.2 1.2-.1 2.3-.5 3.4-.9-.8 1.2-1.8 2.2-3 3 0 .2 0 .5 0 .7 0 4.1-1.3 7.8-3.4 10.9z"
            fill="#F05138"
          />
        </svg>
      );
    case "flutter":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M13.5 2L3 12.5l3.2 3.2L19.9 2h-6.4zm0 8.5L8.2 15.8l3.2 3.2 5.3-5.3h3.2L14.6 8.4l-1.1 2.1z" fill="#02569B" />
          <path d="M11.4 19l2.8 2.8h6.4l-6-6-3.2 3.2z" fill="#0175C2" />
        </svg>
      );
    case "reactnative":
    case "react":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        </svg>
      );
    case "java":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 17.5c3.5.3 7.5.3 11-1 0 0-1.5 1.5-5 2-4.5.6-6-.5-6-1zm-1-3c4 .4 9 .4 13-1.2 0 0-1.2 1.4-4.8 1.9-4.8.7-8.2-.7-8.2-.7zm4.5-9s1.5 1.5-1 3.5c-2 1.5-1.5 2.5 0 3.5 1.5 1 2.5 1.8 1 3-2 1.5-1 2.5 0 2.5 2.5 0 3.5-2.5 2-4.5-1-1.5-2.5-2 0-3.5 1.5-1 2-2.5-2-4.5z" fill="#EA2D2E" />
          <path d="M12 21c3.5 0 7-.5 9-1.5-2 0-5 .8-9 .8-4.5 0-7.5-.7-9-.8 2 1 5.5 1.5 9 1.5z" fill="#5382A1" />
        </svg>
      );
    case "ionic":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#3880FF" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="3.5" fill="#3880FF" />
          <circle cx="18" cy="8" r="1.5" fill="#3880FF" />
        </svg>
      );
    case "objectivec":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" stroke="#007ACC" strokeWidth="2.2" />
          <path d="M14 9a4 4 0 100 6" stroke="#007ACC" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "fastlane":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L3 13h7l-2 9 11-12h-7l2-8z" fill="#000000" />
        </svg>
      );
    case "firebase":
    case "firebasecloud":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4.5 17.5L7.8 4.2a.7.7 0 011.3-.2l2.3 4.4L4.5 17.5z" fill="#FFA000" />
          <path d="M12.8 11.2l-2-7.1a.7.7 0 00-1.3-.1L4.5 17.5l8.3-6.3z" fill="#F57C00" />
          <path d="M19.5 17.5L16.2 8.4a.7.7 0 00-1.3 0L4.5 17.5l7 4a1.5 1.5 0 001.5 0l6.5-4z" fill="#FFCA28" />
        </svg>
      );
    case "androidsdk":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 14v6a2 2 0 002 2h8a2 2 0 002-2v-6H6z" fill="#3DDC84" />
          <path d="M8 8a4 4 0 018 0H8z" fill="#3DDC84" />
          <path d="M7 5l-2-2m12 2l2-2" stroke="#3DDC84" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="10" cy="7" r=".8" fill="#FFF" />
          <circle cx="14" cy="7" r=".8" fill="#FFF" />
        </svg>
      );
    case "iossdk":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M17.5 12.8c0-2.4 2-3.6 2-3.7-1.1-1.6-2.9-1.9-3.5-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-.8-3.3-.8-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3 0 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1.1-2.8-4.4zm-2.8-7.8c.6-.8 1.1-1.9.9-3-.9.1-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.3z"
            fill="#000000"
          />
        </svg>
      );
    case "xamarin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#3498DB" />
          <path d="M7 7l10 10m0-10L7 17" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // === FRONTEND DEV ===
    case "nextjs":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#000000" />
          <path d="M8 8v8m0-8l9 11.5M16 8v5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "angular":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L3 5.5l1.4 12L12 22l7.6-4.5 1.4-12L12 2z" fill="#DD0031" />
          <path d="M12 4.5v15.3l5.8-3.4 1-9.3L12 4.5z" fill="#C3002F" />
          <path d="M12 6.5l-4 9h2.2l.8-2h4l.8 2h2.2l-6-9zm-1.2 5.5l1.2-3 1.2 3h-2.4z" fill="#FFFFFF" />
        </svg>
      );
    case "vuejs":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M2 3h4.5L12 13 17.5 3H22L12 21 2 3z" fill="#42B883" />
          <path d="M6.5 3h3.5L12 7 14 3h3.5L12 13 6.5 3z" fill="#35495E" />
        </svg>
      );
    case "svelte":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M19.4 6.8c-1.3-2.3-4-3.5-6.8-2.9-2 .4-3.7 1.7-4.4 3.4l-.1.3 2.8 1.6.1-.2c.4-.9 1.3-1.6 2.4-1.8 1.5-.3 3 .4 3.6 1.7.7 1.3.3 3-.9 3.9L12 15.6c-2.3 1.7-3.3 4.6-2.5 7.3.8 2.6 3.2 4.4 6 4.4 1 0 1.9-.2 2.8-.7 2-1 3.3-2.9 3.5-5.1l-3.2-.4c-.1 1.2-.8 2.2-1.9 2.8-1.5.8-3.4.4-4.2-1-.7-1.3-.3-3 .9-3.9l4.1-2.8c2.2-1.6 3.2-4.4 2.5-7-.6-1.1-1.4-2-2.6-2.5z"
            fill="#FF3E00"
            transform="scale(0.8) translate(2, 2)"
          />
        </svg>
      );
    case "typescript":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
          <path d="M6 10h6m-3 0v8M14 14.5c.5-.5 1.2-.8 2-.8 1.4 0 2.2.8 2.2 2s-.8 2-2.2 2c-.8 0-1.5-.3-2-.8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "javascript":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
          <path d="M8 12v5a2 2 0 01-2 2H5m10-7c1 0 2.5.5 2.5 2s-1.5 2-2.5 2c-1.5 0-2.5-1-2.5-1" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "html5":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3z" fill="#E34F26" />
          <path d="M12 4v16.2l5.7-1.6 1.4-14.6H12z" fill="#EF652A" />
          <path d="M7 7.5h10M7.5 11h9m-5 4.5l3.5-.9.3-3.1" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "tailwindcss":
    case "tailwind":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9.5c1.5-2 3.5-2.5 6-1.5 1.5.6 2.5 1.6 3.5 2.7 1.8 1.8 3.8 2.3 6.5 1.3-1.5 2-3.5 2.5-6 1.5-1.5-.6-2.5-1.6-3.5-2.7-1.8-1.8-3.8-2.3-6.5-1.3zM2 15.5c1.5-2 3.5-2.5 6-1.5 1.5.6 2.5 1.6 3.5 2.7 1.8 1.8 3.8 2.3 6.5 1.3-1.5 2-3.5 2.5-6 1.5-1.5-.6-2.5-1.6-3.5-2.7-1.8-1.8-3.8-2.3-6.5-1.3z"
            fill="#38BDF8"
          />
        </svg>
      );
    case "bootstrap":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#7952B3" />
          <path d="M8 7h4.5a2.5 2.5 0 012.2 3.7A2.8 2.8 0 0113 16.5H8V7zm3 3.5h1.2a1 1 0 000-2H11v2zm0 4h1.5a1.2 1.2 0 000-2.4H11v2.4z" fill="#FFFFFF" />
        </svg>
      );
    case "materialui":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M2 6l5-3 5 3v6l-5 3-5-3V6zm10 6l5-3 5 3v6l-5 3-5-3v-6z" fill="#007FFF" />
          <path d="M7 9l5-3 5 3v6l-5 3-5-3V9z" fill="#0059B2" />
        </svg>
      );
    case "redux":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3" fill="#764ABC" />
          <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#764ABC" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" stroke="#764ABC" strokeWidth="1.8" />
        </svg>
      );

    // === BACKEND DEV ===
    case "nodejs":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z" fill="#5FA04E" />
          <path d="M12 6.5l5 3v5l-5 3-5-3v-5l5-3z" fill="#FFFFFF" />
        </svg>
      );
    case "nestjs":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2c-3.5 2-6 5.5-6 9.5 0 2.5 1.5 5 4 6.5-1.5-.5-3-2-3-4 0-3 2.5-5.5 5-7.5 2.5 2 5 4.5 5 7.5 0 2-1.5 3.5-3 4 2.5-1.5 4-4 4-6.5 0-4-2.5-7.5-6-9.5z" fill="#E0234E" />
        </svg>
      );
    case "django":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#092E20" />
          <path d="M11 6v8a3 3 0 01-3 3H6m9-11v12m-3-12h3" stroke="#44B78B" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "springboot":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" fill="#6DB33F" />
          <circle cx="12" cy="12" r="3.5" fill="#FFFFFF" />
        </svg>
      );
    case "netcore":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#512BD4" />
          <circle cx="6" cy="17" r="1.5" fill="#FFF" />
          <path d="M10 7v10l6-10v10" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "go":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 12a5 5 0 119 3H9v-2h4a3 3 0 10-6-1zm12-4h4a4 4 0 110 8h-4V8z" fill="#00ADD8" />
        </svg>
      );
    case "rubyonrails":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#CC0000" />
          <path d="M7 17V7h4.5a3 3 0 010 6H7m3 0l3 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "php":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="6.5" fill="#777BB4" />
          <text x="12" y="14" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle">PHP</text>
        </svg>
      );
    case "laravel":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 8l6-3 6 3-6 3-6-3zm6 3v7l6 3v-7l-6-3zm12-3l-6-3-2 1 6 3 2-1zm-2 5l2-1v7l-6 3v-3l4-2v-4z" fill="#FF2D20" />
        </svg>
      );
    case "rust":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="#DEA584" strokeWidth="2.5" />
          <path d="M9 8h4a2 2 0 010 4H9V8zm0 4h3l2 4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "expressjs":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <text x="12" y="16" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle">ex</text>
        </svg>
      );

    // === DATABASE ===
    case "postgresql":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2C7 2 5 5 5 9c0 5 3 8 7 11 4-3 7-6 7-11 0-4-2-7-7-7z" fill="#4169E1" />
          <circle cx="10" cy="8" r="1.2" fill="#FFF" />
          <circle cx="14" cy="8" r="1.2" fill="#FFF" />
        </svg>
      );
    case "mongodb":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2s-6 5.5-6 10.5c0 4.2 3.2 7.5 6 9.5 2.8-2 6-5.3 6-9.5C18 7.5 12 2 12 2zm0 18.5V3.5s4.5 4.5 4.5 9c0 3.5-2.2 6.5-4.5 8z" fill="#47A248" />
        </svg>
      );
    case "mysql":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 14c2-4 5-7 10-7 2 0 4 1 5 3-2 1-4 1-6 2-3 1-5 4-9 2z" fill="#00758F" />
          <path d="M14 16c2 1 4 1 6-1-1 3-3 4-6 3 0-1 0-1 0-2z" fill="#F29111" />
        </svg>
      );
    case "redis":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-18 5l9 4 9-4" stroke="#DC382D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "supabase":
    case "supabasecloud":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z" fill="#3ECF8E" />
        </svg>
      );
    case "dynamodb":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3C7 3 4 5 4 7.5v9C4 19 7 21 12 21s8-2 8-4.5v-9C20 5 17 3 12 3z" fill="#4053D6" />
          <ellipse cx="12" cy="7.5" rx="8" ry="3" fill="#527FFF" />
        </svg>
      );
    case "oracle":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="7" width="20" height="10" rx="5" stroke="#F80000" strokeWidth="2.5" />
        </svg>
      );
    case "elasticsearch":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#005571" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="#FED10A" />
          <path d="M12 3v18" stroke="#00BFB3" strokeWidth="2.5" />
        </svg>
      );
    case "cassandra":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="9" ry="5" fill="#1287B1" />
          <circle cx="12" cy="12" r="2.5" fill="#FFF" />
        </svg>
      );
    case "neo4j":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="6" cy="14" r="3.5" fill="#008CC1" />
          <circle cx="17" cy="7" r="3.5" fill="#008CC1" />
          <circle cx="16" cy="17" r="3.5" fill="#008CC1" />
          <path d="M9 13l5-4m-5 3l4 3" stroke="#008CC1" strokeWidth="2" />
        </svg>
      );
    case "sqlite":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="4" fill="#003B57" />
          <path d="M7 15c2 2 8 2 10 0" stroke="#00A9E0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "prisma":
    case "prismaorm":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 19L11 2l9 17-16 0z" stroke="#2D3748" strokeWidth="2.2" strokeLinejoin="round" fill="#E2E8F0" />
          <path d="M11 2v17" stroke="#2D3748" strokeWidth="2" />
        </svg>
      );

    // === CLOUD ===
    case "aws":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 14c4 3 12 3 16 0" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 12l2 2-2 2" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="12" y="11" fill="#232F3E" fontSize="7" fontWeight="bold" textAnchor="middle">AWS</text>
        </svg>
      );
    case "googlecloud":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 14a4 4 0 011-7.8 5 5 0 019.5 1.8 3.5 3.5 0 011.5 6.5H6z" fill="#4285F4" />
        </svg>
      );
    case "microsoftazure":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12.5 3L4 18h6.5l4-7.5L12.5 3z" fill="#0089D6" />
          <path d="M14 10.5l-3.5 6.5H20l-4-9-2 2.5z" fill="#0072C6" />
        </svg>
      );
    case "cloudflare":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 16a3.5 3.5 0 00.5-7 4.5 4.5 0 00-8.5-1.5A3.5 3.5 0 006 14a2.5 2.5 0 00.5 5h11a2.5 2.5 0 00.5-3z" fill="#F38020" />
        </svg>
      );
    case "digitalocean":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3a9 9 0 00-9 9h4a5 5 0 015-5V3z" fill="#0080FF" />
          <circle cx="12" cy="12" r="9" stroke="#0080FF" strokeWidth="2.5" strokeDasharray="35 15" />
        </svg>
      );
    case "vercel":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L22 20H2L12 2z" fill="#000000" />
        </svg>
      );
    case "netlify":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3l8 9-8 9-8-9 8-9z" stroke="#00C7B7" strokeWidth="2.5" fill="#E6FFFA" />
        </svg>
      );
    case "heroku":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#6762A6" />
          <path d="M8 7v10m8-10v10m-8-5h8" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "linode":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" fill="#00A95C" />
          <circle cx="12" cy="12" r="4" fill="#FFF" />
        </svg>
      );
    case "cloudfront":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 14a4 4 0 011-7.8 5 5 0 019.5 1.8 3.5 3.5 0 011.5 6.5H6z" stroke="#FF9900" strokeWidth="2.2" fill="#FFF8F0" />
          <path d="M9 12h6m-3-3l3 3-3 3" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // === DEVOPS ===
    case "docker":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 13.5c1-1 3-1 4.5 0 1.5 1 3.5 1 5 0 1.5-1 3.5-1 5 0 1.5 1 3 0 3.5-.5.5 4-3 8-9 8-7 0-9.5-5.5-9-7.5z" fill="#2496ED" />
          <rect x="7" y="9" width="2" height="2" fill="#2496ED" />
          <rect x="10" y="9" width="2" height="2" fill="#2496ED" />
          <rect x="13" y="9" width="2" height="2" fill="#2496ED" />
          <rect x="10" y="6.5" width="2" height="2" fill="#2496ED" />
        </svg>
      );
    case "kubernetes":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" stroke="#326CE5" strokeWidth="2" fill="#EDF3FF" />
          <circle cx="12" cy="11" r="3" stroke="#326CE5" strokeWidth="2" />
        </svg>
      );
    case "githubactions":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#2088FF" />
          <path d="M8 12l3 3 5-6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "terraform":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8.5 2v6.5l5.5 3.2V5.2L8.5 2z" fill="#7B42BC" />
          <path d="M2.5 5.5v6.5l5.5 3.2V8.7L2.5 5.5z" fill="#5C4EE5" />
          <path d="M8.5 15.5V22l5.5-3.2v-6.5L8.5 15.5z" fill="#5C4EE5" />
          <path d="M14.5 8.7v6.5l5.5-3.2V5.5L14.5 8.7z" fill="#844FBA" />
        </svg>
      );
    case "jenkins":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="9" r="6" stroke="#D33833" strokeWidth="2" fill="#F0D6B2" />
          <path d="M6 21c0-3 3-5 6-5s6 2 6 5" fill="#D33833" />
        </svg>
      );
    case "gitlabci":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 21l9.5-7L18 3l-3 9H9L6 3 2.5 14 12 21z" fill="#FC6D26" />
          <path d="M12 21l-3-9h6l-3 9z" fill="#E24329" />
        </svg>
      );
    case "ansible":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#000000" />
          <path d="M8 18l4-12 4 12h-2.5l-1-3.5h-3L8.5 18H8zm3.2-5.5h2.6L12 8.5l-.8 4z" fill="#FFFFFF" />
        </svg>
      );
    case "prometheus":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#E6522C" strokeWidth="2.2" />
          <path d="M12 6c-2 2-3 4-3 6a3 3 0 006 0c0-2-1-4-3-6z" fill="#E6522C" />
        </svg>
      );
    case "grafana":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="#F46800" />
          <path d="M8 12a4 4 0 118 0 4 4 0 01-8 0z" fill="#FFFFFF" />
        </svg>
      );
    case "helm":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#0F1689" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="3" fill="#0F1689" />
          <path d="M12 3v6m0 6v6M3 12h6m6 0h6" stroke="#0F1689" strokeWidth="2" />
        </svg>
      );
    case "argocd":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="#EF7B4D" />
          <circle cx="12" cy="12" r="3.5" fill="#FFFFFF" />
        </svg>
      );
    case "datadog":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#632CA6" />
          <path d="M8 12c1-2 4-2 5 0m-2 4h4" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // === FRAMEWORKS & PLATFORMS ===
    case "graphql":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <polygon points="12,2 21,7.5 21,18 12,23 3,18 3,7.5" stroke="#E10098" strokeWidth="2" fill="none" />
          <circle cx="12" cy="2" r="2" fill="#E10098" />
          <circle cx="21" cy="7.5" r="2" fill="#E10098" />
          <circle cx="21" cy="18" r="2" fill="#E10098" />
          <circle cx="12" cy="23" r="2" fill="#E10098" />
          <circle cx="3" cy="18" r="2" fill="#E10098" />
          <circle cx="3" cy="7.5" r="2" fill="#E10098" />
        </svg>
      );
    case "trpc":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#2596BE" />
          <path d="M6 8h12m-6 0v9" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "rabbitmq":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="#FF6600" />
          <circle cx="9" cy="10" r="1.2" fill="#FFF" />
          <circle cx="15" cy="10" r="1.2" fill="#FFF" />
          <path d="M10 15c1 1 3 1 4 0" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "apachekafka":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#231F20" />
          <circle cx="8" cy="12" r="2" fill="#FFF" />
          <circle cx="15" cy="7.5" r="2" fill="#FFF" />
          <circle cx="15" cy="16.5" r="2" fill="#FFF" />
          <path d="M9.5 11l4-2.5m-4 4.5l4 2.5" stroke="#FFF" strokeWidth="1.5" />
        </svg>
      );
    case "nginx":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <polygon points="12,2 21,7.2 21,17.8 12,23 3,17.8 3,7.2" fill="#009639" />
          <path d="M8 8v8l8-8v8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "linux":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="13" rx="6" ry="8" fill="#000000" />
          <ellipse cx="12" cy="14" rx="4" ry="6" fill="#FFFFFF" />
          <circle cx="10" cy="8" r="1" fill="#000" />
          <circle cx="14" cy="8" r="1" fill="#000" />
          <path d="M10.5 10.5h3l-1.5 2z" fill="#FFA500" />
        </svg>
      );
    case "websocket":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" stroke="#4A154B" strokeWidth="2" />
          <path d="M8 12h8m-5-3l3 3-3 3" stroke="#4A154B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "turborepo":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" stroke="#000" strokeWidth="2" />
          <path d="M7 12a5 5 0 019-3M17 12a5 5 0 01-9 3" stroke="#0070F3" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "stripe":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#635BFF" />
          <path d="M13.5 10.2c-.8-.4-1.3-.6-1.3-1 0-.4.3-.6.9-.6 1 0 2 .4 2.6.8l.5-2.2c-.7-.3-1.8-.5-3-.5-2.5 0-4.2 1.3-4.2 3.4 0 2.2 1.7 2.8 3.5 3.3.9.3 1.2.6 1.2 1 0 .5-.5.8-1.2.8-1.2 0-2.5-.5-3.3-1.1l-.5 2.3c.9.5 2.2.8 3.7.8 2.6 0 4.4-1.3 4.4-3.5 0-2.3-1.8-2.9-3.3-3.2z" fill="#FFFFFF" />
        </svg>
      );
    case "postman":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#FF6C37" />
          <path d="M7 14l5-5 5 5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#3B82F6" />
          <text x="12" y="15" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
            {name.slice(0, 2).toUpperCase()}
          </text>
        </svg>
      );
  }
}
