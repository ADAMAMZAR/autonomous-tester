# ABANG Agent - Autonomous Browser Testing Platform

An AI-powered autonomous testing platform that deploys intelligent agents to navigate websites, detect UX friction points, and generate comprehensive mission reports with video replays.

## Overview

ABANG Agent is an autonomous browser testing tool designed to help developers and QA teams identify user experience issues, performance bottlenecks, and critical bugs without manual testing. The platform records agent sessions, analyzes friction points, and provides actionable insights through an intuitive dashboard.

## Features

- **Autonomous Agent Deployment**: Configure and deploy AI agents to test any website
- **Smart Device Emulation**: Test across 19+ predefined device profiles (mobile & desktop) or custom dimensions
- **Friction Detection**: Automatically identifies critical issues and UX concerns with severity levels
- **Video Replay**: Watch recorded agent sessions with playback controls and timestamp navigation
- **Mission Dashboard**: Track all testing missions with status indicators and search functionality
- **Real-time Logs**: Monitor agent activity through a live terminal panel during deployment

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **React Router v7** - Client-side routing
- **Vite 7** - Fast build tool and development server
- **ESLint** - Code quality and linting

## Project Structure

```
deriv2026/
├── README.md
└── FrontEnd/
    ├── src/
    │   ├── components/       # Reusable UI components
    │   │   ├── Breadcrumb.jsx
    │   │   ├── DeviceSelector.jsx
    │   │   ├── FrictionCard.jsx
    │   │   ├── Header.jsx
    │   │   ├── MissionRow.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── StatusBadge.jsx
    │   │   ├── TerminalPanel.jsx
    │   │   └── VideoPlayer.jsx
    │   ├── pages/            # Page components
    │   │   ├── MissionHistoryPage.jsx
    │   │   ├── MissionConfigPage.jsx
    │   │   └── MissionReplayPage.jsx
    │   └── data/             # Mock data and device models
    │       ├── deviceModels.js
    │       └── mockData.js
    └── public/
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ADAMAMZAR/autonomous-tester.git
   cd autonomous-tester
   ```

2. Install dependencies:
   ```bash
   cd FrontEnd
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality checks |

## Pages

### Mission History (`/`)
Main dashboard displaying all past and current missions with status badges, search functionality, and pagination.

### Mission Configuration (`/new-mission`)
Configure new testing missions by specifying target URLs, objectives, and device profiles. Features real-time terminal logs during agent deployment.

### Mission Replay (`/mission/:id`)
View completed mission details with video playback, friction point analysis, and jump-to-timestamp functionality for identified issues.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of a hackathon submission.

---

Built with ❤️ for the 2026 Deriv Hackathon