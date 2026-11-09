import React from 'react';
import '../styles/Browser.css';

const Browser = ({
  browserOpen,
  setBrowserOpen,
  browserUrl,
  setBrowserUrl,
  setTerminalHistory,
  renderBrowserPage,
  setNotepadOpen
}) => {
  return (
    <>
      {/* Browser Modal */}
      {browserOpen && (
        <div className="modal-overlay" onClick={() => setBrowserOpen(false)}>
          <div className="browser-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="browser-header-content">
                <img src="/icons/VM.svg" alt="VM" className="vm-icon" />
                <h3>VM Browser</h3>
              </div>
              <div className="browser-header-actions">
                <button 
                  className="notes-btn" 
                  onClick={() => setNotepadOpen(true)}
                  title="Employee Notes"
                >
                  <img src="/icons/notepad.png" alt="Notes" className="notes-icon" />
                </button>
                <button className="close-btn" onClick={() => setBrowserOpen(false)}>×</button>
              </div>
            </div>
            <div className="browser-container">
              <div className="browser-address-bar">
                <input 
                  type="text" 
                  value={browserUrl} 
                  onChange={(e) => setBrowserUrl(e.target.value)}
                  placeholder="Enter URL to visit..."
                  className="browser-input"
                />
              </div>
              <div className="browser-content">
                {browserUrl ? (
                  renderBrowserPage(browserUrl)
                ) : (
                  <div className="browser-placeholder">
                    <h3>VM Browser</h3>
                    <p>Enter a URL above to safely investigate suspicious links in this isolated environment.</p>
                    <p><strong>Use this to:</strong></p>
                    <ul>
                      <li>Safely visit URLs found in emails</li>
                      <li>Investigate malicious websites</li>
                      <li>Check redirect chains</li>
                      <li>Analyze phishing pages</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Browser;