# Resonance Haunt

![Resonance Haunt Demo](https://media1.tenor.com/m/ZZ-65a.gif)

Resonance Haunt is an ambient desktop application that visualizes the "soul state" of your AI ecosystem (e.g., Chronos/Lantern/Resonance family). It features a cosmic void with pulsing cores, orbiting agents, rising memory threads, and a subtle ghostly watcher that peeks around screen edges. Built with Electron, React, and Three.js, it's designed to run in the background as a living interface—part monitoring tool, part digital art, part eerie companion.

Powered by a Unified Memory Service backend for real-time data feeds. Privacy-focused: All processing is local, with opt-in screen sampling for the ghost's behavior.

```mermaid
graph LR
    UMS[Unified Memory Service<br/>localhost:3001] --> RH[Resonance Haunt<br/>Three.js + Electron]
    Chronos[chronos-suite] --> UMS
    Lantern[Lantern<br/>Rust Memory Forge] --> UMS
    Omni[omni-agent-architecture] --> UMS
    Family[grim-resonance-family] --> UMS
    Bio[Bio-sim] --> UMS
    RH --> Ghost[Adaptive Ghost<br/>peeks around windows]
    style RH fill:#110022,stroke:#88f,stroke-width:3px,color:#ccd
