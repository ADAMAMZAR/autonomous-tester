# Page Descriptions

## 1. Mission History Page (`/`)

**Purpose**: Main dashboard for viewing all past and current missions.

**What it does**:
- Displays a table of all missions with their status, objectives, and execution dates
- Shows 5 missions with details including mission ID, objective, description, status (SUCCESS, FAILED, IN_PROGRESS), and execution date
- Provides search and filter functionality for finding specific missions
- Pagination controls for navigating through multiple pages of missions
- Each mission row is clickable and navigates to the Mission Replay page for detailed analysis

**Key Features**:
- Color-coded status badges (green for SUCCESS, red for FAILED, yellow for IN_PROGRESS)
- Search bar with filter button
- "+ New Mission" button to create new missions
- Responsive table design that scrolls horizontally on mobile
- Hover effects on mission rows to indicate clickability

**Components Used**:
- `MissionRow` - Individual mission entries
- `StatusBadge` - Status indicators
- `SearchBar` - Search and filter controls
- `Pagination` - Page navigation
- `Header` - Top navigation bar

---

## 2. Mission Configuration Page (`/new-mission`)

**Purpose**: Create and configure new AI agent missions.

**What it does**:
- Allows users to configure a new mission by specifying target URL and objectives
- Provides smart device selection with 19 predefined models (10 mobile + 9 desktop)
- Enables custom device dimensions with automatic model deselection
- Displays real-time terminal logs when deploying the agent
- Shows mission status badges and action buttons

**Key Features**:
- **Target URL Input**: Specify the website to test
- **Mission Objective**: Detailed description of what the agent should test
- **Smart Device Selection**:
  - Toggle between Mobile and Desktop
  - Dropdown with predefined models (iPhone 14 Pro, MacBook Pro 16", etc.)
  - Custom width/height inputs
  - Auto-unselect: Model clears when you manually change dimensions
- **Deploy Button**: Launches the ABANG Agent with configured settings
- **Terminal Panel**: Shows AI agent logs in real-time with syntax highlighting
- **Status Badges**: Displays friction detection, latency, and performance score

**Components Used**:
- `DeviceSelector` - Smart device selection with auto-unselect logic
- `TerminalPanel` - Real-time log display with color-coded message types
- `Header` - Top navigation bar

**User Flow**:
1. Enter target URL (e.g., "https://example.com/pricing")
2. Describe mission objective
3. Select device (predefined or custom dimensions)
4. Click "DEPLOY ABANG AGENT"
5. View terminal logs showing agent activity

---

## 3. Mission Replay Page (`/mission/:id`)

**Purpose**: View completed mission details with video playback and friction analysis.

**What it does**:
- Displays video replay of the agent's session
- Shows detected friction points with severity levels
- Provides jump-to-timestamp functionality to navigate to specific issues
- Displays mission details including objective, device, and network configuration
- Allows downloading full mission reports

**Key Features**:
- **Video Player**:
  - Full playback controls (play/pause, seek, volume, fullscreen)
  - Keyboard shortcuts: Space = play/pause, F = fullscreen
  - Progress bar with time display
  - Click video to play/pause
- **Friction Summary** (Left Column):
  - P1 CRITICAL issues (red) - Critical bugs that block functionality
  - ⚠️ WARNING issues (yellow) - Performance or UX concerns
  - Each card shows title, description, and timestamp
  - "JUMP TO" button seeks video to the exact moment the issue occurred
- **Mission Details** (Right Column):
  - Mission objective description
  - Device information (e.g., iPhone 14 Pro - 393 x 852 pixels)
  - Network conditions (e.g., 5G 4B)
- **Navigation**:
  - Breadcrumb: "Mission History > Mission #082"
  - Back button to return to Mission History
  - Mission score badge (e.g., 84/100)
  - Download Full Report button

**Components Used**:
- `VideoPlayer` - Custom video player with full controls
- `FrictionCard` - Issue cards with jump-to-timestamp
- `Breadcrumb` - Navigation breadcrumb
- `Header` - Top navigation bar

**User Flow**:
1. Click any mission from Mission History
2. View mission score and details
3. Watch video replay
4. Review friction cards
5. Click "JUMP TO 01:14" to see specific issues in video
6. Download report or navigate back

---

## Navigation Flow

```
Mission History (/)
    ├─→ Click "+ New Mission" → Mission Configuration (/new-mission)
    │                               └─→ Deploy agent → View logs
    │
    └─→ Click any mission row → Mission Replay (/mission/:id)
                                    └─→ Watch video, analyze friction
```

---

## Common Features Across All Pages

- **Dark Theme**: Premium dark mode with vibrant green accents
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Header Navigation**: Consistent top bar with logo and actions
- **Smooth Transitions**: Hover effects and animations
- **Accessibility**: Focus visible states, keyboard navigation support
- **Loading States**: Spinner and skeleton components ready for async data

---

## Technology Stack

- **React**: UI library
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server
- **CSS Variables**: Consistent theming system
- **Custom Components**: Reusable, modular architecture
