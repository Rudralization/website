import React, { useState, useEffect } from 'react';
import {
  LiquidGlassFilter,
  GlassButton,
  GlassCard,
  GlassInput,
  GlassNav,
  GlassSegmented,
  GlassSheet,
  GlassSlider,
  GlassSwitch,
} from '@zakisheriff/liquid-glass';

type SectionId = 'home' | 'about' | 'projects' | 'experience' | 'music' | 'contact';

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'iOS' | 'Web' | 'Creative';
  status: string;
  statusColor: string;
  description: string;
  tech: string[];
  link: string;
  iconBg: string;
  iconSymbol: React.ReactNode;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'call-break',
    title: 'Call Break',
    subtitle: 'A modern Call Break game for iOS',
    category: 'iOS',
    status: 'In Progress',
    statusColor: '#a855f7',
    description:
      'Multiplayer-ready trick-taking card game crafted with Swift, SwiftUI, and smooth physics animations.',
    tech: ['Swift', 'SwiftUI', 'GameKit', 'iOS'],
    link: 'https://github.com/Rudralization',
    iconBg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)',
    iconSymbol: (
      <svg viewBox="0 0 32 32" width="30" height="30">
        <path
          d="M16 4C11 10.5 6 14.2 6 19a5.5 5.5 0 0 0 8.2 4.8L12.5 28h7l-1.7-4.2A5.5 5.5 0 0 0 26 19c0-4.8-5-8.5-10-15Z"
          fill="#1a1033"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="1.3"
        />
      </svg>
    ),
  },
  {
    id: 'macos-portfolio',
    title: 'macOS Liquid Glass OS',
    subtitle: 'Interactive desktop portfolio with Liquid Glass',
    category: 'Web',
    status: 'Live',
    statusColor: '#22c55e',
    description:
      'Apple-inspired Liquid Glass desktop environment featuring refractive surfaces, interactive dock, and 3D flip profile card.',
    tech: ['React', 'TypeScript', 'Liquid Glass', 'Vite'],
    link: 'https://rudralization.github.io/website/',
    iconBg: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
    iconSymbol: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'rudra-beats',
    title: 'Rudra Rap & Audio Lab',
    subtitle: 'Original rap lyrics, beats & visualizers',
    category: 'Creative',
    status: 'Active',
    statusColor: '#f59e0b',
    description:
      'Creative hub for Nepali & English hip-hop storytelling, vocal production, and visual aesthetics.',
    tech: ['Audio', 'Lyrics', 'Web Audio API', 'Motion'],
    link: 'https://www.youtube.com/@rudralization',
    iconBg: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    iconSymbol: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: 'swift-ui-kit',
    title: 'GlassUI Components',
    subtitle: 'Reusable glassmorphic layouts & micro-interactions',
    category: 'Web',
    status: 'Open Source',
    statusColor: '#38bdf8',
    description:
      'High-craft UI experiments blending tactile spring physics, SVG refraction filters, and clean typography.',
    tech: ['TypeScript', 'CSS Shaders', 'React', 'Figma'],
    link: 'https://github.com/Rudralization/website',
    iconBg: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
    iconSymbol: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" strokeWidth="2.2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [classicCardOpen, setClassicCardOpen] = useState<boolean>(false);
  const [classicCardFlipped, setClassicCardFlipped] = useState<boolean>(false);
  const [spotlightOpen, setSpotlightOpen] = useState<boolean>(false);
  const [controlCenterOpen, setControlCenterOpen] = useState<boolean>(false);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [projectFilterIndex, setProjectFilterIndex] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(92);
  const [volume, setVolume] = useState<number>(76);
  const [musicProgress, setMusicProgress] = useState<number>(42);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [clockText, setClockText] = useState<string>('Sun Nov 2  9:41 PM');
  const [terminalLines, setTerminalLines] = useState<Array<{ cmd?: string; out: string }>>([
    {
      out: 'Welcome to SunilOS (Liquid Glass Edition) — Type "help", "about", "skills", "card", or "clear".',
    },
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
      const month = now.toLocaleDateString('en-US', { month: 'short' });
      const day = now.getDate();
      const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setClockText(`${weekday} ${month} ${day}  ${time}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  const navItems: Array<{ id: SectionId; label: string; icon: React.ReactNode }> = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 3.2 3 10.5V20a1 1 0 0 0 1 1h5.5v-6h5v6H20a1 1 0 0 0 1-1v-9.5L12 3.2Z" />
        </svg>
      ),
    },
    {
      id: 'about',
      label: 'About',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5H4Z" />
        </svg>
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M3 6a2 2 0 0 1 2-2h4.2l2 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" />
        </svg>
      ),
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M9 4h6a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Zm0 3h6V6H9v1Z" />
        </svg>
      ),
    },
    {
      id: 'music',
      label: 'Music / Creative',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M9 17.5a2.5 2.5 0 1 1-2-2.45V6.5l11-2v8.55a2.5 2.5 0 1 1-2-2.45V7.9L9 9.2v8.3Z" />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M21.5 3.5 2.8 11.1c-.8.3-.8 1.4 0 1.7l4.7 1.8 1.9 5.3c.3.8 1.3.9 1.8.2l2.8-3.4 4.8 3.5c.6.4 1.5.1 1.7-.7l2.2-14.8c.1-.8-.5-1.5-1.2-1.2ZM9.2 14.2l8.6-6.9-6.9 8.2-.4 3-1.3-4.3Z" />
        </svg>
      ),
    },
  ];

  const filterCategories = ['All', 'iOS', 'Web', 'Creative'] as const;
  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCat =
      projectFilterIndex === 0 || p.category === filterCategories[projectFilterIndex];
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = terminalInput.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    let out = '';
    if (cmd === 'help') {
      out = 'Available commands: about, skills, projects, card, social, clear';
    } else if (cmd === 'about') {
      out =
        "Sunil Aryal (रुद्र.) — Passionate Programmer, iOS & Web Developer, Rapper & Creator.";
    } else if (cmd === 'skills') {
      out = 'Tech Stack: Apple/iOS, Swift, SwiftUI, React, TypeScript, JavaScript, Python, Git, Figma, VS Code.';
    } else if (cmd === 'projects') {
      out = '1. Call Break (iOS)  2. macOS Liquid Glass Portfolio  3. Rudra Rap & Audio Lab';
    } else if (cmd === 'card') {
      out = 'Opening Original 3D Flip Profile Card...';
      setClassicCardOpen(true);
    } else if (cmd === 'social') {
      out = 'GitHub: @Rudralization | Instagram: @rudralization | YouTube: @rudralization';
    } else if (cmd === 'clear') {
      setTerminalLines([]);
      setTerminalInput('');
      return;
    } else {
      out = `zsh: command not found: ${raw}. Type "help" for available commands.`;
    }
    setTerminalLines((prev) => [...prev, { cmd: raw, out }]);
    setTerminalInput('');
  };

  return (
    <LiquidGlassFilter>
      <div
        className={`macos-desktop ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}
        style={{ filter: `brightness(${0.55 + (brightness / 100) * 0.45})` }}
      >
        {/* Background Mountain Twilight Wallpaper */}
        <div
          className="wallpaper-layer"
          style={{ backgroundImage: "url('./assets/img/mountain-twilight.jpg')" }}
        />
        <div className="wallpaper-vignette" />

        {/* Hidden SVG Morphing ClipPath from Sunil's Original Website for the Classic 3D Profile Card */}
        <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
          <defs>
            <clipPath id="blobClip" clipPathUnits="objectBoundingBox">
              <path d="M0.85,0.2C0.95,0.35,0.92,0.58,0.82,0.75C0.72,0.92,0.52,1,0.33,0.95C0.14,0.9,0,0.72,0,0.5C0,0.28,0.14,0.08,0.35,0.03C0.56,-0.02,0.75,0.05,0.85,0.2Z">
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M0.85,0.2C0.95,0.35,0.92,0.58,0.82,0.75C0.72,0.92,0.52,1,0.33,0.95C0.14,0.9,0,0.72,0,0.5C0,0.28,0.14,0.08,0.35,0.03C0.56,-0.02,0.75,0.05,0.85,0.2Z;
                    M0.82,0.15C0.96,0.3,0.98,0.55,0.87,0.76C0.76,0.97,0.5,0.98,0.29,0.91C0.08,0.84,-0.02,0.65,0.03,0.43C0.08,0.21,0.24,0.04,0.46,0.01C0.68,-0.02,0.68,0,0.82,0.15Z;
                    M0.85,0.2C0.95,0.35,0.92,0.58,0.82,0.75C0.72,0.92,0.52,1,0.33,0.95C0.14,0.9,0,0.72,0,0.5C0,0.28,0.14,0.08,0.35,0.03C0.56,-0.02,0.75,0.05,0.85,0.2Z
                  "
                />
              </path>
            </clipPath>
          </defs>
        </svg>

        {/* Top macOS Menu Bar */}
        <header className="macos-menubar">
          <div className="menubar-left">
            <button
              className="menubar-item apple-logo-btn"
              onClick={() => setActiveSection('home')}
              title="Sunil Aryal macOS"
            >
              <svg viewBox="0 0 170 170" width="14" height="14" fill="currentColor">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.61-7.82-11.77-14.37-5.93-9.28-10.72-20.03-14.38-32.27-3.66-12.24-5.49-23.29-5.49-33.15 0-12.71 3.16-23.16 9.48-31.34 6.32-8.18 14.29-12.42 23.91-12.71 4.69 0 9.84 1.38 15.44 4.12 5.59 2.75 9.18 4.18 10.75 4.29 1.23 0 5.15-1.66 11.75-4.98 6.6-3.32 12.19-4.75 16.77-4.29 12.41 1 21.74 5.89 27.99 14.68-11.07 6.75-16.49 16.19-16.27 28.32.22 9.5 3.74 17.42 10.56 23.77 4.7 4.46 10.34 7.35 16.94 8.67-1.36 4.12-2.92 8.21-4.69 12.27ZM119.22 31.08c0 7.44-2.72 14.38-8.15 20.82-6.55 7.67-14.48 12.13-23.09 11.44-.11-.91-.17-1.89-.17-2.92 0-7.15 3.11-14.82 8.64-21.11 2.76-3.17 6.27-5.8 10.53-7.89 4.25-2.09 8.28-3.25 12.08-3.49.11 1.09.16 2.14.16 3.15Z" />
              </svg>
            </button>
            <button className="menubar-item menubar-bold" onClick={() => setActiveSection('home')}>
              Finder
            </button>
            <button className="menubar-item" onClick={() => setActiveSection('projects')}>
              File
            </button>
            <button className="menubar-item" onClick={() => setActiveSection('about')}>
              Edit
            </button>
            <button className="menubar-item" onClick={() => setClassicCardOpen(true)}>
              View
            </button>
            <button className="menubar-item" onClick={() => setActiveSection('experience')}>
              Go
            </button>
            <button className="menubar-item" onClick={() => setTerminalOpen(true)}>
              Window
            </button>
            <button className="menubar-item" onClick={() => setActiveSection('contact')}>
              Help
            </button>
          </div>

          <div className="menubar-right">
            {/* Wi-Fi */}
            <button
              className="menubar-icon-btn"
              title="Wi-Fi: Connected"
              onClick={() => setControlCenterOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 8.82a15 15 0 0 1 20 0" />
                <path d="M5 12.859a10 10 0 0 1 14 0" />
                <path d="M8.5 16.429a5 5 0 0 1 7 0" />
                <circle cx="12" cy="20" r="1" fill="currentColor" />
              </svg>
            </button>

            {/* Search / Spotlight */}
            <button
              className="menubar-icon-btn"
              title="Spotlight Search"
              onClick={() => setSpotlightOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7" />
                <line x1="20" y1="20" x2="16.2" y2="16.2" />
              </svg>
            </button>

            {/* Control Center */}
            <button
              className="menubar-icon-btn"
              title="Control Center"
              onClick={() => setControlCenterOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M7.5 4h9A4.5 4.5 0 0 1 21 8.5v0A4.5 4.5 0 0 1 16.5 13h-9A4.5 4.5 0 0 1 3 8.5v0A4.5 4.5 0 0 1 7.5 4Zm9 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.5 14h9a3.5 3.5 0 1 1 0 7h-9a3.5 3.5 0 1 1 0-7Zm0 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
              </svg>
            </button>

            {/* Classic Card / Notification Center icon */}
            <button
              className="menubar-icon-btn"
              title="Open Classic 3D Profile Card"
              onClick={() => setClassicCardOpen(true)}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <line x1="8" y1="9" x2="16" y2="9" />
                <line x1="8" y1="14" x2="13" y2="14" />
              </svg>
            </button>

            <span className="menubar-clock">{clockText}</span>
          </div>
        </header>

        {/* Spotlight Search Popover using GlassInput */}
        {spotlightOpen && (
          <div className="spotlight-overlay" onClick={() => setSpotlightOpen(false)}>
            <div className="spotlight-box" onClick={(e) => e.stopPropagation()}>
              <GlassCard intensity={7} padding="14px 18px" radius="22px">
                <GlassInput
                  type="search"
                  placeholder="Search Sunil's projects, skills, or type 'card'..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.toLowerCase().includes('card')) {
                      setClassicCardOpen(true);
                    }
                  }}
                  onClear={() => setSearchQuery('')}
                  autoFocus
                />
                {searchQuery && (
                  <div className="spotlight-results">
                    {filteredProjects.map((proj) => (
                      <button
                        key={proj.id}
                        className="spotlight-result-item"
                        onClick={() => {
                          setActiveSection('projects');
                          setSpotlightOpen(false);
                        }}
                      >
                        <span className="spotlight-res-title">{proj.title}</span>
                        <span className="spotlight-res-sub">{proj.subtitle}</span>
                      </button>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        )}

        {/* Control Center Popover using GlassCard, GlassSlider (showThumb={false}), and GlassSwitch */}
        {controlCenterOpen && (
          <div className="control-center-popover">
            <GlassCard intensity={8} padding="16px" radius="24px">
              <div className="cc-header">
                <span>Control Center</span>
                <div className="cc-theme-row">
                  <span>Dark Mode</span>
                  <GlassSwitch
                    checked={theme === 'dark'}
                    onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    tint="#8b5cf6"
                  />
                </div>
              </div>
              <div className="cc-slider-group">
                <div className="cc-label">Display Brightness</div>
                <GlassSlider
                  value={brightness}
                  min={35}
                  max={100}
                  showThumb={false}
                  label="Display"
                  onChange={setBrightness}
                />
              </div>
              <div className="cc-slider-group">
                <div className="cc-label">Sound Volume</div>
                <GlassSlider
                  value={volume}
                  min={0}
                  max={100}
                  showThumb={false}
                  label="Sound"
                  onChange={setVolume}
                />
              </div>
            </GlassCard>
          </div>
        )}

        {/* Main Centered Liquid Glass Window */}
        <main className="desktop-stage">
          <GlassCard
            className="main-glass-window"
            variant="clear"
            intensity={6}
            thickness={2}
            padding="0px"
            radius="26px"
          >
            <div className="window-split-layout">
              {/* Left Glass Sidebar */}
              <aside className="window-sidebar">
                <div className="window-traffic-lights">
                  <button
                    className="traffic-dot dot-close"
                    title="Close / Reset to Home"
                    onClick={() => setActiveSection('home')}
                  />
                  <button
                    className="traffic-dot dot-min"
                    title="Minimize / Classic Card"
                    onClick={() => setClassicCardOpen(true)}
                  />
                  <button
                    className="traffic-dot dot-max"
                    title="Toggle Theme"
                    onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                  />
                </div>

                {/* SA Monogram Logo + Sunil Aryal */}
                <div className="sidebar-brand" onClick={() => setActiveSection('home')}>
                  <div className="sa-monogram">
                    <svg viewBox="0 0 120 74" width="68" height="44">
                      <defs>
                        <linearGradient id="purpleStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                      {/* Stylized S and A monogram matching mockup */}
                      <path
                        d="M46 16 C32 10, 17 22, 27 33 C37 43, 47 47, 36 58 C27 66, 15 61, 16 52"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M44 58 L69 14 L82 58"
                        fill="none"
                        stroke="url(#purpleStroke)"
                        strokeWidth="3.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M35 41 Q66 37 96 40"
                        fill="none"
                        stroke="url(#purpleStroke)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="sidebar-brand-name">Sunil Aryal</div>
                </div>

                {/* Vertical Navigation Items */}
                <nav className="sidebar-nav" aria-label="Main Portfolio Navigation">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveSection(item.id)}
                      >
                        <span className="sidebar-nav-icon">{item.icon}</span>
                        <span className="sidebar-nav-label">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Bottom Theme Capsule + Footer */}
                <div className="sidebar-footer">
                  <div className="theme-toggle-capsule">
                    <span className="theme-icon" title="Light Mode">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                      </svg>
                    </span>
                    <GlassSwitch
                      checked={theme === 'dark'}
                      onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                      tint="#8b5cf6"
                      aria-label="Toggle dark mode"
                    />
                    <span className="theme-icon" title="Dark Mode">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                      </svg>
                    </span>
                  </div>
                  <div className="built-by-text">
                    Built with <span className="heart-red">❤️</span> by Sunil
                  </div>
                </div>
              </aside>

              {/* Right Main Window Content Area */}
              <section className="window-content">
                {activeSection === 'home' && (
                  <div className="home-dashboard">
                    {/* Top Row: Left Hero + Right Floating Profile Glass Card */}
                    <div className="home-top-row">
                      <div className="hero-column">
                        <div className="status-pill">
                          <span className="status-dot" />
                          <span>Available for work</span>
                        </div>

                        <h1 className="hero-title">
                          Hello, I&apos;m <span className="hero-name-accent">Sunil.</span>
                        </h1>

                        <h2 className="hero-subtitle">Developer. Creator. Dreamer.</h2>

                        <p className="hero-description">
                          Building digital experiences, exploring technology
                          <br />
                          and creating things that matter.
                        </p>

                        <div className="hero-cta-row">
                          <GlassButton
                            variant="filled"
                            tint="#7c3aed"
                            size="md"
                            className="cta-explore-btn"
                            onClick={() => setActiveSection('projects')}
                          >
                            <span className="cta-btn-inner">
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M13.5 2c-3.6 1.1-6.5 4-7.6 7.6L3 11l3.5 3.5L10 18l1.4-2.9c3.6-1.1 6.5-4 7.6-7.6.6-2 .8-4.2.5-5.5-1.3-.3-3.5-.1-5.5.5ZM5.2 16.3c-1.1 1.1-1.7 3.7-1.7 3.7s2.6-.6 3.7-1.7c.7-.7.7-1.9 0-2.6-.7-.7-1.9-.7-2 0Z" />
                              </svg>
                              <span>Explore My Work</span>
                              <span className="cta-arrow">→</span>
                            </span>
                          </GlassButton>

                          <GlassButton
                            variant="glass"
                            size="md"
                            className="cta-about-btn"
                            onClick={() => setActiveSection('about')}
                          >
                            About Me
                          </GlassButton>
                        </div>
                      </div>

                      {/* Top-Right Floating Profile GlassCard */}
                      <GlassCard
                        className="floating-profile-card"
                        variant="regular"
                        intensity={6}
                        padding="20px 18px 16px"
                        radius="24px"
                      >
                        <button
                          className="profile-card-dots"
                          title="Open Original 3D Flip Profile Card"
                          onClick={() => setClassicCardOpen(true)}
                        >
                          <span />
                          <span />
                          <span />
                        </button>

                        <div
                          className="profile-avatar-ring"
                          onClick={() => setClassicCardOpen(true)}
                          title="Click to view Classic 3D Flip Card"
                        >
                          <img
                            src="./assets/img/avatar-anime.jpg"
                            alt="Sunil Aryal"
                            className="profile-avatar-img"
                          />
                        </div>

                        <h3 className="profile-card-name">Sunil Aryal</h3>
                        <p className="profile-card-role">Developer &amp; Creator</p>

                        <div className="profile-stats-row">
                          <div className="profile-stat">
                            <span className="stat-num">12+</span>
                            <span className="stat-lbl">Projects</span>
                          </div>
                          <div className="profile-stat-divider" />
                          <div className="profile-stat">
                            <span className="stat-num">1.5K+</span>
                            <span className="stat-lbl">Views</span>
                          </div>
                          <div className="profile-stat-divider" />
                          <div className="profile-stat">
                            <span className="stat-num">100%</span>
                            <span className="stat-lbl">Focus</span>
                          </div>
                        </div>

                        <div className="profile-quote-box">
                          <span className="quote-mark">❝</span>
                          <div className="quote-content">
                            <p className="quote-text">&ldquo;Dream big, code better.&rdquo;</p>
                            <span className="quote-author">— Sunil</span>
                          </div>
                        </div>

                        <div className="profile-socials-row">
                          <a
                            href="https://www.instagram.com/rudralization/"
                            target="_blank"
                            rel="noreferrer"
                            className="social-circle social-ig"
                            title="Instagram @rudralization"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="5" />
                              <circle cx="12" cy="12" r="4" />
                              <circle cx="17.5" cy="6.5" r="1" fill="#fff" />
                            </svg>
                          </a>
                          <a
                            href="https://github.com/Rudralization"
                            target="_blank"
                            rel="noreferrer"
                            className="social-circle social-gh"
                            title="GitHub @Rudralization"
                          >
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff">
                              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                            </svg>
                          </a>
                          <a
                            href="mailto:aryalsunil699@gmail.com"
                            className="social-circle social-mail"
                            title="Email Sunil"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff">
                              <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 6.2L19.6 7H4.4L12 11.2Zm0 2.1L4 8.8V17h16V8.8l-8 4.5Z" />
                            </svg>
                          </a>
                          <a
                            href="https://wa.me/?text=Hello%20Sunil"
                            target="_blank"
                            rel="noreferrer"
                            className="social-circle social-wa"
                            title="WhatsApp"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff">
                              <path d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.8 5-1.3A9.9 9.9 0 1 0 12 2Zm5.4 14c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.8-.1a16.4 16.4 0 0 1-6.5-5.7c-.8-1.1-1.3-2.4-1.3-3.5 0-1.1.6-1.7.9-2 .3-.3.6-.3.8-.3h.6c.2 0 .5-.1.7.5.3.6.9 2.1 1 2.3.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.4.5c-.2.2-.3.4-.1.7.2.3 1 1.6 2.1 2.6 1.5 1.3 2.7 1.7 3 1.9.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.8.8 2.1 1 .3.2.5.2.6.4.1.1.1.7-.1 1.3Z" />
                            </svg>
                          </a>
                          <a
                            href="https://www.youtube.com/@rudralization"
                            target="_blank"
                            rel="noreferrer"
                            className="social-circle social-yt"
                            title="YouTube @rudralization"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff">
                              <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9C2 8.9 2 12 2 12s0 3.1.4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.3 7.7.3 7.7.3s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
                            </svg>
                          </a>
                        </div>
                      </GlassCard>
                    </div>

                    {/* Middle Row: 4 Quick Category GlassCards */}
                    <div className="quick-cards-row">
                      <GlassCard
                        className="quick-nav-card"
                        intensity={5}
                        padding="14px 16px"
                        radius="18px"
                        onClick={() => setActiveSection('projects')}
                      >
                        <div className="quick-card-icon">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#9d6cff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                            <line x1="14" y1="4" x2="10" y2="20" />
                          </svg>
                        </div>
                        <div className="quick-card-text">
                          <div className="quick-card-title">Projects</div>
                          <div className="quick-card-sub">Things I&apos;ve built</div>
                        </div>
                        <span className="quick-card-arrow">→</span>
                      </GlassCard>

                      <GlassCard
                        className="quick-nav-card"
                        intensity={5}
                        padding="14px 16px"
                        radius="18px"
                        onClick={() => setActiveSection('about')}
                      >
                        <div className="quick-card-icon">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="#9d6cff">
                            <circle cx="12" cy="8" r="4.2" />
                            <path d="M4.5 20c0-4 3.4-6.8 7.5-6.8s7.5 2.8 7.5 6.8h-15Z" />
                          </svg>
                        </div>
                        <div className="quick-card-text">
                          <div className="quick-card-title">About</div>
                          <div className="quick-card-sub">My journey</div>
                        </div>
                        <span className="quick-card-arrow">→</span>
                      </GlassCard>

                      <GlassCard
                        className="quick-nav-card"
                        intensity={5}
                        padding="14px 16px"
                        radius="18px"
                        onClick={() => setActiveSection('music')}
                      >
                        <div className="quick-card-icon">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="#9d6cff">
                            <path d="M9 17.5a2.8 2.8 0 1 1-2-2.68V6.2l12-2.2v9.82a2.8 2.8 0 1 1-2-2.68V7.6L9 9.1v8.4Z" />
                          </svg>
                        </div>
                        <div className="quick-card-text">
                          <div className="quick-card-title">Music</div>
                          <div className="quick-card-sub">My creative side</div>
                        </div>
                        <span className="quick-card-arrow">→</span>
                      </GlassCard>

                      <GlassCard
                        className="quick-nav-card"
                        intensity={5}
                        padding="14px 16px"
                        radius="18px"
                        onClick={() => setActiveSection('experience')}
                      >
                        <div className="quick-card-icon">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="#9d6cff">
                            <path d="M9 4h6a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Zm0 3h6V6H9v1Z" />
                          </svg>
                        </div>
                        <div className="quick-card-text">
                          <div className="quick-card-title">Experience</div>
                          <div className="quick-card-sub">Skills &amp; journey</div>
                        </div>
                        <span className="quick-card-arrow">→</span>
                      </GlassCard>
                    </div>

                    {/* Bottom Row: 3 Bento GlassCards (About Me, Tech Stack, Recent Project) */}
                    <div className="bento-bottom-row">
                      {/* 1. About Me Card */}
                      <GlassCard
                        className="bento-about-card"
                        intensity={5}
                        padding="18px"
                        radius="20px"
                      >
                        <div className="bento-about-inner">
                          <div className="bento-about-left">
                            <h3 className="bento-heading">About Me</h3>
                            <p className="bento-about-copy">
                              I&apos;m Sunil Aryal, a passionate developer, rapper, and lifelong
                              learner. I love turning ideas into beautiful and functional products.
                            </p>
                            <GlassButton
                              variant="glass"
                              size="sm"
                              className="know-more-btn"
                              onClick={() => setActiveSection('about')}
                            >
                              Know More →
                            </GlassButton>
                          </div>
                          <div className="bento-about-photo-wrap">
                            <img
                              src="./assets/img/about-hoodie.jpg"
                              alt="Sunil overlooking city skyline"
                              className="bento-about-photo"
                            />
                          </div>
                        </div>
                      </GlassCard>

                      {/* 2. Tech Stack Card */}
                      <GlassCard
                        className="bento-tech-card"
                        intensity={5}
                        padding="18px"
                        radius="20px"
                      >
                        <h3 className="bento-heading">Tech Stack</h3>
                        <div className="tech-icons-grid">
                          {/* Apple */}
                          <div className="tech-icon-item" title="Apple / macOS / iOS">
                            <svg viewBox="0 0 170 170" width="24" height="24" fill="#fff">
                              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.61-7.82-11.77-14.37-5.93-9.28-10.72-20.03-14.38-32.27-3.66-12.24-5.49-23.29-5.49-33.15 0-12.71 3.16-23.16 9.48-31.34 6.32-8.18 14.29-12.42 23.91-12.71 4.69 0 9.84 1.38 15.44 4.12 5.59 2.75 9.18 4.18 10.75 4.29 1.23 0 5.15-1.66 11.75-4.98 6.6-3.32 12.19-4.75 16.77-4.29 12.41 1 21.74 5.89 27.99 14.68-11.07 6.75-16.49 16.19-16.27 28.32.22 9.5 3.74 17.42 10.56 23.77 4.7 4.46 10.34 7.35 16.94 8.67-1.36 4.12-2.92 8.21-4.69 12.27ZM119.22 31.08c0 7.44-2.72 14.38-8.15 20.82-6.55 7.67-14.48 12.13-23.09 11.44-.11-.91-.17-1.89-.17-2.92 0-7.15 3.11-14.82 8.64-21.11 2.76-3.17 6.27-5.8 10.53-7.89 4.25-2.09 8.28-3.25 12.08-3.49.11 1.09.16 2.14.16 3.15Z" />
                            </svg>
                          </div>
                          {/* Swift */}
                          <div className="tech-icon-item" title="Swift">
                            <div className="swift-badge">
                              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
                                <path d="M20.2 15.4c.1-.5.2-1.1.2-1.7 0-3.8-2.6-7.6-6.5-9.7 1.7 2.3 2.5 5 2.1 7.4-2-1.5-4.7-3.6-7.4-6.2.9 1.9 2.3 3.8 4 5.4-1.8-1-4.1-2.7-6.3-4.8 1.5 2.8 4.1 5.6 7.2 7.2-2.3.5-5.1.1-7.8-1.4 2.2 3.1 6 4.9 9.8 4.9 2.1 0 4-.6 5.5-1.7 1.1.6 2.1 1.6 2.4 2.6.2-1.5-.6-3-3.2-2Z" />
                              </svg>
                            </div>
                          </div>
                          {/* React */}
                          <div className="tech-icon-item" title="React">
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#38bdf8" strokeWidth="1.6">
                              <circle cx="12" cy="12" r="2.1" fill="#38bdf8" />
                              <ellipse cx="12" cy="12" rx="10" ry="4.2" />
                              <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
                              <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
                            </svg>
                          </div>
                          {/* JavaScript */}
                          <div className="tech-icon-item" title="JavaScript">
                            <div className="js-badge">JS</div>
                          </div>
                          {/* Python */}
                          <div className="tech-icon-item" title="Python">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                              <path
                                d="M11.9 2C8.7 2 9 3.4 9 3.4V5h3v.6H6.5S4 5.3 4 8.6c0 3.3 2.2 3.2 2.2 3.2h1.3v-1.6s-.1-2.2 2.1-2.2h3.7s2 .1 2-1.9V3.8S15.6 2 11.9 2Z"
                                fill="#387eb8"
                              />
                              <path
                                d="M12.1 22c3.2 0 2.9-1.4 2.9-1.4V19h-3v-.6h5.5S20 18.7 20 15.4c0-3.3-2.2-3.2-2.2-3.2h-1.3v1.6s.1 2.2-2.1 2.2H10.7s-2-.1-2 1.9v2.3S8.4 22 12.1 22Z"
                                fill="#ffe052"
                              />
                            </svg>
                          </div>
                          {/* Git */}
                          <div className="tech-icon-item" title="Git">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                              <path
                                d="M21.6 11.1 12.9 2.4a1.3 1.3 0 0 0-1.8 0L9.3 4.2l2.3 2.3a1.6 1.6 0 0 1 2 2l2.2 2.2a1.6 1.6 0 1 1-1 1l-2-2v5.3a1.6 1.6 0 1 1-1.3-.1V9.5a1.6 1.6 0 0 1-.9-2.1L8.3 5.1 2.4 11.1a1.3 1.3 0 0 0 0 1.8l8.7 8.7a1.3 1.3 0 0 0 1.8 0l8.7-8.7a1.3 1.3 0 0 0 0-1.8Z"
                                fill="#f05032"
                              />
                            </svg>
                          </div>
                          {/* Figma */}
                          <div className="tech-icon-item" title="Figma">
                            <svg viewBox="0 0 24 24" width="22" height="22">
                              <path d="M8.5 2h3.5v7H8.5a3.5 3.5 0 1 1 0-7Z" fill="#f24e1e" />
                              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Z" fill="#ff7262" />
                              <circle cx="15.5" cy="12.5" r="3.5" fill="#1abcfe" />
                              <path d="M8.5 9H12v7H8.5a3.5 3.5 0 1 1 0-7Z" fill="#a259ff" />
                              <path d="M8.5 16H12v3.5a3.5 3.5 0 1 1-3.5-3.5Z" fill="#0acf83" />
                            </svg>
                          </div>
                          {/* VS Code */}
                          <div className="tech-icon-item" title="VS Code">
                            <svg viewBox="0 0 24 24" width="23" height="23" fill="#22a7f2">
                              <path d="M17.5 2 7.2 10.4 3.2 7.3 1.5 8.2v7.6l1.7.9 4-3.1L17.5 22l5-2.4V4.4L17.5 2Zm0 4.8v10.4L10.3 12l7.2-5.2Z" />
                            </svg>
                          </div>
                          <span className="tech-more-text">and more...</span>
                        </div>
                      </GlassCard>

                      {/* 3. Recent Project Card */}
                      <GlassCard
                        className="bento-recent-card"
                        intensity={5}
                        padding="18px"
                        radius="20px"
                      >
                        <div className="recent-card-header">
                          <h3 className="bento-heading">Recent Project</h3>
                          <button
                            className="view-all-link"
                            onClick={() => setActiveSection('projects')}
                          >
                            View All →
                          </button>
                        </div>

                        <div
                          className="recent-project-body"
                          onClick={() => setActiveSection('projects')}
                        >
                          <div className="callbreak-app-icon">
                            <svg viewBox="0 0 36 36" width="36" height="36">
                              <path
                                d="M18 5C12.2 12 6.8 16.2 6.8 21.4a6.2 6.2 0 0 0 9.2 5.4L14 31.5h8l-2-4.7a6.2 6.2 0 0 0 9.2-5.4C29.2 16.2 23.8 12 18 5Z"
                                fill="#1b1338"
                                stroke="rgba(255,255,255,0.65)"
                                strokeWidth="1.4"
                              />
                            </svg>
                          </div>
                          <div className="recent-project-info">
                            <div className="recent-project-name">Call Break</div>
                            <div className="recent-project-desc">
                              A modern Call Break
                              <br />
                              game for iOS
                            </div>
                            <div className="recent-project-status">
                              <span className="purple-status-dot" />
                              <span>In Progress</span>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                )}

                {/* PROJECTS SECTION */}
                {activeSection === 'projects' && (
                  <div className="subview-container">
                    <div className="subview-header">
                      <div>
                        <h2 className="subview-title">Projects &amp; Creations</h2>
                        <p className="subview-subtitle">
                          Apps, interfaces, and creative experiments built by Sunil Aryal
                        </p>
                      </div>
                      <div className="subview-controls">
                        <GlassSegmented
                          options={['All', 'iOS', 'Web', 'Creative']}
                          value={projectFilterIndex}
                          onChange={setProjectFilterIndex}
                          size="sm"
                        />
                      </div>
                    </div>

                    <div className="subview-search-row">
                      <GlassInput
                        type="search"
                        placeholder="Filter projects by name or stack (e.g. Swift, React)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClear={() => setSearchQuery('')}
                      />
                    </div>

                    <div className="projects-grid">
                      {filteredProjects.map((project) => (
                        <GlassCard
                          key={project.id}
                          intensity={5}
                          padding="18px"
                          radius="20px"
                          className="project-detail-card"
                        >
                          <div className="proj-card-top">
                            <div
                              className="proj-card-icon"
                              style={{ background: project.iconBg }}
                            >
                              {project.iconSymbol}
                            </div>
                            <div className="proj-card-meta">
                              <h3 className="proj-card-title">{project.title}</h3>
                              <p className="proj-card-sub">{project.subtitle}</p>
                            </div>
                            <span
                              className="proj-status-pill"
                              style={{ borderColor: project.statusColor, color: project.statusColor }}
                            >
                              ● {project.status}
                            </span>
                          </div>
                          <p className="proj-card-desc">{project.description}</p>
                          <div className="proj-card-footer">
                            <div className="proj-tech-tags">
                              {project.tech.map((t) => (
                                <span key={t} className="proj-tech-tag">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <GlassButton
                              variant="tinted"
                              size="sm"
                              tint="#a855f7"
                              onClick={() => window.open(project.link, '_blank')}
                            >
                              Open →
                            </GlassButton>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                )}

                {/* ABOUT SECTION */}
                {activeSection === 'about' && (
                  <div className="subview-container">
                    <div className="subview-header">
                      <div>
                        <h2 className="subview-title">About Sunil Aryal (रुद्र.)</h2>
                        <p className="subview-subtitle">
                          Developer. Creator. Rapper. Lifelong Learner.
                        </p>
                      </div>
                      <GlassButton
                        variant="filled"
                        tint="#7c3aed"
                        size="sm"
                        onClick={() => setClassicCardOpen(true)}
                      >
                        View Classic 3D Profile Card
                      </GlassButton>
                    </div>

                    <div className="about-subview-grid">
                      <GlassCard intensity={5} padding="22px" radius="22px">
                        <h3 className="bento-heading">My Story</h3>
                        <p className="about-long-copy">
                          I&apos;m Sunil Aryal, a passionate programmer, web &amp; iOS developer,
                          and creative artist known online as <strong>@rudralization (रुद्र.)</strong>.
                          Whether I&apos;m crafting native Swift experiences like <em>Call Break</em>,
                          designing tactile Liquid Glass interfaces, or writing rap verses, I focus on
                          blending engineering precision with artistic soul.
                        </p>
                        <div className="about-Action-row">
                          <GlassButton
                            variant="glass"
                            size="sm"
                            onClick={() => setActiveSection('projects')}
                          >
                            See My Projects →
                          </GlassButton>
                          <GlassButton
                            variant="glass"
                            size="sm"
                            onClick={() => setClassicCardOpen(true)}
                          >
                            Flip Original Card ↻
                          </GlassButton>
                        </div>
                      </GlassCard>

                      <GlassCard intensity={5} padding="22px" radius="22px">
                        <h3 className="bento-heading">Core Focus Areas</h3>
                        <ul className="focus-list">
                          <li>
                            <strong>iOS &amp; Apple Ecosystem:</strong> Swift, SwiftUI, interactive
                            game mechanics, and fluid HIG-inspired interfaces.
                          </li>
                          <li>
                            <strong>Modern Web Engineering:</strong> React, TypeScript, CSS
                            refraction &amp; shaders, responsive design systems.
                          </li>
                          <li>
                            <strong>Music &amp; Storytelling:</strong> Hip-Hop songwriting, rhythmic
                            flow, and visual direction.
                          </li>
                        </ul>
                      </GlassCard>
                    </div>
                  </div>
                )}

                {/* EXPERIENCE SECTION */}
                {activeSection === 'experience' && (
                  <div className="subview-container">
                    <div className="subview-header">
                      <div>
                        <h2 className="subview-title">Experience &amp; Skills</h2>
                        <p className="subview-subtitle">
                          My technical timeline and engineering toolkit
                        </p>
                      </div>
                    </div>

                    <div className="experience-timeline">
                      <GlassCard intensity={5} padding="18px 22px" radius="20px">
                        <div className="exp-item-head">
                          <h4>Independent iOS &amp; Full-Stack Developer</h4>
                          <span className="exp-badge">2023 — Present</span>
                        </div>
                        <p className="exp-desc">
                          Designing and building iOS games (Call Break) and high-craft web
                          applications with Swift, React, TypeScript, and modern UI frameworks.
                        </p>
                      </GlassCard>

                      <GlassCard intensity={5} padding="18px 22px" radius="20px">
                        <div className="exp-item-head">
                          <h4>Web Developer &amp; UI Creator (@rudralization)</h4>
                          <span className="exp-badge">2021 — Present</span>
                        </div>
                        <p className="exp-desc">
                          Built interactive web portfolios, open-source components, and digital
                          experiences with 12+ shipped projects and 1.5K+ community views.
                        </p>
                      </GlassCard>
                    </div>
                  </div>
                )}

                {/* MUSIC / CREATIVE SECTION */}
                {activeSection === 'music' && (
                  <div className="subview-container">
                    <div className="subview-header">
                      <div>
                        <h2 className="subview-title">Music &amp; Creative Studio</h2>
                        <p className="subview-subtitle">
                          Rap verses, late-night sessions, and sonic storytelling by Sunil
                        </p>
                      </div>
                    </div>

                    <GlassCard intensity={6} padding="24px" radius="24px" className="music-studio-card">
                      <div className="music-player-top">
                        <img
                          src="./assets/img/about-hoodie.jpg"
                          alt="Rudra Studio"
                          className="music-cover-art"
                        />
                        <div className="music-meta">
                          <span className="music-tag">ORIGINAL FREESTYLE • RUDRA</span>
                          <h3>Dream Big, Code Better (Late Night Cypher)</h3>
                          <p>Sunil Aryal (@rudralization)</p>
                        </div>
                        <GlassButton
                          variant="filled"
                          tint="#8b5cf6"
                          size="md"
                          onClick={() => setIsPlayingMusic((p) => !p)}
                        >
                          {isPlayingMusic ? '⏸ Pause' : '▶ Play Track'}
                        </GlassButton>
                      </div>

                      <div className="music-slider-wrap">
                        <div className="music-time-row">
                          <span>1:18</span>
                          <span>Track Scrub (Liquid Glass Slider)</span>
                          <span>3:12</span>
                        </div>
                        <GlassSlider
                          value={musicProgress}
                          min={0}
                          max={100}
                          tint="#a855f7"
                          onChange={setMusicProgress}
                        />
                      </div>
                    </GlassCard>
                  </div>
                )}

                {/* CONTACT SECTION */}
                {activeSection === 'contact' && (
                  <div className="subview-container">
                    <div className="subview-header">
                      <div>
                        <h2 className="subview-title">Get In Touch</h2>
                        <p className="subview-subtitle">
                          Available for collaborations, iOS/Web projects, and creative work
                        </p>
                      </div>
                    </div>

                    <div className="about-subview-grid">
                      <GlassCard intensity={5} padding="22px" radius="22px">
                        <h3 className="bento-heading">Direct Channels</h3>
                        <p className="about-long-copy">
                          Reach out anytime via email or social channels — or flip my classic
                          profile card for all <strong>@rudralization</strong> links.
                        </p>
                        <div className="contact-links-stack">
                          <a href="mailto:aryalsunil699@gmail.com" className="contact-row-link">
                            ✉️ aryalsunil699@gmail.com
                          </a>
                          <a
                            href="https://github.com/Rudralization"
                            target="_blank"
                            rel="noreferrer"
                            className="contact-row-link"
                          >
                            🐙 github.com/Rudralization
                          </a>
                          <a
                            href="https://www.instagram.com/rudralization/"
                            target="_blank"
                            rel="noreferrer"
                            className="contact-row-link"
                          >
                            📸 instagram.com/rudralization
                          </a>
                        </div>
                      </GlassCard>

                      <GlassCard intensity={5} padding="22px" radius="22px">
                        <h3 className="bento-heading">Quick Message</h3>
                        <div className="contact-form-stack">
                          <GlassInput placeholder="Your Name" />
                          <GlassInput placeholder="Your Email or Handle" />
                          <GlassButton
                            variant="filled"
                            tint="#7c3aed"
                            size="md"
                            onClick={() => {
                              window.location.href =
                                'mailto:aryalsunil699@gmail.com?subject=Hello%20Sunil!';
                            }}
                          >
                            Send Email →
                          </GlassButton>
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                )}

                {/* Compact Liquid Glass Tab Bar for Mobile / Quick Switching */}
                <div className="mobile-glass-nav">
                  <GlassNav
                    items={[
                      { label: 'Home' },
                      { label: 'About' },
                      { label: 'Projects' },
                      { label: 'Experience' },
                      { label: 'Music' },
                      { label: 'Contact' },
                    ]}
                    activeIndex={navItems.findIndex((i) => i.id === activeSection)}
                    onChange={(idx) => {
                      const target = navItems[idx];
                      if (target) setActiveSection(target.id);
                    }}
                  />
                </div>
              </section>
            </div>
          </GlassCard>
        </main>

        {/* Bottom Floating macOS Liquid Glass Dock */}
        <footer className="macos-dock-container">
          <GlassCard
            className="macos-dock-glass"
            variant="regular"
            intensity={7}
            thickness={2}
            padding="7px 14px"
            radius="24px"
          >
            <div className="dock-icons-row">
              {/* 1. Finder */}
              <button
                className={`dock-item ${activeSection === 'home' ? 'dock-active' : ''}`}
                title="Finder — Home"
                onClick={() => setActiveSection('home')}
              >
                <img src="./assets/icons/finder.png" alt="Finder" className="dock-img" />
                <span className="dock-dot" />
              </button>

              {/* 2. Safari */}
              <button
                className={`dock-item ${activeSection === 'projects' ? 'dock-active' : ''}`}
                title="Safari — Explore Projects"
                onClick={() => setActiveSection('projects')}
              >
                <div className="dock-svg-icon safari-icon">
                  <svg viewBox="0 0 64 64" width="42" height="42">
                    <defs>
                      <linearGradient id="safariGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                    </defs>
                    <rect width="64" height="64" rx="15" fill="#fff" />
                    <circle cx="32" cy="32" r="26" fill="url(#safariGrad)" />
                    <polygon points="32,12 37,32 32,29 27,32" fill="#ef4444" />
                    <polygon points="32,52 37,32 32,35 27,32" fill="#ffffff" />
                  </svg>
                </div>
              </button>

              {/* 3. Dedicated Profile Card Icon on Dock (Opens Exact Old 3D Flip Profile Card!) */}
              <button
                className={`dock-item dock-profile-trigger ${classicCardOpen ? 'dock-active' : ''}`}
                title="Sunil Aryal — Exact Original 3D Flip Profile Card"
                onClick={() => setClassicCardOpen((v) => !v)}
              >
                <div className="dock-profile-badge">
                  <img src="./assets/img/pro.png" alt="Sunil Profile Card" />
                </div>
                <span className="dock-dot" />
              </button>

              {/* 4. Instagram */}
              <a
                href="https://www.instagram.com/rudralization/"
                target="_blank"
                rel="noreferrer"
                className="dock-item"
                title="Instagram @rudralization"
              >
                <div className="dock-svg-icon ig-dock-icon">
                  <svg viewBox="0 0 64 64" width="42" height="42">
                    <defs>
                      <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <rect width="64" height="64" rx="15" fill="url(#igGrad)" />
                    <rect
                      x="14"
                      y="14"
                      width="36"
                      height="36"
                      rx="10"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="3.8"
                    />
                    <circle cx="32" cy="32" r="8.5" fill="none" stroke="#fff" strokeWidth="3.8" />
                    <circle cx="43" cy="21" r="2.4" fill="#fff" />
                  </svg>
                </div>
              </a>

              {/* 5. GitHub */}
              <a
                href="https://github.com/Rudralization"
                target="_blank"
                rel="noreferrer"
                className="dock-item"
                title="GitHub @Rudralization"
              >
                <div className="dock-svg-icon gh-dock-icon">
                  <svg viewBox="0 0 64 64" width="42" height="42">
                    <rect width="64" height="64" rx="15" fill="#18181b" />
                    <path
                      d="M32 12a20 20 0 0 0-6.32 38.98c1 .18 1.36-.44 1.36-.96v-3.4c-5.56 1.2-6.74-2.68-6.74-2.68-.9-2.32-2.22-2.94-2.22-2.94-1.82-1.24.14-1.22.14-1.22 2 .14 3.06 2.06 3.06 2.06 1.78 3.04 4.68 2.16 5.82 1.66.18-1.3.7-2.18 1.26-2.68-4.44-.5-9.12-2.22-9.12-9.88 0-2.18.78-3.96 2.06-5.36-.2-.5-.9-2.54.2-5.28 0 0 1.68-.54 5.5 2.04a19.16 19.16 0 0 1 10 0c3.82-2.58 5.5-2.04 5.5-2.04 1.1 2.74.4 4.78.2 5.28 1.28 1.4 2.06 3.18 2.06 5.36 0 7.68-4.68 9.36-9.14 9.86.72.62 1.36 1.84 1.36 3.7v5.5c0 .54.36 1.16 1.38.96A20 20 0 0 0 32 12Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </a>

              {/* 6. Mail */}
              <button
                className="dock-item"
                title="Mail — Contact Sunil"
                onClick={() => setActiveSection('contact')}
              >
                <img src="./assets/icons/mail.png" alt="Mail" className="dock-img" />
              </button>

              {/* 7. WhatsApp */}
              <a
                href="https://wa.me/?text=Hello%20Sunil"
                target="_blank"
                rel="noreferrer"
                className="dock-item"
                title="WhatsApp"
              >
                <div className="dock-svg-icon wa-dock-icon">
                  <svg viewBox="0 0 64 64" width="42" height="42">
                    <rect width="64" height="64" rx="15" fill="#22c55e" />
                    <path
                      d="M32 14a17.8 17.8 0 0 0-15.3 27l-2.3 8.6 9-2.3A17.8 17.8 0 1 0 32 14Zm9.7 25.2c-.4 1.1-2.3 2.1-3.2 2.3-.9.2-2 .2-3.2-.2a29.5 29.5 0 0 1-11.7-10.2c-1.4-2-2.3-4.3-2.3-6.3 0-2 1.1-3 1.6-3.6.5-.5 1.1-.5 1.4-.5h1.1c.4 0 .9-.2 1.3.9.5 1.1 1.6 3.8 1.8 4.1.2.4.2.7 0 1.1-.2.4-.4.7-.7 1.1l-.7.9c-.4.4-.5.7-.2 1.3.4.5 1.8 2.9 3.8 4.7 2.7 2.3 4.8 3 5.4 3.4.5.4.9.2 1.3-.2.4-.4 1.4-1.6 1.8-2.1.4-.5.7-.4 1.3-.2.5.2 3.2 1.4 3.8 1.8.5.4.9.4 1.1.7.2.2.2 1.3-.2 2.3Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </a>

              {/* 8. YouTube */}
              <a
                href="https://www.youtube.com/@rudralization"
                target="_blank"
                rel="noreferrer"
                className="dock-item"
                title="YouTube @rudralization"
              >
                <div className="dock-svg-icon yt-dock-icon">
                  <svg viewBox="0 0 64 64" width="42" height="42">
                    <rect width="64" height="64" rx="15" fill="#ef4444" />
                    <polygon points="26,21 26,43 44,32" fill="#fff" />
                  </svg>
                </div>
              </a>

              {/* 9. App Store */}
              <button
                className="dock-item"
                title="App Store — iOS & Web Projects"
                onClick={() => setActiveSection('projects')}
              >
                <div className="dock-svg-icon appstore-dock-icon">
                  <svg viewBox="0 0 64 64" width="42" height="42">
                    <defs>
                      <linearGradient id="asGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    <rect width="64" height="64" rx="15" fill="url(#asGrad)" />
                    <path
                      d="M32 16 19 44M32 16l13 28M22 37h20"
                      stroke="#fff"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </button>

              {/* 10. Settings */}
              <button
                className="dock-item"
                title="System Settings & Liquid Glass Control Center"
                onClick={() => setControlCenterOpen((v) => !v)}
              >
                <img src="./assets/icons/settings.png" alt="Settings" className="dock-img" />
              </button>

              {/* 11. Terminal */}
              <button
                className={`dock-item ${terminalOpen ? 'dock-active' : ''}`}
                title="Terminal"
                onClick={() => setTerminalOpen((v) => !v)}
              >
                <img src="./assets/icons/terminal.png" alt="Terminal" className="dock-img" />
              </button>

              {/* 12. VS Code */}
              <button
                className="dock-item"
                title="VS Code — Experience & Tech Stack"
                onClick={() => setActiveSection('experience')}
              >
                <div className="dock-svg-icon vscode-dock-icon">
                  <svg viewBox="0 0 64 64" width="42" height="42">
                    <rect width="64" height="64" rx="15" fill="#1e293b" />
                    <path
                      d="M44 13 23 30l-8-6.2-3.5 1.8v12.8l3.5 1.8 8-6.2L44 51l9-4.5v-29L44 13Zm0 9.6v18.8L30 32l14-9.4Z"
                      fill="#38bdf8"
                    />
                  </svg>
                </div>
              </button>

              <div className="dock-divider" />

              {/* 13. Trash / Bin */}
              <button
                className="dock-item"
                title="Trash"
                onClick={() => setActiveSection('home')}
              >
                <img src="./assets/icons/bin.png" alt="Trash" className="dock-img" />
              </button>
            </div>
          </GlassCard>
        </footer>

        {/* Interactive macOS Terminal Window */}
        {terminalOpen && (
          <div className="floating-terminal-overlay" onClick={() => setTerminalOpen(false)}>
            <div className="floating-terminal-window" onClick={(e) => e.stopPropagation()}>
              <GlassCard intensity={8} padding="0px" radius="18px">
                <div className="term-titlebar">
                  <div className="window-traffic-lights">
                    <button
                      className="traffic-dot dot-close"
                      onClick={() => setTerminalOpen(false)}
                    />
                    <button
                      className="traffic-dot dot-min"
                      onClick={() => setTerminalOpen(false)}
                    />
                    <button className="traffic-dot dot-max" />
                  </div>
                  <span className="term-title">sunil@macbook-pro — zsh</span>
                </div>
                <div className="term-body">
                  {terminalLines.map((line, i) => (
                    <div key={i} className="term-entry">
                      {line.cmd && (
                        <div className="term-cmd">
                          <span className="term-prompt">sunil@macbook-pro ~ %</span> {line.cmd}
                        </div>
                      )}
                      <div className="term-out">{line.out}</div>
                    </div>
                  ))}
                  <form onSubmit={handleTerminalSubmit} className="term-form">
                    <span className="term-prompt">sunil@macbook-pro ~ %</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="type help, skills, card..."
                      autoFocus
                      className="term-input"
                    />
                  </form>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* GlassSheet / Modal hosting the EXACT 3D Flip Profile Card from Sunil's Original Design */}
        <GlassSheet
          open={classicCardOpen}
          onClose={() => setClassicCardOpen(false)}
          aria-label="Sunil Aryal Classic 3D Profile Card"
        >
          <div className="classic-sheet-wrapper">
            <div className="classic-sheet-header">
              <span className="classic-sheet-badge">Original 3D Flip Profile Card (rudralization)</span>
              <GlassButton
                variant="glass"
                size="sm"
                onClick={() => setClassicCardOpen(false)}
              >
                Close ✕
              </GlassButton>
            </div>

            {/* EXACT .profile-card structure from https://rudralization.github.io/website/ */}
            <div className="classic-card-stage">
              <div className={`profile-card ${classicCardFlipped ? 'flipped' : ''}`}>
                <div className="card-inner">
                  {/* Front of Original Card */}
                  <div className="card-front">
                    <div className="classic-blob-wrapper">
                      <img
                        src="./assets/img/pro.png"
                        alt="Sunil Aryal"
                        className="classic-blob-img"
                      />
                    </div>
                    <h2 className="classic-name">Sunil Aryal</h2>
                    <p className="classic-role">
                      Passionate Programmer
                      <br />
                      Web Developer
                    </p>
                    <button
                      type="button"
                      className="classic-touch-btn"
                      onClick={() => setClassicCardFlipped(true)}
                    >
                      Touch Me
                    </button>
                  </div>

                  {/* Back of Original Card */}
                  <div className="card-back">
                    <h3 className="classic-back-title">Connect With Me</h3>
                    <p className="classic-back-handle">@rudralization • रुद्र.</p>
                    <div className="classic-social-grid">
                      <a
                        href="https://www.facebook.com/rudralization"
                        target="_blank"
                        rel="noreferrer"
                        className="classic-social-link"
                      >
                        Facebook
                      </a>
                      <a
                        href="https://www.instagram.com/rudralization/"
                        target="_blank"
                        rel="noreferrer"
                        className="classic-social-link"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://x.com/rudralization"
                        target="_blank"
                        rel="noreferrer"
                        className="classic-social-link"
                      >
                        X / Twitter
                      </a>
                      <a
                        href="https://github.com/Rudralization"
                        target="_blank"
                        rel="noreferrer"
                        className="classic-social-link"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://www.youtube.com/@rudralization"
                        target="_blank"
                        rel="noreferrer"
                        className="classic-social-link"
                      >
                        YouTube
                      </a>
                      <a
                        href="https://www.linkedin.com/in/rudralization/"
                        target="_blank"
                        rel="noreferrer"
                        className="classic-social-link"
                      >
                        LinkedIn
                      </a>
                    </div>
                    <button
                      type="button"
                      className="classic-touch-btn classic-back-btn"
                      onClick={() => setClassicCardFlipped(false)}
                    >
                      ← Flip Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassSheet>
      </div>
    </LiquidGlassFilter>
  );
}
