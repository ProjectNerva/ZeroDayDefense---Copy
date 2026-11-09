# ZeroDay Defense - Interactive Cybersecurity Game

A web-based interactive cybersecurity training game built with React and Vite. Players investigate various cyber attacks through a simulated VM desktop interface.

## Game Features

### VM Desktop Interface
- **Left Panel**: Displays emails, files, USBs, and network alerts with icons and previews
- **Main Panel**: Shows detailed content when items are clicked
- **Bottom Panel**: Interactive terminal for security analysis commands

### Gameplay
- **Day/Round System**: Progress through days with increasing difficulty
- **Score Tracking**: Earn points for correct actions, lose points for mistakes
- **Real-time Feedback**: Green/red flash effects for correct/incorrect actions
- **Attack Types**: 
  - Phishing emails
  - Malicious USB drives
  - Suspicious files
  - Network anomalies
  - Ransomware incidents

### Terminal Commands
- `help` - Show available commands
- `list` - List all current items
- `cat <id>` - Display file/email content
- `headers <email_id>` - Show email headers
- `ls <usb_id>` - List USB contents
- `scan <id>` - Scan for threats
- `quarantine <id>` - Quarantine suspicious items
- `strings <file>` - Extract strings from binary files
- `whois <ip>` - Lookup IP information
- `status` - Show day progress
- `endday` - End current day (when enough incidents resolved)
- `clear` - Clear terminal

### Scoring System
- **Correct Actions**: +10-25 points depending on difficulty
- **False Positives**: -5 to -12 points
- **Missed Threats**: -10 to -25 points

## How to Play

1. **Start the Game**: Run `npm run dev` to start the development server
2. **Investigate Items**: Click on items in the left panel to view their contents
3. **Use Terminal Commands**: Type commands to analyze threats (e.g., `scan email_phish_001`)
4. **Take Actions**: Use commands like `quarantine` for malicious items
5. **Progress Through Days**: Type `endday` when you've resolved enough incidents
6. **Learn from Mistakes**: Review post-mortem analysis for missed threats

## Technical Features

- Built with React 19 and Vite
- Retro terminal-style UI with green-on-black color scheme
- Responsive design that works on mobile and desktop
- Dynamic attack loading from JSON configuration
- Game state management with React hooks
- Hover tooltips showing attack indicators
- Real-time command parsing and feedback

## Installation

```bash
npm install
npm run dev
```

Navigate to http://localhost:5173 to start playing!

## Game Structure

The game loads attack scenarios from `attacks.json`, each containing:
- Attack metadata (type, difficulty, severity)
- Visual representation (icons, previews)
- Content to display (emails, files, logs)
- Terminal command responses
- Correct actions and scoring
- Hints and post-mortem explanations

Perfect for cybersecurity training, educational demonstrations, or just having fun learning about threat detection!

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
