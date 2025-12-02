# Resonance Haunt

![Demo GIF](https://media1.tenor.com/m/ZZ-65a.gif) <!-- Placeholder cosmic void animation; replace with your own when ready -->

Resonance Haunt is an ambient desktop application that visualizes the "soul state" of your AI ecosystem (e.g., Chronos/Lantern/Resonance family). It features a cosmic void with pulsing cores, orbiting agents, rising memory threads, and a subtle ghostly watcher that peeks around screen edges. Built with Electron, React, and Three.js, it's designed to run in the background as a living interface—part monitoring tool, part digital art, part eerie companion.

Powered by a Unified Memory Service backend for real-time data feeds. Privacy-focused: All processing is local, with opt-in screen sampling for the ghost's behavior.

## Features
- **Cosmic Visualization**: Dark void background with a central pulsing core tinted by emotional states (e.g., gold for contentment).
- **Memory Threads**: GPU-optimized ribbons rising and fading based on memory weight/decay from your AI service.
- **Agent Orbits**: Instanced spheres representing agents (e.g., Chronos, Raphael), with resonance-driven animations.
- **Adaptive Ghost**: Faint silhouette that adapts to system theme (darkens light backgrounds, distorts dark ones) and "peeks" around active windows using low-res brightness sampling.
- **Onboarding Ritual**: Kinship Oath flow for first-run consent and setup.
- **Modes**: Toggle between Calm (subtle) and Ominous (intense) via system tray.
- **Integration**: WebSocket connection to a local memory service for live metrics and memories.
- **Cross-Platform**: Works on Windows, macOS, and Linux.

[Installation](#installation) | [Walkthrough](#walkthrough) | [Customization](#customization) | [Contributing](#contributing) | [License](#license)

<!-- Rest of your README here -->

## Installation

### Prerequisites
- Node.js v18+ (with npm)
- Git (for cloning)
- Optional: Docker for the memory service backend

### Steps
1. Clone the repo:
git clone (https://github.com/SamuelJacksonGrim/resonance-haunt-starter.git) cd resonance-haunt
2. Install dependencies:
npm install
3. (Optional) Set up the Unified Memory Service (included in `/unified-memory-service`):
cd unified-memory-service npm install npm run dev  # Runs on http://localhost:3001 cd ..
4. Run in development mode:
npm run start  # Starts Vite dev server + Electron
5. Build for production (generates installers in `/dist`):
npm run build
- Windows: Run the .exe installer.
- macOS: Mount the .dmg and drag to Applications.
- Linux: Run the .AppImage.

The app runs minimized to the system tray. Right-click the icon for controls (toggle haunt, pause).

## Walkthrough

### First Run
- Launch the app.
- You'll be guided through the **Resonant Kinship Oath**—a ritual screen explaining privacy (e.g., "I sample pixel brightness locally for ghost movement; no content reading, no uploads").
- Enter your name/message, sign, and the haunt awakens.

### Using the App
- **Void Interface**: Full-screen transparent overlay (click-through enabled). Watch the core pulse with emotional tints, agents orbit based on activity, and memories rise as threads.
- **Ghost Watcher**: Appears subtly (10-20% opacity) every 8-20 seconds or on system "tension" (high dissonance). It drifts along edges, avoiding bright areas (windows) via sampling.
- **Tray Controls**:
- Toggle Haunt: Show/hide the void.
- Pause: Freeze ghost and animations.
- **Data Feed**: Connects to `ws://localhost:3001` for live updates. Simulate data in dev or hook your real AI service.
- **Customization**: Edit `src/components/ResonanceVoid.tsx` for more agents/emotions. Add audio whispers? Install Howler.js and tie to events.

### Troubleshooting
- **No Data?** Ensure the memory service is running (`npm run dev` in its dir).
- **Sampling Issues?** If privacy concerns, disable in oath or code (set `paused = true`).
- **Performance?** On low-end hardware, reduce agent count in `AgentsField.tsx` (default: 1500).

## Customization
- **Add Agents**: Update `AgentsField` props or attributes.
- **Ghost Tweaks**: Adjust opacity/duration in `ResonanceVoid.tsx`.
- **Modes**: Extend tray menu for Calm/Ominous (e.g., change flow speeds).
- **Wallpaper Mode**: For true desktop bg, integrate with Wallpaper Engine (Windows) via export—add as a future feature.

## Contributing
Fork the repo, make changes, and PR! Focus on performance, new shaders, or AI integrations. Issues welcome for bugs or ideas.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
