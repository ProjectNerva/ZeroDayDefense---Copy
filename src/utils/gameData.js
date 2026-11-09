export const tutorialSteps = [
  {
    title: "Welcome to Zero Day Defense",
    content: "You're a cybersecurity analyst tasked with protecting your organization from cyber threats. In this simulation, you'll analyze emails, identify suspicious content, and take appropriate action.",
    instruction: "Click 'Next' to continue with the tutorial."
  },
  {
    title: "Your Dashboard",
    content: "This is your security dashboard. The left panel shows incoming emails and threats. The terminal at the bottom is your command interface for analyzing and managing threats.",
    instruction: "Familiarize yourself with the layout, then click 'Next'."
  },
  {
    title: "Analyzing Emails",
    content: "Click on emails in the left panel to view their contents. Look for suspicious elements like unknown senders, urgent language, suspicious links, or requests for sensitive information.",
    instruction: "Click 'Next' to learn about threat analysis commands."
  },
  {
    title: "Using Commands",
    content: "Use the terminal to analyze threats. Key commands include:\n• headers <id> - Check email authentication and routing information\n• scan <id> - Scan for malicious patterns and content\n• quarantine <id> - Isolate suspicious emails\n• accept <id> - Mark legitimate emails as safe",
    instruction: "Click 'Next' to learn about the VM Browser."
  },

  {
    title: "Phishing Website Analysis", 
    content: "Now you can safely investigate suspicious links in the VM Browser. This isolated environment protects your system while you analyze potential threats.",
    instruction: "Copy/paste the link from the first email into the browser address bar.",
    expectedCommand: "navigate"
  },
  {
    title: "Taking Action - Quarantine",
    content: "When you identify a threat, use the quarantine command to isolate it. This removes the threat from circulation and prevents damage.",
    instruction: "Practice using 'quarantine 1' to quarantine the suspicious email.",
    expectedCommand: "quarantine"
  },
  {
    title: "Analyzing Legitimate Emails",
    content: "Not all emails are threats! Now let's analyze the team meeting email (msg_006) to understand why it's safe. First, check the email headers for authentication.",
    instruction: "Type 'headers 6' to examine the email authentication data.",
    expectedCommand: "headers"
  },
  {
    title: "Verifying Email Content",
    content: "Good! The headers show DKIM and SPF passing, meaning the email is properly authenticated. Now check the content for any suspicious elements.",
    instruction: "Type 'scan 6' to scan for malicious content.",
    expectedCommand: "scan"
  },
  {
    title: "Taking Action - Accept",
    content: "Excellent! The scan shows it's clean. The email is from an internal company domain with proper authentication and normal business content. This makes it safe to accept.",
    instruction: "Now use 'accept 6' to mark this legitimate email as safe.",
    expectedCommand: "accept"
  },
  {
    title: "Tutorial Complete",
    content: "Excellent work! You've learned to identify threats, check domains, use the VM browser safely, AND avoid false positives. Remember: verify domains, quarantine suspicious items, accept legitimate ones.",
    instruction: "Click 'Finish Tutorial' to start protecting your organization!"
  }
];

export const realEmployeeInfo = {
  fullName: 'sam anderson',
  email: 'sam.anderson@company.com',
  personalEmail: 'sam.anderson.personal@gmail.com',
  employeeId: 'emp-2025-4157',
  badgeId: '2025-4157',
  username: 'sanderson',
  ssn: '123-45-6789',
  ssnLast4: '6789',
  bankUsername: 'sanderson2025',
  bankPassword: 'fishandchips',
  personalEmailPassword: 'password123',
  phone: '(555) 123-4567',
  mobile: '(512) 555-1234',
  homePhone: '(512) 555-9876',
  department: 'IT Security',
  position: 'Security Analyst',
  officeLocation: 'Building A, Floor 3',
  driversLicense: 'DL987654321',
  dateOfBirth: 'March 15, 1985',
  mothersMaidenName: 'Williams',
  firstPetName: 'Buddy',
  favoriteColor: 'Blue',
  firstSchool: 'Lincoln Elementary',
  childhoodFriend: 'Michael Thompson',
  homeAddress: '1234 Oak Street, Austin, TX 78701',
  emergencyContact: 'Emma Anderson',
  emergencyPhone: '(512) 555-4321',
  bankAccount: '****1234',
  creditCard: '****5678',
  securityCode: '789',
  annualSalary: '$75,000',
  directDepositRouting: '121000248'
};

export const commandHelp = {
  'help': 'help - Show available commands\nExample:\n  help\n  help <command>',
  'cat': 'cat <id> - Display the content of an email or file\nExample:\n  cat msg_001\n  cat file_003',
  'headers': 'headers <id> - View email headers and authentication information\nExample:\n  headers msg_001\n  headers file_003',
  'ls': 'ls <id> - List contents of a directory or USB device\nExample:\n  ls dev_002\n  ls update_pkg_001',
  'strings': 'strings <file> - Extract readable strings from binary files\nExample:\n  strings dev_002/installer.exe\n  strings file_003',
  'grep': 'grep <pattern> <file> - Search for patterns in file content\nExample:\n  grep -n "curl" file_003\n  grep "exfil" file_003',
  'scan': 'scan <id> - Scan content for malicious patterns\nExample:\n  scan msg_001\n  scan file_003',
  'whois': 'whois <domain/ip> - Look up domain or IP information\nExample:\n  whois verify-now.zyx\n  whois 198.51.100.23',
  'quarantine': 'quarantine <id> - Move suspicious email to quarantine\nExample:\n  quarantine 1\n  quarantine 2',
  'accept': 'accept <id> - Mark email as legitimate\nExample:\n  accept 1\n  accept 3',
  'block_ip': 'block_ip <ip> - Block an IP address at the firewall\nExample:\n  block_ip 198.51.100.23\n  block_ip 203.0.113.156',
  'isolate': 'isolate <host> - Isolate a compromised host from the network\nExample:\n  isolate hostA\n  isolate 192.168.1.47',
  'patch': 'patch <system> - Apply security patches to a system\nExample:\n  patch system\n  patch browsers',
  'list': 'list - Show all current emails\nExample:\n  list\n  list --details',
  'clear': 'clear - Clear terminal history\nExample:\n  clear',
  'navigate': 'navigate <url> - Open URL in VM browser\nExample:\n  navigate suspicious-site.com\n  navigate https://example.com',
  'browser': 'browser - Open VM browser for safe link investigation\nExample:\n  browser',
  'notes': 'notes - Open employee information notepad\nExample:\n  notes',
  'tips': 'tips - Open quick reference guide\nExample:\n  tips',
  'status': 'status - Show current game progress\nExample:\n  status',
  'endday': 'endday - Complete the current day and view summary\nExample:\n  endday',
  'hint': 'hint <id> - Get a hint for analyzing a specific threat\nExample:\n  hint msg_001\n  hint file_003'
};

export const formatContent = (text) => {
  if (!text) return '';
  return text.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
};