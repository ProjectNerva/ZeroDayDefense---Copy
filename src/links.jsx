import React from 'react';

const siteTypes = {
  malicious_1: {
    domains: ['verify-now.zyx', 'company-payroll.verify-now.zyx', 'http://company-payroll.verify-now.zyx/confirm'],
    requiredAttackId: 'msg_001',
    render: ({ formData, onFormChange, onPhishingSubmit }) => (
      <div className="browser-page malicious-site" style={{ height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>
        <div className="page-content" style={{ padding: '20px' }}>
          <h2 style={{ color: '#4fc3f7', marginBottom: '20px' }}>🏢 Company Payroll Portal</h2>
          <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ color: '#ff6666', marginBottom: '15px', fontWeight: 'bold' }}>
              ⚠️ URGENT: Payroll Processing Error Detected
            </div>
            <p style={{ marginBottom: '15px' }}>
              We have detected a critical error in your payroll processing. Your payment may be delayed or canceled unless you verify your information immediately.
            </p>
            <p style={{ marginBottom: '20px', color: '#ffcc00' }}>
              <strong>Time Remaining:</strong> 4 hours 23 minutes
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); onPhishingSubmit(); }} style={{ maxWidth: '400px' }}>
              <h3 style={{ color: '#4fc3f7', marginBottom: '15px' }}>Verify Employee Information</h3>
              
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#81c784' }}>Employee ID:</label>
                <input 
                  type="text" 
                  value={formData.employeeId}
                  onChange={(e) => onFormChange(prev => ({ ...prev, employeeId: e.target.value }))}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #404040', 
                    color: '#e0e0e0',
                    borderRadius: '4px'
                  }}
                  placeholder="Enter your employee ID"
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#81c784' }}>Full Name:</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => onFormChange(prev => ({ ...prev, fullName: e.target.value }))}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #404040', 
                    color: '#e0e0e0',
                    borderRadius: '4px'
                  }}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#81c784' }}>Email Address:</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => onFormChange(prev => ({ ...prev, email: e.target.value }))}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #404040', 
                    color: '#e0e0e0',
                    borderRadius: '4px'
                  }}
                  placeholder="Enter your email"
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#81c784' }}>Password:</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => onFormChange(prev => ({ ...prev, password: e.target.value }))}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #404040', 
                    color: '#e0e0e0',
                    borderRadius: '4px'
                  }}
                  placeholder="Enter your password"
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#81c784' }}>Last 4 digits of SSN:</label>
                <input 
                  type="text" 
                  maxLength="4"
                  value={formData.ssn}
                  onChange={(e) => onFormChange(prev => ({ ...prev, ssn: e.target.value }))}
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #404040', 
                    color: '#e0e0e0',
                    borderRadius: '4px'
                  }}
                  placeholder="Enter last 4 digits"
                />
              </div>
              
              <button 
                type="submit"
                style={{ 
                  backgroundColor: '#ff4444', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                VERIFY NOW - Urgent!
              </button>
            </form>
            
            <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
              <p>By submitting this form, you acknowledge that your payroll information will be updated in our secure system.</p>
              <p>For assistance, contact support@company-payroll.verify-now.zyz</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  malicious_2: {
    domains: ['secure-bank.company.com','http://secure-bank.company.com'],
    requiredAttackId: 'msg_007',
    render: ({ formData, onFormChange, onPhishingSubmit }) => (
      <div className="browser-page malicious-site" style={{ height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>
        <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', color: '#4fc3f7', padding: '15px', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#4fc3f7' }}>🏦 SecureBank Corporate Banking Portal</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#81c784' }}>International Investment Corp - Authorized Access Only</p>
        </div>
        
        <div className="page-content" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
            <h3 style={{ color: '#4fc3f7', marginTop: 0, fontSize: '18px' }}>🏦 Banking Navigation</h3>
            <nav style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={{ padding: '10px', backgroundColor: '#1a1a1a', border: '1px solid #404040', color: '#e0e0e0', borderRadius: '4px', cursor: 'pointer' }}>
                📊 Account Overview
              </div>
              <div style={{ padding: '10px', backgroundColor: '#b94e4eff', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                💸 Wire Transfers (Active)
              </div>
              <div style={{ padding: '10px', backgroundColor: '#1a1a1a', border: '1px solid #404040', color: '#e0e0e0', borderRadius: '4px', cursor: 'pointer' }}>
                📋 Transaction History
              </div>
              <div style={{ padding: '10px', backgroundColor: '#1a1a1a', border: '1px solid #404040', color: '#e0e0e0', borderRadius: '4px', cursor: 'pointer' }}>
                🔐 Security Settings
              </div>
            </nav>
          </div>

          <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px', padding: '25px' }}>
            <h3 style={{ color: '#4fc3f7', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>💸 Urgent Wire Transfer Portal</h3>
            
{(() => {
              // Form validation - check if critical fields are filled
              const isFormValid = 
                (formData.accountNumber && formData.accountNumber.trim().length >= 8) &&
                (formData.routingNumber && formData.routingNumber.trim().length >= 9) &&
                (formData.beneficiaryName && formData.beneficiaryName.trim().length >= 2) &&
                (formData.transferAmount && formData.transferAmount.trim().length > 0) &&
                (formData.authCode && formData.authCode.trim().length >= 4) &&
                (formData.bankUsername && formData.bankUsername.trim().length >= 3) &&
                (formData.bankPassword && formData.bankPassword.trim().length >= 4);
              
              return (
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (isFormValid) {
                    alert("Form Submitted Successfully.");
                    onPhishingSubmit(); 
                  }
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                        Beneficiary Account Number: <span style={{ color: '#ff6666' }}>*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.accountNumber || ''}
                        onChange={(e) => onFormChange(prev => ({ ...prev, accountNumber: e.target.value }))}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#1a1a1a',
                          color: '#e0e0e0',
                          border: `1px solid ${(formData.accountNumber && formData.accountNumber.trim().length >= 8) ? '#81c784' : '#404040'}`, 
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                        placeholder="123456789 (minimum 8 digits)"
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                        Routing Number: <span style={{ color: '#ff6666' }}>*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.routingNumber || ''}
                        onChange={(e) => onFormChange(prev => ({ ...prev, routingNumber: e.target.value }))}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#1a1a1a',
                          color: '#e0e0e0',
                          border: `1px solid ${(formData.routingNumber && formData.routingNumber.trim().length >= 9) ? '#81c784' : '#404040'}`, 
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                        placeholder="987654321 (9 digits)"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>Beneficiary Bank:</label>
                      <input 
                        type="text" 
                        value={formData.beneficiaryBank || ''}
                        onChange={(e) => onFormChange(prev => ({ ...prev, beneficiaryBank: e.target.value }))}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#1a1a1a',
                          color: '#e0e0e0',
                          border: '1px solid #404040', 
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                        placeholder="International Investment Corp"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                        Beneficiary Name: <span style={{ color: '#ff6666' }}>*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.beneficiaryName || ''}
                        onChange={(e) => onFormChange(prev => ({ ...prev, beneficiaryName: e.target.value }))}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#1a1a1a',
                          color: '#e0e0e0',
                          border: `1px solid ${(formData.beneficiaryName && formData.beneficiaryName.trim().length >= 2) ? '#81c784' : '#404040'}`, 
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                        placeholder="M. Smith"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                        Transfer Amount ($): <span style={{ color: '#ff6666' }}>*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.transferAmount || ''}
                        onChange={(e) => onFormChange(prev => ({ ...prev, transferAmount: e.target.value }))}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.,]/g, '')}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#1a1a1a',
                          color: '#e0e0e0',
                          border: `1px solid ${(formData.transferAmount && formData.transferAmount.trim().length > 0) ? '#81c784' : '#404040'}`, 
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                        placeholder="50,000"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                        Authorization Code: <span style={{ color: '#ff6666' }}>*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.authCode || ''}
                        onChange={(e) => onFormChange(prev => ({ ...prev, authCode: e.target.value }))}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#1a1a1a',
                          color: '#e0e0e0',
                          border: `1px solid ${(formData.authCode && formData.authCode.trim().length >= 4) ? '#81c784' : '#404040'}`, 
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                        placeholder="URGENT2024"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Your Banking Login (for verification): <span style={{ color: '#ff6666' }}>*</span>
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <input 
                        type="text" 
                        required
                        value={formData.bankUsername || ''}
                        onChange={(e) => onFormChange(prev => ({ ...prev, bankUsername: e.target.value }))}
                        style={{ 
                          padding: '12px', 
                          backgroundColor: '#1a1a1a',
                          color: '#e0e0e0',
                          border: `1px solid ${(formData.bankUsername && formData.bankUsername.trim().length >= 3) ? '#81c784' : '#404040'}`, 
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                        placeholder="Banking Username"
                      />
                      <input 
                        type="password" 
                        required
                        value={formData.bankPassword || ''}
                        onChange={(e) => onFormChange(prev => ({ ...prev, bankPassword: e.target.value }))}
                        style={{ 
                          padding: '12px', 
                          backgroundColor: '#1a1a1a',
                          color: '#e0e0e0',
                          border: `1px solid ${(formData.bankPassword && formData.bankPassword.trim().length >= 4) ? '#81c784' : '#404040'}`, 
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                        placeholder="Banking Password"
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button 
                      type="submit"
                      disabled={!isFormValid}
                      style={{ 
                        backgroundColor: isFormValid ? '#dc3545' : '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '15px 40px', 
                        borderRadius: '6px',
                        cursor: isFormValid ? 'pointer' : 'not-allowed',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        opacity: isFormValid ? 1 : 0.6
                      }}
                    >
                      {isFormValid ? '🚨 PROCESS URGENT WIRE TRANSFER 🚨' : '⚠️ COMPLETE REQUIRED FIELDS ⚠️'}
                    </button>
                    {!isFormValid && (
                      <p style={{ marginTop: '10px', fontSize: '12px', color: '#ff6666' }}>
                        Please fill out all required fields (*) to proceed with the wire transfer.
                      </p>
                    )}
                  </div>
                </form>
              );
            })()}
            
            <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px', fontSize: '12px', color: '#888' }}>
              <p style={{ margin: '0 0 5px 0' }}>⚠️ <strong>Security Notice:</strong> This transaction is being processed under emergency CEO authorization protocol.</p>
              <p style={{ margin: '0 0 5px 0' }}>📞 Verification: Contact CEO Assistant at ext. 5521 for confirmation</p>
              <p style={{ margin: '0' }}>🔒 All wire transfers are encrypted and logged for security compliance</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  malicious_3: {
    domains: ['portal.companies.xyz/reset-password','http://portal.companies.xyz/reset-password'],
    requiredAttackId: 'msg_021',
    render: ({ formData, onFormChange, onPhishingSubmit }) => (
      <div className="browser-page malicious-site" style={{ height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>
        <div className="page-content" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', color: '#4fc3f7', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#4fc3f7' }}>XYZ Companies Employee Portal</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#81c784' }}>Secure Employee Access - Password Reset</p>
          </div>
          
          <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px', padding: '25px' }}>
            <div style={{ color: '#ff6666', marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>
              ⚠️ URGENT: Password Reset Required
            </div>
            
            <p style={{ marginBottom: '20px', color: '#ffcc00', textAlign: 'center' }}>
              Your password has expired and must be reset to continue accessing company systems.
            </p>
            
            <h3 style={{ color: '#4fc3f7', marginTop: 0, marginBottom: '20px', fontSize: '20px', textAlign: 'center' }}>Employee Password Reset</h3>
            
{(() => {
              // Form validation - check if critical fields are filled
              const isFormValid = 
                (formData.employeeId && formData.employeeId.trim().length >= 3) &&
                (formData.email && formData.email.trim().includes('@')) &&
                (formData.oldPassword && formData.oldPassword.trim().length >= 4) &&
                (formData.newPassword && formData.newPassword.trim().length >= 8) &&
                (formData.confirmPassword && formData.confirmPassword.trim().length >= 8);
              
              return (
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (isFormValid) {
                    alert("Password Reset.");
                    onPhishingSubmit(); 
                  }
                }}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Employee ID: <span style={{ color: '#ff6666' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.employeeId || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, employeeId: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.employeeId && formData.employeeId.trim().length >= 3) ? '#81c784' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter your employee ID (e.g. EMP001)"
                    />
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Email Address: <span style={{ color: '#ff6666' }}>*</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, email: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.email && formData.email.trim().includes('@')) ? '#81c784' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter your company email"
                    />
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Current Password: <span style={{ color: '#ff6666' }}>*</span>
                    </label>
                    <input 
                      type="password" 
                      required
                      value={formData.oldPassword || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, oldPassword: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.oldPassword && formData.oldPassword.trim().length >= 4) ? '#81c784' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter your current password"
                    />
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      New Password: <span style={{ color: '#ff6666' }}>*</span>
                    </label>
                    <input 
                      type="password" 
                      required
                      value={formData.newPassword || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, newPassword: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.newPassword && formData.newPassword.trim().length >= 8) ? '#81c784' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter new password (minimum 8 characters)"
                    />
                  </div>

                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Confirm New Password: <span style={{ color: '#ff6666' }}>*</span>
                    </label>
                    <input 
                      type="password" 
                      required
                      value={formData.confirmPassword || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.confirmPassword && formData.confirmPassword.trim().length >= 8) ? '#81c784' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Confirm your new password"
                    />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button 
                      type="submit"
                      disabled={!isFormValid}
                      style={{ 
                        backgroundColor: isFormValid ? '#dc3545' : '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '15px 40px', 
                        borderRadius: '6px',
                        cursor: isFormValid ? 'pointer' : 'not-allowed',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        opacity: isFormValid ? 1 : 0.6,
                        width: '100%'
                      }}
                    >
                      {isFormValid ? '� RESET PASSWORD NOW' : '⚠️ COMPLETE ALL REQUIRED FIELDS ⚠️'}
                    </button>
                    {!isFormValid && (
                      <p style={{ marginTop: '10px', fontSize: '12px', color: '#ff6666' }}>
                        Please fill out all required fields (*) to reset your password.
                      </p>
                    )}
                  </div>
                </form>
              );
            })()}
            
            <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px', fontSize: '12px', color: '#888' }}>
              <p style={{ margin: '0 0 5px 0' }}>🔒 <strong>Security Notice:</strong> Password changes are logged and monitored for security compliance.</p>
              <p style={{ margin: '0 0 5px 0' }}>📞 Support: If you have issues, contact IT Help Desk at ext. 4455</p>
              <p style={{ margin: '0' }}>⚠️ Your session will expire in 15 minutes if no action is taken</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  legitimate_1: {
    domains: ['scan.company.xyz', 'http://scan.company.xyz'],
    requiredAttackId: 'msg_020',
    render: ({ formData, onFormChange, onPhishingSubmit }) => {
      const [isLoggedIn, setIsLoggedIn] = React.useState(false);
      const [isScanning, setIsScanning] = React.useState(false);
      const [scanComplete, setScanComplete] = React.useState(false);
      
      const handleLogin = (e) => {
        e.preventDefault();
        if (formData.username && formData.password) {
          setIsLoggedIn(true);
        }
      };
      
      const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
          setIsScanning(false);
          setScanComplete(true);
          alert("Scan done, no anomalies detected.");
          onPhishingSubmit();
        }, 3000);
      };
      
      if (!isLoggedIn) {
        // Login screen
        return (
          <div className="browser-page legitimate-site" style={{ height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>
            <div className="page-content" style={{ padding: '30px', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', color: '#4fc3f7', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '24px', color: '#4fc3f7' }}>🛡️ Company Security Scanner</h1>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#81c784' }}>Employee Security Portal - Daily System Checks</p>
              </div>
              
              <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px', padding: '25px' }}>
                <h3 style={{ color: '#4fc3f7', marginTop: 0, marginBottom: '20px', fontSize: '20px', textAlign: 'center' }}>Employee Login</h3>
                
                <form onSubmit={handleLogin}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Employee ID:
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.username || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, username: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: '1px solid #404040', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter your employee ID"
                    />
                  </div>
                  
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Password:
                    </label>
                    <input 
                      type="password" 
                      required
                      value={formData.password || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, password: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: '1px solid #404040', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter your password"
                    />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button 
                      type="submit"
                      style={{ 
                        backgroundColor: '#4fc3f7', 
                        color: '#1e1e1e', 
                        border: 'none', 
                        padding: '15px 40px', 
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        width: '100%'
                      }}
                    >
                      🔐 LOGIN TO SECURITY PORTAL
                    </button>
                  </div>
                </form>
                
                <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px', fontSize: '12px', color: '#888' }}>
                  <p style={{ margin: '0 0 5px 0' }}>🔒 <strong>Security Notice:</strong> Daily security scans are required for all employees.</p>
                  <p style={{ margin: '0 0 5px 0' }}>📞 Support: Contact IT Help Desk at ext. 4455 for login issues</p>
                  <p style={{ margin: '0' }}>⚠️ Use your standard company credentials to access the scanner</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      // Security scanner dashboard
      return (
        <div className="browser-page legitimate-site" style={{ height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>
          <div className="page-content" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', color: '#4fc3f7', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', color: '#4fc3f7' }}>🛡️ Company Security Scanner</h1>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#81c784' }}>Welcome, {formData.username} - System Security Dashboard</p>
            </div>
            
            <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px', padding: '25px', marginBottom: '20px' }}>
              <h3 style={{ color: '#4fc3f7', marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>🔍 Security Scan Options</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div style={{ padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px' }}>
                  <h4 style={{ color: '#81c784', margin: '0 0 10px 0' }}>🖥️ System Status</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Check system health and processes</p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px' }}>
                  <h4 style={{ color: '#81c784', margin: '0 0 10px 0' }}>🌐 Network Security</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Scan network connections and traffic</p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px' }}>
                  <h4 style={{ color: '#81c784', margin: '0 0 10px 0' }}>📁 File System</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Check for unauthorized files and changes</p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px' }}>
                  <h4 style={{ color: '#81c784', margin: '0 0 10px 0' }}>🔐 Access Logs</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Review recent access attempts</p>
                </div>
              </div>
              
              {!scanComplete && (
                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={handleScan}
                    disabled={isScanning}
                    style={{ 
                      backgroundColor: isScanning ? '#6c757d' : '#28a745', 
                      color: 'white', 
                      border: 'none', 
                      padding: '15px 40px', 
                      borderRadius: '6px',
                      cursor: isScanning ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      opacity: isScanning ? 0.6 : 1
                    }}
                  >
                    {isScanning ? '🔄 SCANNING IN PROGRESS...' : '🔍 START COMPREHENSIVE SECURITY SCAN'}
                  </button>
                  
                  {isScanning && (
                    <div style={{ marginTop: '20px' }}>
                      <div style={{ color: '#ffcc00', marginBottom: '10px' }}>
                        Scanning system security... Please wait...
                      </div>
                      <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px', padding: '10px' }}>
                        <div style={{ fontSize: '12px', color: '#888' }}>
                          • Checking system processes...<br/>
                          • Analyzing network connections...<br/>
                          • Scanning file integrity...<br/>
                          • Reviewing access logs...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {scanComplete && (
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#1a1a1a', border: '1px solid #28a745', borderRadius: '4px' }}>
                  <div style={{ color: '#28a745', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                    ✅ SCAN COMPLETED SUCCESSFULLY
                  </div>
                  <div style={{ color: '#81c784', marginBottom: '15px' }}>
                    Scan done, no anomalies detected.
                  </div>
                  <div style={{ fontSize: '12px', color: '#888' }}>
                    All security checks passed. System is secure and operating normally.
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #404040', borderRadius: '8px', padding: '20px' }}>
              <h3 style={{ color: '#4fc3f7', marginTop: 0, marginBottom: '15px', fontSize: '16px' }}>📋 Scan History</h3>
              <div style={{ fontSize: '12px', color: '#888' }}>
                <div style={{ padding: '8px', backgroundColor: '#1a1a1a', marginBottom: '5px', borderRadius: '4px' }}>
                  Last scan: Today at {new Date().toLocaleTimeString()} - ✅ No issues detected
                </div>
                <div style={{ padding: '8px', backgroundColor: '#1a1a1a', marginBottom: '5px', borderRadius: '4px' }}>
                  Previous scan: Yesterday at 2:30 PM - ✅ No issues detected
                </div>
                <div style={{ padding: '8px', backgroundColor: '#1a1a1a', borderRadius: '4px' }}>
                  Weekly scan: 7 days ago - ✅ No issues detected
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #404040', borderRadius: '4px', fontSize: '12px', color: '#888', textAlign: 'center' }}>
              <p style={{ margin: '0 0 5px 0' }}>🔒 <strong>Security Notice:</strong> Daily scans help maintain system security and compliance.</p>
              <p style={{ margin: '0' }}>Thank you for completing your daily security check. You may now close this window.</p>
            </div>
          </div>
        </div>
      );
    }
  },
  legitimate_2: {
    domains: ['portal.company.xyz/reset-password','http://portal.company.com/reset-password'],
    requiredAttackId: 'msg_019',
    render: ({ formData, onFormChange, onPhishingSubmit }) => (
      <div className="browser-page legitimate-site" style={{ height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e', color: '#e0e0e0' }}>
        <div className="page-content" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #28a745', color: '#4fc3f7', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#4fc3f7' }}>XYZ Companies Employee Portal</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#81c784' }}>Secure Employee Access - Password Management</p>
          </div>
          
          <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #28a745', borderRadius: '8px', padding: '25px' }}>
            <div style={{ color: '#28a745', marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>
              🔐 Monthly Password Reset
            </div>
            
            <p style={{ marginBottom: '20px', color: '#e0e0e0', textAlign: 'center' }}>
              Complete your monthly password reset as required by company security policy.
            </p>
            
            <h3 style={{ color: '#4fc3f7', marginTop: 0, marginBottom: '20px', fontSize: '20px', textAlign: 'center' }}>Secure Password Reset</h3>
            
{(() => {
                const isFormValid = 
                (formData.employeeId && formData.employeeId.trim().length >= 3) &&
                (formData.email && formData.email.trim().includes('@')) &&
                (formData.oldPassword && formData.oldPassword.trim().length >= 4) &&
                (formData.newPassword && formData.newPassword.trim().length >= 8) &&
                (formData.confirmPassword && formData.confirmPassword.trim().length >= 8);
              
              return (
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (isFormValid) {
                    alert("Password successfully reset! You will be redirected to login.");
                    onPhishingSubmit(); 
                  }
                }}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Employee ID: <span style={{ color: '#28a745' }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.employeeId || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, employeeId: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.employeeId && formData.employeeId.trim().length >= 3) ? '#28a745' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter your employee ID (e.g. EMP001)"
                    />
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Email Address: <span style={{ color: '#28a745' }}>*</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, email: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.email && formData.email.trim().includes('@')) ? '#28a745' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter your company email"
                    />
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Current Password: <span style={{ color: '#28a745' }}>*</span>
                    </label>
                    <input 
                      type="password" 
                      required
                      value={formData.oldPassword || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, oldPassword: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.oldPassword && formData.oldPassword.trim().length >= 4) ? '#28a745' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter your current password"
                    />
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      New Password: <span style={{ color: '#28a745' }}>*</span>
                    </label>
                    <input 
                      type="password" 
                      required
                      value={formData.newPassword || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, newPassword: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.newPassword && formData.newPassword.trim().length >= 8) ? '#28a745' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Enter new password (minimum 8 characters)"
                    />
                  </div>

                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#81c784', fontWeight: 'bold' }}>
                      Confirm New Password: <span style={{ color: '#28a745' }}>*</span>
                    </label>
                    <input 
                      type="password" 
                      required
                      value={formData.confirmPassword || ''}
                      onChange={(e) => onFormChange(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${(formData.confirmPassword && formData.confirmPassword.trim().length >= 8) ? '#28a745' : '#404040'}`, 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Confirm your new password"
                    />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button 
                      type="submit"
                      disabled={!isFormValid}
                      style={{ 
                        backgroundColor: isFormValid ? '#28a745' : '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '15px 40px', 
                        borderRadius: '6px',
                        cursor: isFormValid ? 'pointer' : 'not-allowed',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        opacity: isFormValid ? 1 : 0.6,
                        width: '100%'
                      }}
                    >
                      {isFormValid ? '✅ RESET PASSWORD' : '⚠️ COMPLETE ALL REQUIRED FIELDS ⚠️'}
                    </button>
                    {!isFormValid && (
                      <p style={{ marginTop: '10px', fontSize: '12px', color: '#ffcc00' }}>
                        Please fill out all required fields (*) to reset your password.
                      </p>
                    )}
                  </div>
                </form>
              );
            })()}
            
            <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#1a1a1a', border: '1px solid #28a745', borderRadius: '4px', fontSize: '12px', color: '#888' }}>
              <p style={{ margin: '0 0 5px 0' }}>🔒 <strong>Security Notice:</strong> Password changes are logged and monitored for security compliance.</p>
              <p style={{ margin: '0 0 5px 0' }}>📞 Support: If you have issues, contact IT Help Desk at ext. 4455</p>
              <p style={{ margin: '0' }}>✅ This is the official company password reset portal - always verify the URL is portal.company.com</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  default: {
    domains: [],
    render: ({ url }) => (
      <div className="browser-page">
        <div className="page-content">
          <h2>Website: {url}</h2>
          <p>This would normally load the requested website content.</p>
          <p>In this simulation, only specific training sites are available.</p>
        </div>
      </div>
    )
  }
  
};

export const handleUrlNavigation = (url, props) => {
  const normalizedUrl = url.toLowerCase().trim();
  
  // Find matching site type
  const siteType = Object.entries(siteTypes).find(([_, config]) => 
    config.domains.some(domain => normalizedUrl.includes(domain))
  ) || ['default', siteTypes.default];

  const [siteTypeName, siteConfig] = siteType;

  // Check if this is a malicious site that requires a specific attack to be in inbox
  if (siteConfig.requiredAttackId && props.currentAttacks) {
    const hasRequiredAttack = props.currentAttacks.some(attack => 
      attack.id === siteConfig.requiredAttackId || 
      attack.viewId === siteConfig.requiredAttackId
    );
    
    if (!hasRequiredAttack) {
      // If required attack is not in inbox, show error page
      return (
        <div className="browser-page">
          <div className="page-content">
            <h2>404 - Page Not Found</h2>
            <p>The requested page could not be found or is currently unavailable.</p>
            <p>Please check the URL and try again.</p>
            </div>
          </div>
      );
    }
  }

  return siteConfig.render({ ...props, url });
};