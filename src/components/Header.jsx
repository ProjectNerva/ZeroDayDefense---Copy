import React from 'react';
import '../styles/Header.css';

const Header = ({
  gameState,
  currentId,
  setNotepadOpen,
  setTipsOpen,
  setBrowserOpen,
  playBtnClick,
  playBtnHover
}) => {
  return (
    <div className="header">
      <div className="header-left">
        <h1>Zero Day Defense</h1>
        <div className="header-info">
          <span>Day {gameState.currentDay} | Score: {gameState.score}</span>
          {gameState.gamePhase === 'active' && (
            <span> | Current ID: {currentId}</span>
          )}
        </div>
      </div>
      <div className="header-buttons">
        <button 
          className="header-btn" 
          onClick={() => { playBtnClick(); setNotepadOpen(true); }}
          onMouseEnter={playBtnHover}
          title="Employee Notes"
        >
          <img src="/icons/notepad.png" alt="Notes" className="header-icon" />
          Notes
        </button>
        <button 
          className="header-btn" 
          onClick={() => { playBtnClick(); setTipsOpen(true); }}
          onMouseEnter={playBtnHover}
          title="Quick Tips"
        >
          <img src="/icons/tip.png" alt="Tips" className="header-icon" />
          Tips
        </button>
        <button 
          className="header-btn" 
          onClick={() => { playBtnClick(); setBrowserOpen(true); }}
          onMouseEnter={playBtnHover}
          title="VM Browser"
        >
          <img src="/icons/VM.svg" alt="Browser" className="header-icon" />
          Browser
        </button>
      </div>
    </div>
  );
};

export default Header;