import React from 'react';
import '../styles/Modals.css';
import { realEmployeeInfo } from '../utils/gameData';

const NotepadModal = ({ notepadOpen, setNotepadOpen }) => {
  return (
    <>
      {/* Employee Info Modal */}
      {notepadOpen && (
        <div className="modal-overlay notepad-overlay" onClick={() => setNotepadOpen(false)}>
          <div className="notepad-modal" onClick={(e) => e.stopPropagation()} style={{ 
            backgroundColor: '#1e1e1e', 
            border: '1px solid #404040',
            color: '#e0e0e0'
          }}>
            <div className="modal-header" style={{ backgroundColor: '#2d2d2d', borderBottom: '1px solid #404040' }}>
              <h3 style={{ color: '#e0e0e0' }}>Employee Information</h3>
              <button className="close-btn" onClick={() => setNotepadOpen(false)} style={{ 
                backgroundColor: '#404040', 
                color: '#e0e0e0', 
                border: 'none' 
              }}>×</button>
            </div>
            <div className="notepad-content">
              <div className="employee-info-content" style={{ 
                padding: '20px', 
                fontFamily: 'monospace', 
                fontSize: '14px',
                background: '#2d2d2d',
                border: '1px solid #404040',
                borderRadius: '5px',
                height: '400px',
                overflow: 'auto',
                color: '#e0e0e0'
              }}>
                <h4 style={{ marginTop: '0', color: '#4fc3f7', borderBottom: '2px solid #4fc3f7', paddingBottom: '10px' }}>
                  🏢 Company Employee Profile
                </h4>
                
                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#81c784' }}>📋 Personal Information:</strong><br />
                  • Full Name: {realEmployeeInfo.fullName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}<br />
                  • Employee ID: {realEmployeeInfo.employeeId}<br />
                  • Department: {realEmployeeInfo.department}<br />
                  • Position: {realEmployeeInfo.position}<br />
                  • Office Location: {realEmployeeInfo.officeLocation}<br />
                  • Phone: {realEmployeeInfo.phone}<br />
                  • Email: {realEmployeeInfo.email}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#81c784' }}>🌐 Company Information:</strong><br />
                  • Company Website: <span style={{ color: '#4fc3f7', fontWeight: 'bold' }}>company.xyz</span><br />
                  • HR Portal: hr.company.xyz<br />
                  • Payroll System: payroll.company.xyz<br />
                  • Employee Self-Service: portal.company.xyz<br />
                  • IT Support: support.company.xyz <br />
                  • Employee Self-Scan: scan.company.xyz
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#81c784' }}>🔐 Login Credentials:</strong><br />
                  • Network Username: {realEmployeeInfo.username}<br />
                  • Badge ID: {realEmployeeInfo.badgeId}<br />
                  • VPN Access: Enabled<br />
                  • Security Clearance: Level 2
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#81c784' }}>🆔 Personal Identification:</strong><br />
                  • Social Security Number: {realEmployeeInfo.ssn}<br />
                  • Driver's License: {realEmployeeInfo.driversLicense} (TX)<br />
                  • Date of Birth: {realEmployeeInfo.dateOfBirth}<br />
                  • Mother's Maiden Name: {realEmployeeInfo.mothersMaidenName}<br />
                  • First Pet's Name: {realEmployeeInfo.firstPetName}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#81c784' }}>🏦 Financial Information:</strong><br />
                  • Banking Username: {realEmployeeInfo.bankUsername}<br/>
                  • Banking Password: {realEmployeeInfo.bankPassword}<br />
                  • Bank Account: {realEmployeeInfo.bankAccount} (Wells Fargo)<br />
                  • Credit Card: {realEmployeeInfo.creditCard} (Visa, exp 12/27)<br />
                  • Security Code: {realEmployeeInfo.securityCode}<br />
                  • Annual Salary: {realEmployeeInfo.annualSalary}<br />
                  • Direct Deposit Routing: {realEmployeeInfo.directDepositRouting}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#81c784' }}>🏠 Personal Details:</strong><br />
                  • Home Address: {realEmployeeInfo.homeAddress}<br />
                  • Home Phone: {realEmployeeInfo.homePhone}<br />
                  • Mobile Phone: {realEmployeeInfo.mobile}<br />
                  • Emergency Contact: {realEmployeeInfo.emergencyContact} (Spouse)<br />
                  • Emergency Phone: {realEmployeeInfo.emergencyPhone}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#81c784' }}>🔐 Security Information:</strong><br />
                  • Personal Email: {realEmployeeInfo.personalEmail}<br />
                  • Personal Email Password: {realEmployeeInfo.personalEmailPassword}<br />
                  • Security Questions:<br />
                  &nbsp;&nbsp;- Favorite color? {realEmployeeInfo.favoriteColor}<br />
                  &nbsp;&nbsp;- First school? {realEmployeeInfo.firstSchool}<br />
                  &nbsp;&nbsp;- Childhood friend? {realEmployeeInfo.childhoodFriend}
                </div>
              </div>
            </div>
            <div className="notepad-footer">
              <button 
                className="notepad-btn secondary"
                onClick={() => setNotepadOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TipsModal = ({ tipsOpen, setTipsOpen }) => {
  return (
    <>
      {/* Tips Modal */}
      {tipsOpen && (
        <div className="modal-overlay" onClick={() => setTipsOpen(false)}>
          <div className="tips-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Quick Tips - Threat Detection Guide</h3>
              <button className="close-btn" onClick={() => setTipsOpen(false)}>×</button>
            </div>
            <div className="tips-content">
              <div className="tip-section">
                <h4>🔍 Identifying Suspicious Emails</h4>
                <ul>
                  <li>Unknown or suspicious sender addresses</li>
                  <li>Urgent language creating false deadlines</li>
                  <li>Generic greetings ("Dear Customer")</li>
                  <li>Spelling and grammar errors</li>
                  <li>Requests for sensitive information</li>
                  <li>Suspicious links or attachments</li>
                </ul>
              </div>
              
              <div className="tip-section">
                <h4>🌐 Domain Verification</h4>
                <ul>
                  <li>Company domains end in <strong>.xyz</strong></li>
                  <li>Be suspicious of similar domains (.zyx, .com, etc.)</li>
                  <li>Check for extra characters or misspellings</li>
                  <li>Use the VM browser to safely investigate links</li>
                </ul>
              </div>
              
              <div className="tip-section">
                <h4>⚡ Quick Commands</h4>
                <ul>
                  <li><code>analyze &lt;id&gt;</code> - Examine email content</li>
                  <li><code>quarantine &lt;id&gt;</code> - Isolate threats</li>
                  <li><code>accept &lt;id&gt;</code> - Mark as legitimate</li>
                  <li><code>browser</code> - Open VM browser</li>
                  <li><code>help</code> - Show all commands</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CommandGuideModal = ({ commandGuideModal, closeCommandGuideModal }) => {
  // Generate appropriate commands based on attack data
  const generateCommands = (attack) => {
    if (!attack) return [];
    
    const commands = [];
    
    // Add basic analysis commands for all attacks
    commands.push({
      command: `cat ${attack.viewId || attack.id}`,
      description: "View content details"
    });
    
    commands.push({
      command: `scan ${attack.viewId || attack.id}`,
      description: "Scan for threats"
    });
    
    // Add type-specific commands
    if (attack.type === 'email' || attack.type === 'legitimate_email') {
      commands.push({
        command: `headers ${attack.viewId || attack.id}`,
        description: "Check email headers"
      });
    }
    
    if (attack.type === 'usb_drop' || attack.type === 'legitimate_storage') {
      commands.push({
        command: `ls ${attack.viewId || attack.id}`,
        description: "List files on device"
      });
    }
    
    if (attack.type === 'malicious_script') {
      commands.push({
        command: `strings ${attack.viewId || attack.id}`,
        description: "Examine executable strings"
      });
    }
    
    if (attack.type === 'network_log_anomaly' || attack.type === 'network') {
      commands.push({
        command: `whois <ip>`,
        description: "Look up IP information"
      });
      commands.push({
        command: `block_ip <ip>`,
        description: "Block suspicious IP"
      });
    }
    
    // Add action commands based on correct_actions
    if (attack.correct_actions) {
      attack.correct_actions.forEach(action => {
        if (action === 'quarantine') {
          commands.push({
            command: `quarantine ${attack.viewId || attack.id}`,
            description: "Quarantine the threat"
          });
        } else if (action === 'accept') {
          commands.push({
            command: `accept ${attack.viewId || attack.id}`,
            description: "Mark as legitimate"
          });
        }
      });
    }
    
    // Add hint command
    commands.push({
      command: `hint ${attack.id}`,
      description: "Get a hint for this incident"
    });
    
    return commands;
  };

  return (
    <>
      {/* Command Guide Modal */}
      {commandGuideModal && (
        <div className="modal-overlay" onClick={closeCommandGuideModal}>
          <div className="modal-content command-guide-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Expected Commands: {commandGuideModal.title}</h3>
              <button className="close-btn" onClick={closeCommandGuideModal}>×</button>
            </div>
            <div className="command-guide-content">
              <div className="command-guide">
                <h4>Try these commands:</h4>
                {generateCommands(commandGuideModal).map((cmd, index) => (
                  <div key={index} className="command-item">
                    <code>{cmd.command}</code>
                    <span>{cmd.description}</span>
                  </div>
                ))}
              </div>
              <div className="command-guide-hint">
                <p><strong>Hint:</strong> {commandGuideModal.hint}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { NotepadModal, TipsModal, CommandGuideModal };