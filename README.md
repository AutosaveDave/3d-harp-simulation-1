Collecting workspace information# 3D Interactive Harp Simulation

An interactive 3D virtual harp simulator built with Three.js and physics-based string movement. This web-based application allows you to pluck, strum, and tune virtual harp strings with realistic sound generation.

## Features

- Physically-based string simulation with realistic vibration and damping
- Interactive plucking and strumming of the harp strings
- Adjustable tuning pegs to change string tension and pitch
- Real-time audio synthesis with proper musical frequencies
- Multiple chord tuning presets in C major scale
- Detailed digital display showing string frequency, tension, and note
- Camera controls to view the harp from different angles
- Responsive design that works on desktop browsers

## Demo

To experience the harp simulation:
1. Open the index.html file in a modern web browser
2. Click on strings to hear them play
3. Try the different interaction methods described in the controls section

## Controls

### Basic Interaction
- **Click on a string**: Plucks the string
- **Click and drag across strings**: Strums multiple strings
- **Click and drag a tuning peg**: Adjusts string tension and pitch
- **Click on a digital display**: Snaps the frequency to the nearest musical note

### Camera Movement
- **Hold SPACEBAR**: Enables camera movement with mouse/trackpad

### Chord Presets
Press keys 1-7 for instant chord tunings in C major:
1. C major 7 (Cmaj7)
2. D minor 7 (Dm7)
3. E minor 7 (Em7)
4. F major 7 (Fmaj7)
5. G dominant 7 (G7)
6. A minor 7 (Am7)
7. B half-diminished (Bm7b5)

## Technologies Used

- [Three.js](https://threejs.org/) for 3D rendering
- [Cannon.js](https://schteppe.github.io/cannon.js/) for physics simulation
- Web Audio API for sound synthesis
- HTML5 Canvas for digital displays

## Setup

This project is self-contained in a single HTML file with dependencies loaded from CDNs.

1. Download the index.html file
2. Open it in any modern web browser
3. No server or build process required!

## How It Works

The simulation creates a virtual harp with four strings, each composed of connected physics particles. When a string is plucked:

1. The physics engine calculates realistic string movement
2. The Web Audio API synthesizes the appropriate sound based on string tension
3. Visual feedback shows the string vibrating with color changes

String tension affects both the visual appearance and the pitch of the notes. Higher tension produces higher frequency notes according to the physics of real strings.

## Performance Notes

- For best performance, use a modern browser with hardware acceleration enabled
- The simulation works best on desktop devices with sufficient processing power

## Future Improvements

- Mobile touch support
- Additional string and harp customization options
- Recording/playback capabilities
- More complex plucking patterns