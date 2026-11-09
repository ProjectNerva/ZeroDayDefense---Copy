import React from 'react';
import { tutorialSteps } from '../utils/gameData';
import '../styles/Tutorial.css';

const Tutorial = ({
  gameState,
  tutorialVisible,
  setTutorialVisible,
  tutorialPosition,
  isDragging,
  handleTutorialMouseDown,
  nextTutorialStep,
  skipTutorial,
  playBtnClick,
  playBtnHover
}) => {
  return (
    <>
      {gameState.gamePhase === 'tutorial' && (
        <>
          <div 
            className={`tutorial-overlay ${tutorialVisible ? 'visible' : 'hidden'}`}
            style={{
              position: 'fixed',
              left: tutorialVisible ? `${tutorialPosition.x}px` : 'auto',
              top: `${tutorialPosition.y}px`,
              right: tutorialVisible ? 'auto' : '-420px', // Move completely off screen when hidden
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              width: '400px',
              maxHeight: '60vh',
              overflowY: 'auto'
            }}
            onMouseDown={handleTutorialMouseDown}
          >
            <div className="tutorial-panel">
              <div className="tutorial-header">
                <h3>{tutorialSteps[gameState.tutorialStep].title}</h3>
                <div className="tutorial-controls">
                  <div className="tutorial-progress">
                    Step {gameState.tutorialStep + 1} of {tutorialSteps.length}
                  </div>
                  <button 
                    className="tutorial-hide-btn"
                    onClick={() => setTutorialVisible(false)}
                    title="Hide tutorial panel"
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="tutorial-content">
                <p>{tutorialSteps[gameState.tutorialStep].content}</p>
                <div className="tutorial-instruction">
                  <strong>Action:</strong> {tutorialSteps[gameState.tutorialStep].instruction}
                </div>
              </div>
              {!tutorialSteps[gameState.tutorialStep].expectedCommand && (
                <div className="tutorial-buttons">
                  <button className="tutorial-btn" onClick={() => { playBtnClick(); nextTutorialStep(); }} onMouseEnter={playBtnHover}>
                    {gameState.tutorialStep === tutorialSteps.length - 1 ? 'Finish Tutorial' : 'Next'}
                  </button>
                  {gameState.tutorialStep === 0 && (
                    <button className="tutorial-btn secondary" onClick={() => { playBtnClick(); skipTutorial(); }} onMouseEnter={playBtnHover}>
                      Skip Tutorial
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Tutorial Show Button */}
          {!tutorialVisible && (
            <div className="tutorial-show-btn" onClick={() => setTutorialVisible(true)}>
              ←
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Tutorial;