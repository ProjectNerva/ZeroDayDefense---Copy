import { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import './styles/Layout.css';
import './styles/Terminal.css';
import './styles/Content.css';
import './styles/Summary.css';
import { handleUrlNavigation } from './links.jsx';
import Header from './components/Header';
import Tutorial from './components/Tutorial';
import Browser from './components/Browser';
import { NotepadModal, TipsModal, CommandGuideModal } from './components/Modals';
import { useSounds } from './hooks/useSounds';
import { tutorialSteps, realEmployeeInfo, commandHelp, formatContent } from './utils/gameData';
import attacksData from '../attacks.json';

function App() {
  // Game State
  const [gameState, setGameState] = useState({
    currentDay: 1,
    score: 0,
    attacks: [],
    allAttacks: [],
    selectedItem: null,
    terminalHistory: [],
    feedback: null,
    completedAttacks: [],
    correctAttacks: [], // Track correctly handled attacks separately
    scoredAttacks: [],
    gamePhase: 'welcome',
    tutorialStep: 0,
    summaryData: null
  });

  // UI State
  const [terminalInput, setTerminalInput] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [terminalHeight, setTerminalHeight] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [browserUrl, setBrowserUrl] = useState('');
  const [currentId, setCurrentId] = useState('NA');
  const [introText, setIntroText] = useState('');
  const [introComplete, setIntroComplete] = useState(false);
  const [welcomeText, setWelcomeText] = useState('');
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [scoreNotification, setScoreNotification] = useState(null);
  const [tutorialVisible, setTutorialVisible] = useState(true);
  const [showCommandGuides, setShowCommandGuides] = useState({});
  const [commandGuideModal, setCommandGuideModal] = useState(null);
  const [phishingFormData, setPhishingFormData] = useState({
    employeeId: '',
    fullName: '',
    password: '',
    ssn: '',
    email: '',
    bankUsername: '',
    bankPassword: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    accountNumber: '',
    routingNumber: '',
    beneficiaryBank: '',
    beneficiaryName: '',
    transferAmount: '',
    authCode: '',
    personalEmail: '',
    phone: ''
  });

  // Tutorial Dragging State
  const [tutorialPosition, setTutorialPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Animation and sound refs
  const animationCancelRef = useRef(false);

  // Sound effects
  const { playBtnClick, playBtnHover, playEndday, playTypingSound, stopTypingSound } = useSounds();

  // Create admin commands for development
  useEffect(() => {
    // Make admin commands available globally for console use
    window.adminCommand = {
      addInvoice: (idOrObject) => {
        // Handle both string and object formats
        const id = typeof idOrObject === 'string' ? idOrObject : idOrObject?.id;
        const attack = attacksData.attacks.find(a => a.viewId === id || a.id === id);
        if (attack) {
          setGameState(prev => ({
            ...prev,
            attacks: [...prev.attacks, attack],
            allAttacks: [...prev.allAttacks, attack]
          }));
          console.log(`Added ${attack.viewId || attack.id} (${attack.title}) to inbox`);
          return { success: true, message: `Added ${attack.viewId || attack.id} to inbox` };
        } else {
          console.log(`Attack with id "${id}" not found`);
          return { success: false, message: `Attack with id "${id}" not found` };
        }
      },
      listAvailableAttacks: () => {
        const attacks = attacksData.attacks.map(a => ({
          id: a.id,
          viewId: a.viewId,
          title: a.title,
          type: a.type
        }));
        console.table(attacks);
        return attacks;
      },
      clearInbox: () => {
        setGameState(prev => ({
          ...prev,
          attacks: [],
          completedAttacks: [],
          correctAttacks: [],
          scoredAttacks: []
        }));
        console.log('Inbox cleared');
        return { success: true, message: 'Inbox cleared' };
      },
      addScore: (points) => {
        setGameState(prev => ({
          ...prev,
          score: prev.score + points
        }));
        console.log(`Added ${points} points to score`);
        return { success: true, message: `Added ${points} points` };
      },
      resetGame: () => {
        setGameState(prev => ({
          ...prev,
          currentDay: 1,
          score: 0,
          attacks: [],
          allAttacks: [],
          selectedItem: null,
          completedAttacks: [],
          correctAttacks: [],
          scoredAttacks: [],
          gamePhase: 'welcome'
        }));
        console.log('Game reset to initial state');
        return { success: true, message: 'Game reset' };
      },
      getGameState: () => {
        console.log('Current gameState:', gameState);
        return gameState;
      }
    };

    // Add help command
    window.adminCommand.help = () => {
      console.log(`
Available Admin Commands:
- adminCommand.addInvoice("id_008") - Add a specific attack to inbox (string format)
- adminCommand.addInvoice({id: "id_008"}) - Add a specific attack to inbox (object format)
- adminCommand.listAvailableAttacks() - Show all available attacks
- adminCommand.clearInbox() - Clear all items from inbox
- adminCommand.addScore(points) - Add points to current score
- adminCommand.resetGame() - Reset game to initial state
- adminCommand.getGameState() - Print current game state to console
- adminCommand.help() - Show this help

Example usage:
adminCommand.addInvoice("id_008")
adminCommand.addInvoice({id: "msg_001"})
adminCommand.listAvailableAttacks()
adminCommand.getGameState()
      `);
    };

    // Cleanup function to remove global commands when component unmounts
    return () => {
      delete window.adminCommand;
    };
  }, []);

  // Complete intro story text
  const storyTextComplete = `
> ACCESSING ZERODAY DEFENSE SECURITY SYSTEM...
> CONNECTION ESTABLISHED

> IDENTITY VERIFICATION REQUIRED...
> VERIFYING... [OK]

WELCOME, IT SECURITY SPECIALIST.

You are now connected to the corporate security monitoring system.
Multiple security incidents have been detected across the network.

YOUR MISSION:
- Investigate suspicious emails, files, and network activities
- Use terminal commands to analyze potential threats
- Take appropriate action to neutralize attacks
- Protect the company from cyber threats

CRITICAL: Each decision matters. Incorrect actions may compromise security.

The clock is ticking. Cyber criminals are already in the system.

Welcome to ZeroDay Defense.

Loading Day ${gameState.currentDay}`;

  // Intro animation function
  const animateIntroText = () => {
    animationCancelRef.current = false; // Reset cancel flag
    const storyText = storyTextComplete;

    // Start typing sound
    playTypingSound();

    let currentIndex = 0;
    const typeWriter = () => {
      if (animationCancelRef.current) {
        stopTypingSound();
        return;
      }
      
      if (currentIndex < storyText.length) {
        setIntroText(storyText.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, 10); 
      } else {
        stopTypingSound();
        
        setTimeout(() => {
          if (animationCancelRef.current) return;
          setIntroText(storyText + '\n\n...');
          setTimeout(() => {
            if (animationCancelRef.current) return;
            setIntroText(storyText + '\n\n......');
            setTimeout(() => {
              if (animationCancelRef.current) return;
              setIntroComplete(true);
            }, 800);
          }, 800);
        }, 1000);
      }
    };
    typeWriter();
  };

  // Welcome text animation function
  const animateWelcomeText = () => {
    const welcomeMessage = "Click any key to continue";
    animationCancelRef.current = false;
    
    let currentIndex = 0;
    const typeWriter = () => {
      if (animationCancelRef.current) return;
      
      if (currentIndex < welcomeMessage.length) {
        setWelcomeText(welcomeMessage.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, Math.random() * 100 + 50); // Slower typing for welcome
      } else {
        setWelcomeComplete(true);
      }
    };
    
    // Start animation after a brief delay
    setTimeout(() => {
      typeWriter();
    }, 1000);
  };

  // Intro screen functions
  const startIntro = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'intro' }));
  };

  // ESC key handler for intro animation
  useEffect(() => {
    if (gameState.gamePhase === 'intro') {
      animateIntroText();
      
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          animationCancelRef.current = true;
          stopTypingSound();
          setIntroComplete(true);
          setIntroText(storyTextComplete);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [gameState.gamePhase, gameState.currentDay]);

  // Welcome text animation trigger
  useEffect(() => {
    if (gameState.gamePhase === 'welcome') {
      animateWelcomeText();
    }
  }, [gameState.gamePhase]);

  // Welcome screen keyboard handler
  useEffect(() => {
    if (gameState.gamePhase === 'welcome') {
      const handleKeyPress = (e) => {
        playBtnClick();
        startIntro();
      };
      
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [gameState.gamePhase]);

  // ESC key handler for closing modals
  useEffect(() => {
    const handleEscModal = (e) => {
      if (e.key === 'Escape') {
        // Priority order: close notepad first, then tips, then command guide, then browser
        if (notepadOpen) {
          setNotepadOpen(false);
        } else if (tipsOpen) {
          setTipsOpen(false);
        } else if (commandGuideModal) {
          setCommandGuideModal(null);
        } else if (browserOpen) {
          setBrowserOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscModal);
    return () => document.removeEventListener('keydown', handleEscModal);
  }, [notepadOpen, tipsOpen, commandGuideModal, browserOpen]);

  // Tutorial drag handling
  const handleTutorialMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleTutorialMouseMove = (e) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - 400, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 300, e.clientY - dragOffset.y));
      setTutorialPosition({ x: newX, y: newY });
    }
  };

  const handleTutorialMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleTutorialMouseMove);
      document.addEventListener('mouseup', handleTutorialMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleTutorialMouseMove);
        document.removeEventListener('mouseup', handleTutorialMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Game logic functions
  const startGame = () => {
    // Initialize tutorial with phishing email and legitimate email
    const phishingAttack = attacksData.attacks.find(attack => attack.viewId === 'id_001');
    const legitimateEmail = attacksData.attacks.find(attack => attack.viewId === 'id_006');
    
    if (!phishingAttack) {
      console.error('ERROR: Phishing attack not found in attacks.json');
      return;
    }
    if (!legitimateEmail) {
      console.error('ERROR: Legitimate email not found in attacks.json');
      return;
    }
    
    const tutorialAttacks = [phishingAttack, legitimateEmail];
    
    setGameState(prev => ({ 
      ...prev, 
      gamePhase: 'tutorial',
      attacks: tutorialAttacks,
      allAttacks: tutorialAttacks,
      selectedItem: null,
      completedAttacks: [],
      correctAttacks: [],
      scoredAttacks: [],
      tutorialStep: 0,
      terminalHistory: [
        'ZeroDay Defense Security Terminal v1.0',
        '============================',
        'Follow the instructions to learn how to investigate threats.',
        ''
      ]
    }));
    setCurrentId('NA');
  };

  const handleTutorialCommand = (command) => {
    const currentStep = tutorialSteps[gameState.tutorialStep];
    if (currentStep.expectedCommand) {
      // Check if the command matches expected format
      const trimmedCommand = command.trim().toLowerCase();
      const expectedBase = currentStep.expectedCommand.split(' ')[0];
      const commandBase = trimmedCommand.split(' ')[0];
      
      let isCorrect = false;
      
      // Check for basic command match
      if (commandBase === expectedBase) {
        // Allow multiple formats for all commands
          isCorrect = trimmedCommand.includes('id_001') ||
                     trimmedCommand.includes('id_006') ||
                     trimmedCommand.includes('currentid') || 
                     trimmedCommand.includes('$currentid') ||
                   /\b[1-6]\b/.test(trimmedCommand) || // Allow single digits 1-6 for any command
                   trimmedCommand === expectedBase || // Allow bare command
                     trimmedCommand === currentStep.expectedCommand.toLowerCase();
      }
      
      if (isCorrect) {
        // Correct command, show result and advance
        handleTerminalCommand(command);
        setTimeout(() => {
          nextTutorialStep();
        }, 2000);
      } else {
        // Wrong command in tutorial - give more helpful error message
        const args = trimmedCommand.split(' ').slice(1).join(' ');
        let helpText = '';
        
        if (commandBase === expectedBase) {
          // Correct command but wrong ID format
          if (args && !/^(id_00[1-6]|[1-6]|currentid|\$currentid)$/i.test(args)) {
            helpText = `Tutorial: ID "${args}" not found. Try '${expectedBase} 1' or '${expectedBase} id_001'`;
        } else {
            helpText = `Tutorial: Try '${expectedBase} 1' or '${expectedBase} id_001' to target the tutorial items.`;
        }
        } else {
          // Wrong command entirely
          helpText = `Tutorial: Expected command to use '${currentStep.expectedCommand}'`
        }
        
        setGameState(prev => ({ 
          ...prev, 
          terminalHistory: [...prev.terminalHistory, `$ ${command}`, helpText]
        }));
      }
    } else {
      // Normal command handling
      handleTerminalCommand(command);
    }
  };

  const nextTutorialStep = () => {
    if (gameState.tutorialStep < tutorialSteps.length - 1) {
      setGameState(prev => ({ ...prev, tutorialStep: prev.tutorialStep + 1 }));
    } else {
      finishTutorial();
    }
  };

  const skipTutorial = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'active' }));
    setTutorialVisible(false);
    startActiveGame();
  };

  const finishTutorial = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'active' }));
    setTutorialVisible(false);
    startActiveGame();
  };

  // Custom browser opener that handles tutorial advancement
  const handleBrowserOpen = () => {
    setBrowserOpen(true);
    // Check if we're in tutorial step 5 (index 4) and advance
    if (gameState.gamePhase === 'tutorial' && gameState.tutorialStep === 4) {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, tutorialStep: 5 }));
      }, 500);
    }
  };

  const startActiveGame = () => {
    // Initialize game with random attacks for the day
    const shuffledAttacks = [...attacksData.attacks].sort(() => 0.5 - Math.random()).slice(0, 3);
    setGameState(prev => ({ 
      ...prev, 
      attacks: shuffledAttacks,
      allAttacks: shuffledAttacks,
      selectedItem: null,
      completedAttacks: [],
      correctAttacks: [],
      scoredAttacks: [],
      terminalHistory: [
        `ZeroDay Defense Security Terminal v1.0 - Day ${gameState.currentDay}`,
        '=====================================',
        `Welcome to Day ${gameState.currentDay}. You have ${shuffledAttacks.length} security incidents to investigate.`,
        'Type "help" for available commands or "list" to see current items.',
        ''
      ]
    }));
    setCurrentId('NA');
  };

  // Terminal command handling
  const handleTerminalCommand = (command) => {
    if (command.trim()) {
      // Add to command history
      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
    }
    
    const newHistory = [...gameState.terminalHistory, `$ ${command}`];
    
    // Parse command and find response
    const response = parseCommand(command, gameState.attacks);
    
    if (response === 'CLEAR_TERMINAL') {
      setGameState(prev => ({ 
        ...prev, 
        terminalHistory: [] 
      }));
      return;
    }
    
    newHistory.push(response);

    setGameState(prev => ({ 
      ...prev, 
      terminalHistory: newHistory 
    }));
  };

  // Command parser
  const parseCommand = (command, attacks) => {
    // Replace $currentId and currentId with the actual current ID
    let processedCommand = command.trim();
    
    if (currentId) {
      processedCommand = processedCommand.replace(/\$?currentid/gi, currentId);
    }
    
    const fullCommand = processedCommand;
    const parts = fullCommand.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1).join(' ');

    // Find attack by ID or partial match
    const findAttack = (searchTerm) => {
      if (!searchTerm) return null;
      return attacks.find(attack => 
        attack.id === searchTerm || 
        attack.viewId === searchTerm ||
        attack.id.includes(searchTerm) ||
        attack.viewId?.includes(searchTerm) ||
        attack.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    // Handle help command with optional subcommand
    if (cmd === 'help') {
      if (args) {
        return getDetailedHelp(args);
      }
      return 'Available commands: cat, headers, ls, strings, grep, scan, whois, quarantine, accept, block_ip, isolate, patch, navigate, hint, list, clear, status, endday\n\nActions: run, accept, quarantine \n\nVariables: currentId\n\nType "help <command>" for detailed usage and examples.\n\nNote: Some items require browser interaction instead of terminal commands.';
    }

    switch (cmd) {
      case 'list':
        return `Current items:\n${attacks.map(a => `${a.id} - ${a.title}`).join('\n')}`;
      
      case 'status':
        const completed = gameState.completedAttacks.length;
        const total = attacks.length;
        return `Day ${gameState.currentDay} Status:\nCompleted: ${completed}/${total} incidents\nScore: ${gameState.score}`;
      
      case 'endday':
        if (gameState.completedAttacks.length >= Math.floor(attacks.length * 0.6)) {
          setTimeout(() => endDay(), 500);
          return `Day ${gameState.currentDay} completed! Preparing summary...`;
        } else {
          return `You need to resolve at least ${Math.ceil(attacks.length * 0.6)} incidents before ending the day. Current: ${gameState.completedAttacks.length}/${attacks.length}`;
        }
      
      case 'clear':
        return 'CLEAR_TERMINAL';
      
      case 'browser':
        setBrowserOpen(true);
        // Check if we're in tutorial step 5 and advance if so
        if (gameState.gamePhase === 'tutorial' && gameState.tutorialStep === 4) {
          setTimeout(() => {
            setGameState(prev => ({ ...prev, tutorialStep: 5 }));
          }, 500);
        }
        return 'Opening VM Browser for safe investigation of suspicious links...';
        
      default:
        // Handle specific attack commands
        return handleAttackCommand(fullCommand, cmd, args, attacks);
    }
  };

  // Handle attack-specific commands
  const handleAttackCommand = (fullCommand, cmd, args, attacks) => {
    // Helper function to find terminal response case-insensitively
    const findTerminalResponse = (attack, command) => {
      if (!attack.terminal_responses) return null;
      
      // First try exact match
      if (attack.terminal_responses[command]) {
        return attack.terminal_responses[command];
      }
      
      // Then try case-insensitive match
      const lowerCommand = command.toLowerCase();
      for (const [key, value] of Object.entries(attack.terminal_responses)) {
        if (key.toLowerCase() === lowerCommand) {
          return value;
        }
      }
      
      return null;
    };
    
    // Try to match the full command against terminal responses first
    for (const attack of attacks) {
      const response = findTerminalResponse(attack, fullCommand);
      if (response) {
        // NEW: Check if this is a correct action using the updated logic
        const commandAction = getCommandAction(cmd, fullCommand);
        const isCorrectAction = attack.correct_actions.includes(commandAction);
        
        // Check if this attack has already been completed
        const isAlreadyCompleted = gameState.completedAttacks.includes(attack.id);
        
        // Check if this attack has already been scored for this action
        const scoringKey = `${attack.id}_${commandAction}`;
        const alreadyScored = gameState.scoredAttacks.includes(scoringKey);
        
        // Prevent any action on already completed attacks
        if (isAlreadyCompleted && (cmd === 'quarantine' || cmd === 'accept')) {
          return response + `\n\n[Already processed] This item has already been handled.`;
        }
        
        if (isCorrectAction && !alreadyScored) {
          setTimeout(() => triggerFeedback('correct'), 100);
          // Update score and mark as completed
          const scoreGain = attack.score?.correct || 10;
          const isQuarantine = cmd === 'quarantine';
          const isAccept = cmd === 'accept';
          
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreGain,
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              correctAttacks: [...new Set([...prev.correctAttacks, attack.id])], // Track correct actions
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              // Remove quarantined, accepted, or run items from inbox (but not during tutorial)
              attacks: (isQuarantine || isAccept || cmd === 'run') && prev.gamePhase !== 'tutorial' 
                ? prev.attacks.filter(a => a.id !== attack.id) 
                : prev.attacks
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id && (isQuarantine || isAccept || cmd === 'run') && gameState.gamePhase !== 'tutorial') {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            setScoreNotification({ type: 'positive', amount: scoreGain });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          
          let actionResult;
          if (isQuarantine) {
            actionResult = `Successfully quarantined dangerous ${attack.type.replace('_', ' ')}!`;
          } else if (isAccept) {
            actionResult = `Successfully processed legitimate ${attack.type.replace('_', ' ')}!`;
          } else {
            actionResult = `[THREAT NEUTRALIZED]`;
          }
          
          return response + `\n\n${actionResult} +${scoreGain} points`;
        } else if (isCorrectAction && alreadyScored) {
          return response + `\n\n[Already processed this action]`;
        } else {
          // Check if it's an incorrect action that should be penalized
          const isDangerous = commandAction === 'run';
          const isIncorrectQuarantine = commandAction === 'quarantine' && !attack.correct_actions.includes('quarantine');
          const isIncorrectAccept = commandAction === 'accept' && !attack.correct_actions.includes('accept');
          
          if ((isDangerous || isIncorrectQuarantine || isIncorrectAccept) && !alreadyScored) {
            setTimeout(() => triggerFeedback('incorrect'), 100);
            const scoreLoss = attack.score?.miss || -5;
            const isQuarantine = cmd === 'quarantine';
            const isAccept = cmd === 'accept';
            
            setTimeout(() => {
              setGameState(prev => ({ 
                ...prev, 
                score: prev.score + scoreLoss,
                scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
                completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
                // Remove items from inbox even when action is wrong (but not during tutorial)
                attacks: (isQuarantine || isAccept) && prev.gamePhase !== 'tutorial' 
                  ? prev.attacks.filter(a => a.id !== attack.id) 
                  : prev.attacks
              }));
              setScoreNotification({ type: 'negative', amount: Math.abs(scoreLoss) });
              setTimeout(() => setScoreNotification(null), 2000);
            }, 100);
            
            if (isIncorrectQuarantine) {
              return response + `\n\n[WARNING] Quarantined a legitimate ${attack.type.replace('_', ' ')} - INCORRECT ACTION! ${scoreLoss} points`;
            } else if (isIncorrectAccept) {
              return response + `\n\n[WARNING] Accepted a dangerous ${attack.type.replace('_', ' ')} - SECURITY BREACH! ${scoreLoss} points`;
            } else {
              return response + `\n\n[WARNING] Dangerous action! ${scoreLoss} points`;
            }
          }
        }
        return response;
      }
    }
    
    return handleGenericCommands(cmd, args, attacks);
  };

  // NEW: Helper function to determine the action type from command
  const getCommandAction = (cmd, fullCommand) => {
    if (cmd === 'quarantine') return 'quarantine';
    if (cmd === 'accept') return 'accept';
    if (fullCommand.includes('run') || fullCommand.includes('execute')) return 'run';
    // browser_input is handled separately in handlePhishingFormSubmit
    return cmd;
  };

  // Handle generic commands
  const handleGenericCommands = (cmd, args, attacks) => {
    const findAttack = (searchTerm) => {
      if (!searchTerm) return null;
      
      // If it's a single digit, try to map it to id_00X format (which is the viewId)
      if (/^\d+$/.test(searchTerm)) {
        const paddedId = `id_${searchTerm.padStart(3, '0')}`;
        const foundAttack = attacks.find(attack => attack.viewId === paddedId);
        if (foundAttack) return foundAttack;
      }
      
      // Try exact matches first (both id and viewId)
      const exactMatch = attacks.find(attack => 
        attack.id === searchTerm || 
        attack.viewId === searchTerm
      );
      if (exactMatch) return exactMatch;
      
      // Then try partial matches
      return attacks.find(attack => 
        attack.id.includes(searchTerm) ||
        attack.viewId?.includes(searchTerm) ||
        attack.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    if (cmd === 'navigate' && args) {
      setBrowserUrl(args);
      setBrowserOpen(true);
      return `Opening VM Browser to navigate to: ${args}\n[SECURITY] Launching in isolated environment...`;
    }
    
    if (cmd === 'headers' && args) {
      const attack = findAttack(args);
      if (attack) {
        // Look for headers response in the attack's terminal_responses
        const headersResponse = attack.terminal_responses?.headers || 
                               attack.terminal_responses?.[`headers ${attack.id}`] ||
                               attack.terminal_responses?.[`headers ${attack.viewId}`];
        if (headersResponse) {
          return headersResponse;
        }
        return `No headers data available for ${attack.viewId || attack.id}.`;
      }
      return `Could not find ID ${args}. Use 'list' to see available items.`;
    }
    
    if (cmd === 'cat' && args) {
      const attack = findAttack(args);
      if (attack) {
        // Look for cat response in the attack's terminal_responses
        const catResponse = attack.terminal_responses?.cat || 
                           attack.terminal_responses?.[`cat ${attack.id}`] ||
                           attack.terminal_responses?.[`cat ${attack.viewId}`];
        if (catResponse) {
          return catResponse;
        }
        return `No content data available for ${attack.viewId || attack.id}.`;
      }
      return `Could not find ID ${args}. Use 'list' to see available items.`;
    }
    
    if (cmd === 'scan' && args) {
      const attack = findAttack(args);
      if (attack) {
        // Look for scan response in the attack's terminal_responses
        const scanResponse = attack.terminal_responses?.scan || 
                            attack.terminal_responses?.[`scan ${attack.id}`] ||
                            attack.terminal_responses?.[`scan ${attack.viewId}`];
        if (scanResponse) {
          return scanResponse;
        }
        return `No scan data available for ${attack.viewId || attack.id}.`;
      }
      return `Could not find ID ${args}. Use 'list' to see available items.`;
    }
    
    if (cmd === 'strings' && args) {
      const attack = findAttack(args);
      if (attack) {
        // Look for strings response in the attack's terminal_responses
        const stringsResponse = attack.terminal_responses?.strings || 
                               attack.terminal_responses?.[`strings ${attack.id}`] ||
                               attack.terminal_responses?.[`strings ${attack.viewId}`];
        if (stringsResponse) {
          return stringsResponse;
        }
        return `No strings data available for ${attack.viewId || attack.id}.`;
      }
      return `Could not find ID ${args}. Use 'list' to see available items.`;
    }
    
    if (cmd === 'grep' && args) {
      const attack = findAttack(args);
      if (attack) {
        // Look for grep response in the attack's terminal_responses
        const grepResponse = attack.terminal_responses?.grep || 
                            attack.terminal_responses?.[`grep ${attack.id}`] ||
                            attack.terminal_responses?.[`grep ${attack.viewId}`];
        if (grepResponse) {
          return grepResponse;
        }
        return `No grep data available for ${attack.viewId || attack.id}.`;
      }
      return `Could not find ID ${args}. Use 'list' to see available items.`;
    }
    
    if (cmd === 'hint' && args) {
      const attack = findAttack(args);
      if (attack) {
        return `Hint for ${attack.id}: ${attack.hint}`;
      }
      return `No hints available for ${args}.`;
    }
    
    if (cmd === 'whois' && args) {
      if (args.match(/^\d+\.\d+\.\d+\.\d+$/)) {
        return `Domain Name: [Not available]\nRegistry: IANA\nLocation: ${args}\nOrganization: Suspicious Source\nStatus: FLAGGED - Known malicious IP`;
      } else {
        return `Domain Name: ${args}\nRegistry: Generic TLD\nCreation Date: 2024-01-15\nExpiry Date: 2025-01-15\nOrganization: Private Registration\nStatus: SUSPICIOUS - Recently registered domain`;
      }
    }
    
    if (cmd === 'quarantine' && args) {
      const attack = findAttack(args);
      if (attack) {
        // Check if this is a correct action and calculate points
        const isCorrectAction = attack.correct_actions.includes('quarantine');
        const scoringKey = `${attack.id}_quarantine`;
        const alreadyScored = gameState.scoredAttacks.includes(scoringKey);
        
        if (isCorrectAction && !alreadyScored) {
          const scoreGain = attack.score?.correct || 10;
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreGain,
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              correctAttacks: [...new Set([...prev.correctAttacks, attack.id])], // Track correct actions
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              attacks: prev.gamePhase !== 'tutorial' 
                ? prev.attacks.filter(a => a.id !== attack.id) 
                : prev.attacks
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id && gameState.gamePhase !== 'tutorial') {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            setScoreNotification({ type: 'positive', amount: scoreGain });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          return `Successfully quarantined ${attack.viewId || attack.id}! +${scoreGain} points`;
        } else if (isCorrectAction && alreadyScored) {
          return `${attack.viewId || attack.id} already quarantined.`;
        } else if (!alreadyScored) {
          const scoreLoss = attack.score?.miss || -5;
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreLoss,
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              attacks: prev.gamePhase !== 'tutorial' 
                ? prev.attacks.filter(a => a.id !== attack.id) 
                : prev.attacks
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id && gameState.gamePhase !== 'tutorial') {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            console.log('Setting negative score notification:', { type: 'negative', amount: Math.abs(scoreLoss), scoreLoss });
            setScoreNotification({ type: 'negative', amount: Math.abs(scoreLoss) });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          return `WARNING: Quarantined legitimate item ${attack.viewId || attack.id}! ${scoreLoss} points`;
        } else {
          return `${attack.viewId || attack.id} already processed.`;
        }
      }
      
      // Try to find if it's a valid ID format but not in current inbox
      if (/^\d+$/.test(args)) {
        const expectedId = `id_${args.padStart(3, '0')}`;
        return `Cannot quarantine ${expectedId}. This item is not in your current inbox or has already been processed.`;
      }
      
      return `Cannot find item ${args} to quarantine. Use 'list' to see available items in your inbox.`;
    }
    
    if (cmd === 'run' && args) {
      const attack = findAttack(args);
      if (attack) {
        // Check if this is a correct action and calculate points
        const isCorrectAction = attack.correct_actions.includes('run');
        const scoringKey = `${attack.id}_run`;
        const alreadyScored = gameState.scoredAttacks.includes(scoringKey);
        
        if (isCorrectAction && !alreadyScored) {
          const scoreGain = attack.score?.correct || 10;
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreGain,
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              correctAttacks: [...new Set([...prev.correctAttacks, attack.id])], // Track correct actions
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              // Remove items from inbox when run is executed (tutorial or not)
              attacks: prev.attacks.filter(a => a.id !== attack.id)
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id) {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            setScoreNotification({ type: 'positive', amount: scoreGain });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          
          // Look for run response in terminal_responses
          const runResponse = attack.terminal_responses?.[`run ${attack.id}`] || 
                             attack.terminal_responses?.[`run ${attack.viewId}`] ||
                             `Successfully executed legitimate ${attack.type.replace('_', ' ')}!`;
          
          return runResponse + ` +${scoreGain} points`;
        } else if (isCorrectAction && alreadyScored) {
          return `${attack.viewId || attack.id} already executed.`;
        } else if (!alreadyScored) {
          const scoreLoss = attack.score?.miss || -10;
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreLoss,
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              // Remove items from inbox even when wrong action (tutorial or not)
              attacks: prev.attacks.filter(a => a.id !== attack.id)
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id) {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            setScoreNotification({ type: 'negative', amount: Math.abs(scoreLoss) });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          
          // Look for run response in terminal_responses for dangerous execution
          const runResponse = attack.terminal_responses?.[`run ${attack.id}`] || 
                             attack.terminal_responses?.[`run ${attack.viewId}`] ||
                             `Executed dangerous ${attack.type.replace('_', ' ')} - SECURITY BREACH!`;
          
          return runResponse + ` ${scoreLoss} points`;
        } else {
          return `${attack.viewId || attack.id} already processed.`;
        }
      }
      
      // Try to find if it's a valid ID format but not in current inbox
      if (/^\d+$/.test(args)) {
        const expectedId = `id_${args.padStart(3, '0')}`;
        return `Cannot run ${expectedId}. This item is not in your current inbox or has already been processed.`;
      }
      
      return `Cannot find item ${args} to run. Use 'list' to see available items in your inbox.`;
    }
    
    if (cmd === 'accept' && args) {
      const attack = findAttack(args);
      if (attack) {
        // Check if this is a correct action and calculate points
        const isCorrectAction = attack.correct_actions.includes('accept');
        const requiresRun = attack.correct_actions.includes('run');
        const requiresBrowserInput = attack.correct_actions.includes('browser_input');
        const scoringKey = `${attack.id}_accept`;
        const alreadyScored = gameState.scoredAttacks.includes(scoringKey);
        
        if (isCorrectAction && !alreadyScored) {
          const scoreGain = attack.score?.correct || 5;
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreGain,
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              correctAttacks: [...new Set([...prev.correctAttacks, attack.id])], // Track correct actions
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              attacks: prev.gamePhase !== 'tutorial' 
                ? prev.attacks.filter(a => a.id !== attack.id) 
                : prev.attacks
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id && gameState.gamePhase !== 'tutorial') {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            setScoreNotification({ type: 'positive', amount: scoreGain });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          return `Successfully accepted legitimate ${attack.viewId || attack.id}! +${scoreGain} points`;
        } else if (isCorrectAction && alreadyScored) {
          return `${attack.viewId || attack.id} already accepted.`;
w        } else if (requiresBrowserInput && !alreadyScored) {
          // When browser_input is required but accept is used instead, penalize with points loss
          const scoreLoss = attack.score?.miss || -5;
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreLoss,
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              attacks: prev.gamePhase !== 'tutorial' 
                ? prev.attacks.filter(a => a.id !== attack.id) 
                : prev.attacks
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id && gameState.gamePhase !== 'tutorial') {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            setScoreNotification({ type: 'negative', amount: Math.abs(scoreLoss) });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          return `INCORRECT: ${attack.viewId || attack.id} required browser interaction with the linked website instead of direct acceptance. ${scoreLoss} points`;
        } else if (requiresBrowserInput && alreadyScored) {
          return `${attack.viewId || attack.id} already processed - browser interaction was required.`;
        } else if (requiresRun && !alreadyScored) {
          // When run is required but accept is used instead, penalize with points loss
          const scoreLoss = attack.score?.miss || -5;
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreLoss,
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              attacks: prev.gamePhase !== 'tutorial' 
                ? prev.attacks.filter(a => a.id !== attack.id) 
                : prev.attacks
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id && gameState.gamePhase !== 'tutorial') {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            setScoreNotification({ type: 'negative', amount: Math.abs(scoreLoss) });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          return `INCORRECT: ${attack.viewId || attack.id} should have been executed/run instead of accepted. ${scoreLoss} points`;
        } else if (requiresRun && alreadyScored) {
          return `${attack.viewId || attack.id} already processed - execution was required.`;
        } else if (!alreadyScored) {
          const scoreLoss = attack.score?.miss || -5;
          setTimeout(() => {
            setGameState(prev => ({ 
              ...prev, 
              score: prev.score + scoreLoss,
              scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
              completedAttacks: [...new Set([...prev.completedAttacks, attack.id])],
              attacks: prev.gamePhase !== 'tutorial' 
                ? prev.attacks.filter(a => a.id !== attack.id) 
                : prev.attacks
            }));
            // Reset currentId if this item was selected and is being removed
            if (gameState.selectedItem?.id === attack.id && gameState.gamePhase !== 'tutorial') {
              setCurrentId('NA');
              setGameState(prev => ({ ...prev, selectedItem: null }));
            }
            setScoreNotification({ type: 'negative', amount: Math.abs(scoreLoss) });
            setTimeout(() => setScoreNotification(null), 2000);
          }, 100);
          return `WARNING: Accepted dangerous item ${attack.viewId || attack.id}! SECURITY BREACH! ${scoreLoss} points`;
        } else {
          return `${attack.viewId || attack.id} already processed.`;
        }
      }
      
      // Try to find if it's a valid ID format but not in current inbox
      if (/^\d+$/.test(args)) {
        const expectedId = `id_${args.padStart(3, '0')}`;
        return `Cannot accept ${expectedId}. This item is not in your current inbox or has already been processed.`;
      }
      
      return `Cannot find item ${args} to accept. Use 'list' to see available items in your inbox.`;
    }
    
    return `Unknown command: ${cmd}. Type 'help' for available commands.`;
  };

  const getDetailedHelp = (command) => {
    return commandHelp[command] || `No detailed help available for: ${command}`;
  };

  const triggerFeedback = (type) => {
    setGameState(prev => ({ ...prev, feedback: type }));
    setTimeout(() => {
      setGameState(prev => ({ ...prev, feedback: null }));
    }, 1000);
  };

  // Item handling
  const handleItemClick = (attack) => {
    setGameState(prev => ({ ...prev, selectedItem: attack }));
    setCurrentId(attack.viewId || attack.id);
  };

  const removeItem = (attackId) => {
    setGameState(prev => ({
      ...prev,
      attacks: prev.attacks.filter(attack => attack.id !== attackId),
      completedAttacks: prev.completedAttacks.filter(id => id !== attackId),
      scoredAttacks: prev.scoredAttacks.filter(id => id !== attackId),
      selectedItem: prev.selectedItem?.id === attackId ? null : prev.selectedItem
    }));
    
    // Reset currentId when the selected item is removed
    setGameState(prev => {
      if (prev.selectedItem?.id === attackId) {
        setCurrentId('NA');
        return { ...prev, selectedItem: null };
      }
      return prev;
    });
  };

  // Game progression
  const endDay = () => {
    playEndday();
    
    const summaryData = {
      attacks: gameState.allAttacks,
      completedAttacks: gameState.completedAttacks,
      correctAttacks: gameState.correctAttacks, // Include correct attacks
      scoredAttacks: gameState.scoredAttacks,
      score: gameState.score
    };
    
    setGameState(prev => ({ 
      ...prev, 
      gamePhase: 'summary',
      summaryData: summaryData
    }));
  };

  const nextDay = () => {
    const nextDayNum = gameState.currentDay + 1;
    setGameState(prev => ({ ...prev, gamePhase: 'nextDay', currentDay: nextDayNum }));
    
    setTimeout(() => {
      const shuffledAttacks = [...attacksData.attacks].sort(() => 0.5 - Math.random()).slice(0, Math.min(3 + Math.floor(nextDayNum / 2), 5));
      
      setGameState(prev => ({ 
        ...prev, 
        attacks: shuffledAttacks,
        allAttacks: shuffledAttacks,
        selectedItem: null,
        completedAttacks: [],
        correctAttacks: [],
        scoredAttacks: [], // Clear scored attacks so players can interact with duplicate attacks
        gamePhase: 'active',
        terminalHistory: [
          `ZeroDay Defense Security Terminal v1.0 - Day ${nextDayNum}`,
          '=====================================',
          `Welcome to Day ${nextDayNum}. You have ${shuffledAttacks.length} security incidents to investigate.`,
          'Type "help" for available commands or "list" to see current items.',
          ''
        ]
      }));
    }, 4000);
  };

  const closeCommandGuideModal = () => {
    setCommandGuideModal(null);
  };

  const openCommandGuideModal = (attack) => {
    setCommandGuideModal(attack);
  };

  // Phishing form handlers
  const checkForRealInfo = (formData) => {
    const enteredName = formData.fullName.toLowerCase().trim();
    const enteredId = formData.employeeId.toLowerCase().trim();
    const enteredEmail = formData.email.toLowerCase().trim();
    const enteredBankUser = formData.bankUsername.toLowerCase().trim();
    const enteredBankPass = formData.bankPassword.toLowerCase().trim();
    const enteredUsername = formData.username.toLowerCase().trim();
    const enteredPassword = formData.password.toLowerCase().trim();
    const enteredPersonalEmail = formData.personalEmail ? formData.personalEmail.toLowerCase().trim() : '';
    const enteredSSN = formData.ssn.toLowerCase().trim();
    const enteredPhone = formData.phone ? formData.phone.toLowerCase().trim() : '';

    const usedRealInfo = (
      enteredName === realEmployeeInfo.fullName.toLowerCase() ||
      enteredId === realEmployeeInfo.employeeId.toLowerCase() ||
      enteredId === realEmployeeInfo.badgeId.toLowerCase() ||
      enteredEmail === realEmployeeInfo.email.toLowerCase() ||
      enteredEmail === realEmployeeInfo.personalEmail.toLowerCase() ||
      enteredBankUser === realEmployeeInfo.bankUsername.toLowerCase() ||
      enteredBankPass === realEmployeeInfo.bankPassword.toLowerCase() ||
      enteredUsername === realEmployeeInfo.username.toLowerCase() ||
      enteredPassword === realEmployeeInfo.personalEmailPassword.toLowerCase() ||
      enteredPersonalEmail === realEmployeeInfo.personalEmail.toLowerCase() ||
      enteredSSN === realEmployeeInfo.ssn ||
      enteredSSN === realEmployeeInfo.ssnLast4 ||
      enteredPhone === realEmployeeInfo.phone ||
      enteredPhone === realEmployeeInfo.mobile ||
      enteredPhone === realEmployeeInfo.homePhone
    );

    return usedRealInfo;
  };

  const handlePhishingFormSubmit = () => {
    const usedRealInfo = checkForRealInfo(phishingFormData);
    
    // Determine which website domain we're on
    const currentDomain = browserUrl.toLowerCase();
    let isLegitimateWebsite = false;
    let relatedAttackId = null;
    
    // Check if we're on a legitimate website
    if (currentDomain.includes('scan.company.xyz')) {
      isLegitimateWebsite = true;
      relatedAttackId = 'msg_020';
    } else if (currentDomain.includes('portal.company.xyz')) {
      isLegitimateWebsite = true;
      relatedAttackId = 'msg_019';
    }
    
    // Check if we're on malicious websites
    if (currentDomain.includes('verify-now.zyx') || currentDomain.includes('portal.companies.xyz') || currentDomain.includes('secure-bank.company.com')) {
      isLegitimateWebsite = false;
      // Find the related attack ID based on domain
      if (currentDomain.includes('verify-now.zyx')) {
        relatedAttackId = 'msg_001';
      } else if (currentDomain.includes('portal.companies.xyz')) {
        relatedAttackId = 'msg_021';
      } else if (currentDomain.includes('secure-bank.company.com')) {
        relatedAttackId = 'msg_007';
      }
    }
    
    // Find the related attack
    const relatedAttack = gameState.attacks.find(attack => 
      attack.id === relatedAttackId || attack.viewId === relatedAttackId
    );
    
    if (relatedAttack) {
      const scoringKey = `${relatedAttack.id}_browser_input`;
      const alreadyScored = gameState.scoredAttacks.includes(scoringKey);
      
      if (!alreadyScored) {
        if (isLegitimateWebsite && usedRealInfo) {
          // Entered real info on legitimate website - CORRECT!
          const scoreGain = relatedAttack.score?.correct || 18;
          
          setGameState(prev => ({
            ...prev,
            score: prev.score + scoreGain,
            completedAttacks: [...new Set([...prev.completedAttacks, relatedAttack.id])],
            correctAttacks: [...new Set([...prev.correctAttacks, relatedAttack.id])],
            scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
            // Remove from inbox when correctly completed
            attacks: prev.gamePhase !== 'tutorial' 
              ? prev.attacks.filter(a => a.id !== relatedAttack.id) 
              : prev.attacks
          }));
          
          // Reset currentId if this item was selected and is being removed
          if (gameState.selectedItem?.id === relatedAttack.id && gameState.gamePhase !== 'tutorial') {
            setCurrentId('NA');
            setGameState(prev => ({ ...prev, selectedItem: null }));
          }
          
          setScoreNotification({ type: 'positive', amount: scoreGain });
          setTimeout(() => setScoreNotification(null), 2000);
          
          alert(`✅ CORRECT! You properly entered real information on a legitimate company website! +${scoreGain} points`);
          
          // Add to terminal history
          setGameState(prev => ({
            ...prev,
            terminalHistory: [...prev.terminalHistory,
              `[BROWSER INPUT] Real information entered on legitimate website: ${currentDomain}`,
              `[SCORE] +${scoreGain} points for correctly completing security check`,
              `[STATUS] Attack ${relatedAttack.viewId || relatedAttack.id} resolved successfully`
            ]
          }));
          
        } else if (isLegitimateWebsite && !usedRealInfo) {
          // Entered fake info on legitimate website - INCORRECT!
          const scoreLoss = relatedAttack.score?.miss || -18;
          
          setGameState(prev => ({
            ...prev,
            score: prev.score + scoreLoss,
            completedAttacks: [...new Set([...prev.completedAttacks, relatedAttack.id])],
            scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
            // Remove from inbox even when incorrect
            attacks: prev.gamePhase !== 'tutorial' 
              ? prev.attacks.filter(a => a.id !== relatedAttack.id) 
              : prev.attacks
          }));
          
          // Reset currentId if this item was selected and is being removed
          if (gameState.selectedItem?.id === relatedAttack.id && gameState.gamePhase !== 'tutorial') {
            setCurrentId('NA');
            setGameState(prev => ({ ...prev, selectedItem: null }));
          }
          
          setScoreNotification({ type: 'negative', amount: Math.abs(scoreLoss) });
          setTimeout(() => setScoreNotification(null), 2000);
          
          alert(`❌ INCORRECT! You should enter your real information on legitimate company websites! ${scoreLoss} points`);
          
          // Add to terminal history
          setGameState(prev => ({
            ...prev,
            terminalHistory: [...prev.terminalHistory,
              `[BROWSER INPUT] Fake information entered on legitimate website: ${currentDomain}`,
              `[SCORE] ${scoreLoss} points for incorrect action`,
              `[TIP] Use real credentials on legitimate company websites`
            ]
          }));
          
        } else if (!isLegitimateWebsite && usedRealInfo) {
          // Entered real info on malicious website - SECURITY BREACH!
          const scoreLoss = relatedAttack.score?.miss || -50;
          
          setGameState(prev => ({
            ...prev,
            score: prev.score + scoreLoss,
            completedAttacks: [...new Set([...prev.completedAttacks, relatedAttack.id])],
            scoredAttacks: [...new Set([...prev.scoredAttacks, scoringKey])],
            // Remove from inbox when action is taken (even if wrong)
            attacks: prev.gamePhase !== 'tutorial' 
              ? prev.attacks.filter(a => a.id !== relatedAttack.id) 
              : prev.attacks
          }));
          
          // Reset currentId if this item was selected and is being removed
          if (gameState.selectedItem?.id === relatedAttack.id && gameState.gamePhase !== 'tutorial') {
            setCurrentId('NA');
            setGameState(prev => ({ ...prev, selectedItem: null }));
          }
          
          setScoreNotification({ type: 'negative', amount: Math.abs(scoreLoss) });
          setTimeout(() => setScoreNotification(null), 2000);
          
          alert(`⚠️ SECURITY BREACH! You entered real employee information on a suspicious website! ${scoreLoss} points`);
          
          // Add to terminal history
          setGameState(prev => ({
            ...prev,
            terminalHistory: [...prev.terminalHistory,
              `[SECURITY ALERT] Real employee information detected on phishing site: ${currentDomain}`,
              `[SCORE] ${scoreLoss} points deducted for security breach`,
              `[TIP] Always verify website domains before entering personal information`
            ]
          }));
          
        } else {
          // Entered fake info on malicious website - Good job!
          alert('✅ Good job! You avoided entering real information on a suspicious website.');
          
          // Add to terminal history
          setGameState(prev => ({
            ...prev,
            terminalHistory: [...prev.terminalHistory,
              `[BROWSER INPUT] Fake information entered on suspicious website: ${currentDomain}`,
              `[STATUS] No points deducted - avoided security breach`
            ]
          }));
        }
      } else {
        alert('You have already completed this action for this attack.');
      }
    } else {
      // Generic handling for when no specific attack is found
      if (usedRealInfo) {
        alert('⚠️ SECURITY BREACH! You entered real employee information on a suspicious website! -50 points');
        setGameState(prev => ({
          ...prev,
          score: prev.score - 50,
          terminalHistory: [...prev.terminalHistory,
            `[SECURITY ALERT] Real employee information detected on suspicious site!`,
            `[SCORE] -50 points deducted for security breach`,
            `[TIP] Always check website domains before entering personal information`
          ]
        }));
      } else {
        alert('Action Completed Successfully.');
      }
    }
    
    // Clear form
    setPhishingFormData({
      employeeId: '',
      fullName: '',
      password: '',
      ssn: '',
      email: '',
      bankUsername: '',
      bankPassword: '',
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      accountNumber: '',
      routingNumber: '',
      beneficiaryBank: '',
      beneficiaryName: '',
      transferAmount: '',
      authCode: '',
      personalEmail: '',
      phone: ''
    });
  };

  // Browser page renderer
  const renderBrowserPage = (url) => {
    return handleUrlNavigation(url, {
      formData: phishingFormData,
      onFormChange: setPhishingFormData,
      onPhishingSubmit: handlePhishingFormSubmit,
      currentAttacks: gameState.attacks
    });
  };

  // Image helper
  const getIconSrc = (iconName) => {
    const iconMap = {
      'email.png': '/icons/email.png',
      'usb.png': '/icons/folder.png',
      'file.png': '/icons/folder.png',
      'network.png': '/icons/terminal.png',
      'alert.png': '/icons/folder.png'
    };
    return iconMap[iconName] || '/icons/folder.png';
  };

  // Render different game phases
  if (gameState.gamePhase === 'welcome') {
    return (
      <div className="intro-screen" style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
        <div className="intro-content" style={{ maxWidth: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <div className="welcome-logo" style={{ textAlign: 'center', wordWrap: 'break-word' }}>
            <h1 style={{ margin: '0 auto', maxWidth: '100%', fontSize: 'clamp(2rem, 8vw, 4rem)' }}>ZeroDay Defense</h1>
            <p style={{ margin: '10px auto', maxWidth: '100%', fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>Do not falter.</p>
          </div>
          <div className="intro-buttons" style={{ textAlign: 'center', width: '100%' }}>
            <span 
              className="welcome-text"
              style={{
                color: 'rgba(0, 255, 0, 0.7)',
                fontFamily: 'Courier New, monospace',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                cursor: 'pointer',
                display: 'inline-block',
                maxWidth: '100%',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap'
              }}
              onClick={() => { playBtnClick(); startIntro(); }}
            >
              {welcomeText || ""}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.gamePhase === 'intro') {
    return (
      <div className="intro-screen">
        <div className="intro-content">
          <div className="intro-skip-hint">Press ESC to skip animation</div>
          <pre className="intro-text">{introText}</pre>
          {introComplete && (
            <div className="intro-buttons">
              <button 
                className="intro-btn primary" 
                onClick={() => { playBtnClick(); startGame(); }}
                onMouseEnter={playBtnHover}
              >
                START TUTORIAL
              </button>
              <button 
                className="intro-btn secondary" 
                onClick={() => { playBtnClick(); skipTutorial(); }}
                onMouseEnter={playBtnHover}
              >
                SKIP TO DAY 1
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState.gamePhase === 'nextDay') {
    return (
      <div className="day-transition">
        <div className="day-content">
          <h1 className="day-title">DAY {gameState.currentDay}</h1>
          <div className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </div>
          <p>Preparing security incidents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`vm-desktop ${gameState.feedback ? `feedback-${gameState.feedback}` : ''}`}>
      <Header 
        gameState={gameState}
        currentId={currentId}
        setNotepadOpen={setNotepadOpen}
        setTipsOpen={setTipsOpen}
        setBrowserOpen={handleBrowserOpen}
        playBtnClick={playBtnClick}
        playBtnHover={playBtnHover}
      />
      
      <Tutorial 
        gameState={gameState}
        tutorialVisible={tutorialVisible}
        setTutorialVisible={setTutorialVisible}
        tutorialPosition={tutorialPosition}
        isDragging={isDragging}
        handleTutorialMouseDown={handleTutorialMouseDown}
        nextTutorialStep={nextTutorialStep}
        skipTutorial={skipTutorial}
        playBtnClick={playBtnClick}
        playBtnHover={playBtnHover}
      />

      <Browser 
        browserOpen={browserOpen}
        setBrowserOpen={setBrowserOpen}
        browserUrl={browserUrl}
        setBrowserUrl={setBrowserUrl}
        setTerminalHistory={setGameState}
        renderBrowserPage={renderBrowserPage}
        setNotepadOpen={setNotepadOpen}
      />

      <NotepadModal 
        notepadOpen={notepadOpen}
        setNotepadOpen={setNotepadOpen}
      />

      <TipsModal 
        tipsOpen={tipsOpen}
        setTipsOpen={setTipsOpen}
      />

      <CommandGuideModal 
        commandGuideModal={commandGuideModal}
        closeCommandGuideModal={closeCommandGuideModal}
      />
      
      {/* Main content area */}
      <div className="vm-panels">
        <div className="left-panel">
          <h3>Inbox & Devices</h3>
          <div className="items-list">
            {gameState.attacks.map((attack) => (
              <div 
                key={attack.id}
                className={`item ${gameState.selectedItem?.id === attack.id ? 'selected' : ''} ${gameState.completedAttacks.includes(attack.id) ? 'completed' : ''}`}
                onClick={() => handleItemClick(attack)}
                onMouseEnter={() => setHoveredItem(attack)}
                onMouseLeave={() => setHoveredItem(null)}
                title={`ID: ${attack.id} | Difficulty: ${attack.difficulty}`}
              >
                <img 
                  src={getIconSrc(attack.visual?.icon || 'email.png')} 
                  alt={attack.type}
                  className="item-icon"
                />
                <div className="item-info">
                  <div className="item-title">{attack.title}</div>
                  <div className="item-id">ID: {attack.viewId || attack.id}</div>
                  <div className="item-preview">
                    {attack.visual?.preview?.sender && `From: ${attack.visual.preview.sender}`}
                    {attack.visual?.preview?.filename && `File: ${attack.visual.preview.filename}`}
                    {attack.visual?.preview?.summary && attack.visual.preview.summary}
                  </div>
                  {gameState.completedAttacks.includes(attack.id) && (
                    <div className="completion-badge">[RESOLVED]</div>
                  )}
                </div>
                {gameState.completedAttacks.includes(attack.id) && hoveredItem?.id === attack.id && (
                  <button 
                    className="remove-item-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(attack.id);
                    }}
                    title="Remove from inbox"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="main-panel">
          {gameState.selectedItem ? (
            <div className="content-display">
              <h3>{gameState.selectedItem.title}</h3>
              <div className="content-body">
                {gameState.selectedItem.content?.body && (
                  <div className="email-content">
                    <pre>{formatContent(gameState.selectedItem.content.body)}</pre>
                  </div>
                )}
                {gameState.selectedItem.content?.body_full && (
                  <div className="email-content">
                    <pre>{formatContent(gameState.selectedItem.content.body_full)}</pre>
                  </div>
                )}
                {gameState.selectedItem.content?.text && (
                  <div className="file-content">
                    <h4>File Contents:</h4>
                    <pre>{formatContent(gameState.selectedItem.content.text)}</pre>
                  </div>
                )}
                {gameState.selectedItem.content?.transcript && (
                  <div className="transcript-content">
                    <h4>Call Transcript:</h4>
                    <pre style={{ 
                      whiteSpace: 'pre-wrap', 
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word',
                      maxWidth: '100%',
                      overflow: 'auto'
                    }}>{formatContent(gameState.selectedItem.content.transcript)}</pre>
                  </div>
                )}
                {gameState.selectedItem.content?.logs && (
                  <div className="logs-content">
                    <h4>Network Logs:</h4>
                    <pre>{gameState.selectedItem.content.logs.join('\n')}</pre>
                    {gameState.selectedItem.content.pcap_summary && (
                      <div className="log-summary">
                        <strong>Summary:</strong> {gameState.selectedItem.content.pcap_summary}
                      </div>
                    )}
                  </div>
                )}
                {gameState.selectedItem.content?.alert && (
                  <div className="alert-content">
                    <h4>System Alert</h4>
                    <pre>{formatContent(gameState.selectedItem.content.alert)}</pre>
                  </div>
                )}
                {gameState.selectedItem.content?.files && (
                  <div className="usb-content">
                    <h4>USB Contents:</h4>
                    {gameState.selectedItem.content.files.map((file, index) => (
                      <div key={index} className="file-item">
                        <strong>{file.name}</strong>
                        {file.content !== '<binary>' && (
                          <pre>{file.content}</pre>
                        )}
                        {file.content === '<binary>' && (
                          <div className="binary-file">Binary file - use 'strings' command to analyze</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="content-placeholder">
              {gameState.attacks.length === 0 ? (
                <div>
                  <p>All items have been processed!</p>
                  <p>Great work! You've handled all the threats and legitimate items for today.</p>
                  <p>Type 'endday' in the terminal to complete Day {gameState.currentDay} and see your results.</p>
                </div>
              ) : (
                <p>Select an item from the left panel to view its contents</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Terminal Panel */}
      <div 
        className="terminal-panel" 
        style={{ height: `${terminalHeight}px` }}
        onClick={(e) => {
          if (window.getSelection().toString().length === 0) {
            document.querySelector('.terminal-input')?.focus();
          }
        }}
      >
        <div 
          className="terminal-resize-handle"
          onMouseDown={(e) => {
            setIsResizing(true);
            const startY = e.clientY;
            const startHeight = terminalHeight;
            
            const handleMouseMove = (e) => {
              const newHeight = Math.max(150, Math.min(500, startHeight - (e.clientY - startY)));
              setTerminalHeight(newHeight);
            };
            
            const handleMouseUp = () => {
              setIsResizing(false);
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          <div className="resize-line"></div>
        </div>
        
        <div className="terminal-header">
          <span>Security Terminal</span>
          {currentId && (
            <span className="current-id-indicator">
              Current ID: <strong>{currentId}</strong>
            </span>
          )}
          <span className="terminal-help">Click anywhere to type • Try "help cat" for examples</span>
        </div>
        <div className="terminal-content">
          <div className="terminal-history" id="terminal-history">
            {gameState.terminalHistory.map((line, index) => (
              <div key={index} className={`terminal-line ${line.startsWith('$') ? 'command' : 'output'}`}>
                {line}
              </div>
            ))}
          </div>
          <div className="terminal-input-line">
            <span className="terminal-prompt">$ </span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (gameState.gamePhase === 'tutorial') {
                    handleTutorialCommand(terminalInput);
                  } else {
                    handleTerminalCommand(terminalInput);
                  }
                  setTerminalInput('');
                  setTimeout(() => {
                    const historyEl = document.getElementById('terminal-history');
                    if (historyEl) {
                      historyEl.scrollTop = historyEl.scrollHeight;
                    }
                  }, 100);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  if (commandHistory.length > 0) {
                    const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                    setHistoryIndex(newIndex);
                    setTerminalInput(commandHistory[newIndex]);
                  }
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  if (historyIndex >= 0) {
                    const newIndex = historyIndex + 1;
                    if (newIndex >= commandHistory.length) {
                      setHistoryIndex(-1);
                      setTerminalInput('');
                    } else {
                      setHistoryIndex(newIndex);
                      setTerminalInput(commandHistory[newIndex]);
                    }
                  }
                }
              }}
              className="terminal-input"
              placeholder="Type a command..."
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Score Notification */}
      {scoreNotification && (
        <div className="score-notification-overlay">
          <div className={`score-notification-center ${scoreNotification.type}`}>
            {scoreNotification.type === 'positive' ? '+' : '-'}{scoreNotification.amount}
          </div>
        </div>
      )}

      {/* Summary Modal */}
      {gameState.gamePhase === 'summary' && (
        <div className="summary-modal">
          <div className="summary-content">
            <h2>Day {gameState.currentDay} Summary</h2>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-label">Incidents Resolved:</span>
                <span className="stat-value">{gameState.correctAttacks.length}/{gameState.allAttacks.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Score Earned:</span>
                <span className="stat-value">{gameState.score}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Performance:</span>
                <span className="stat-value">
                  {gameState.correctAttacks.length >= gameState.allAttacks.length * 0.8 ? 'Excellent' :
                   gameState.correctAttacks.length >= gameState.allAttacks.length * 0.6 ? 'Good' :
                   gameState.correctAttacks.length >= gameState.allAttacks.length * 0.4 ? 'Fair' : 'Poor'}
                </span>
              </div>
            </div>
            
            <div className="postmortem-analysis">
              <h3>Post-mortem Analysis:</h3>
              
              {gameState.summaryData && gameState.summaryData.correctAttacks && gameState.summaryData.correctAttacks.length > 0 && (
                <div className="correctly-handled">
                  <h4>Successfully Handled Incidents:</h4>
                  {gameState.summaryData.attacks
                    .filter(attack => gameState.summaryData.correctAttacks.includes(attack.id))
                    .map(attack => {
                      const scoringKey = `${attack.id}_quarantine`;
                      const wasQuarantined = gameState.summaryData.scoredAttacks.includes(scoringKey);
                      const acceptKey = `${attack.id}_accept`;
                      const wasAccepted = gameState.summaryData.scoredAttacks.includes(acceptKey);
                      
                      return (
                        <div key={attack.id} className="handled-incident-correct">
                          <div className="incident-header">
                            <strong>{attack.title}</strong>
                            <button 
                              className="command-guide-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                openCommandGuideModal(attack);
                              }}
                            >
                              Show Expected Commands
                            </button>
                          </div>
                          <p>
                            {wasQuarantined && attack.correct_actions.includes('quarantine') && 
                              `Correctly quarantined this ${attack.type.replace('_', ' ')}. ${attack.postmortem || 'Threat neutralized successfully.'}`
                            }
                            {wasAccepted && attack.correct_actions.includes('accept') && 
                              `Correctly accepted this legitimate ${attack.type.replace('_', ' ')}. ${attack.postmortem || 'No security risk identified.'}`
                            }
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <button className="next-day-btn" onClick={nextDay}>
              Continue to Day {gameState.currentDay + 1}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;