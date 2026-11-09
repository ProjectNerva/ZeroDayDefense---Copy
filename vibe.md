
### Basic Info

## Models Used: 
# Claude Sonnet 4
# Claude Sonnet 3.5
# Chatgpt-5

## IDE: VS Code 

### Prompts

# Prompt 1:
Can you create new atttacks for me? This is essentially a cyber-sec type of game where I give different attacks to the user and they have to solve them. Here is an example attack I made:


"id": "msg_001",
      "viewId": "id_001",
      "type": "phishing_email",
      "title": "Payroll Update - Immediate Action Required",
      "difficulty": "easy",
      "score": {
        "correct": 100,
        "miss": -100
      },
      "visual": {
        "icon": "email.png",
        "preview": {
          "sender": "payroll@company-payroll.com",
          "subject": "Urgent: Confirm Your Payroll Info",
          "snippet": "Please confirm your payroll info immediately or payroll will be delayed..."
        }
      },
      "content": {
        "body": "Hi Sam,\n\nWe detected an error processing your payroll. Please confirm your account details here: http://company-payroll.verify-now.zyx/confirm\n\n-- Payroll Team",
        "attachments": [],
        "headers": {
          "From": "payroll@company-payroll.com",
          "Return-Path": "<bounce@verify-now.zyx>",
          "Received": [
            "from mail.verify-now.zyx (203.0.113.50)",
            "by mail.company.local with ESMTP id 12345"
          ],
          "DKIM-Status": "none",
          "SPF-Result": "softfail"
        }
      },
      "indicators": [
        "Link domain (verify-now.zyx) does not match sender domain",
        "Return-path and Received values originate outside company infrastructure",
        "Urgency language: immediate/urgent"
      ],
      "correct_actions": [
        "quarantine"
      ],
      "optional_good_actions": [
        "scan",
        "headers",
        "cat"
      ],
      "terminal_responses": {
        "headers msg_001": "From: payroll@company-payroll.com\nReturn-Path: <bounce@verify-now.zyx>\nReceived: from mail.verify-now.zyx (203.0.113.50)\nby mail.company.local with ESMTP\nDKIM-Status: none\nSPF-Result: softfail",
        "headers id_001": "From: payroll@company-payroll.com\nReturn-Path: <bounce@verify-now.zyx>\nReceived: from mail.verify-now.zyx (203.0.113.50)\nby mail.company.local with ESMTP\nDKIM-Status: none\nSPF-Result: softfail",
        "cat msg_001": "From: payroll@company-payroll.com\nTo: sam@company.com\nSubject: Urgent: Confirm Your Payroll Info\n\nHi Sam,\n\nWe detected an error processing your payroll. Please confirm your account details here: http://company-payroll.verify-now.zyx/confirm\n\nIf you don't confirm within 24 hours, your payroll will be delayed.\n\n-- Payroll Team",
        "cat id_001": "From: payroll@company-payroll.com\nTo: sam@company.com\nSubject: Urgent: Confirm Your Payroll Info\n\nHi Sam,\n\nWe detected an error processing your payroll. Please confirm your account details here: http://company-payroll.verify-now.zyx/confirm\n\nIf you don't confirm within 24 hours, your payroll will be delayed.\n\n-- Payroll Team",
        "scan msg_001": "Scan result: Analysis completed. Found: Sender domain mismatch, external server origin (203.0.113.50), SPF check: softfail.",
        "whois verify-now.zyx": "Domain: verify-now.zyx\nRegistrar: Global Domain Registry\nCreated: 2025-10-07\nCountry: Unknown\nStatus: Recently registration",
        "whois 203.0.113.50": "IP: 203.0.113.50\nOrganization: Unknown Hosting\nCountry: Unknown\nASN: Not in company IP ranges",
        "quarantine msg_001": "Email quarantined successfully. Moved to secure isolation. Incident logged.",
        "quarantine id_001": "Email quarantined successfully. Moved to secure isolation. Incident logged."
      },
      "hint": "Always verify email authenticity by checking headers and sender information. Pay attention to domain names in links and email addresses. Consider why an email might request urgent action.",
      "postmortem": "Email security relies on multiple verification systems like SPF and DKIM. External domains masquerading as internal services can lead to data compromise."


# Prompt 2: 
Help me form all components in App.jsx into a cyber-security themed website. Use a green/blackish format. Also make a tutorial page with the current components I have. I want it to include one legit email (from attacks.json) and one illegitemate email. The tutorial should help the user go through actually identifying that the email is good/bad using cat, scan, headers, and finally quarantine/accept if its bad/good. 

# Prompt 3:
Look in assets/icons and assets/sounds- implement the images (png/svg) and sounds (mp3) that I have made. Also include a cool intro screen that introduces them to the game and gives them a short summary and tells them they're like an IT person and etc. Also include a button at the start to get capability to run sounds.



# Prompt 4:
Can you create pages in the browser section for all of the different links in the attacks.json? Along with that, create personal information for the user in the notepad area. This is the  information they can enter into the browser- if they enter this, then send them a notification saying they shouldn't have done that and they lose points.

# Prompt 5:
Split App.jsx into different jsx and css files. 

# Prompt 6:
Split the render browser area into a seperate links.jsx files & maek a dev command that allows me to spawn in invoices based on id like adminCommands.addInvoice({id})

# Prompt 7:
Fix css for a lot of the web pages I have 


# Prompt 8:
if you can see the code in links.jsx, it comes from lines 707 to 883 of the app.jsx file, basically i want to add multiple different possible links which is basically the same as adding multiple if statements for the normalizedUrl.includes([link]), but i want the code to all be in the links.jsx file and the app.jsx file to send a request/run the function in the links.jsx file. make it so that it can return a bunch of different cases of links

# Prompt 9:
in the malicious_2 case on line 141, change the render code to be formatted so these actions for the user can be done

# Prompt 10:
i want the css to look like the malicious_1 case

# Prompt 11:
change the css/html of malicious 3 to be a fake employee login page asking for employee ID, email and their old password and then their new password and then a reset button, but keep the current CSS theme

# Prompt 12:
update msg_020 code for the terminal responses to match the content and body and sender and change the ip to another one, this is a legitimate email.

# Prompt  13:
I still cant accept stuff i need to run or browser_input. Basically look at attacks.json, whenever I do accept on something im supposed to run or browser_input, you need to show that accept response (which is like a "you were supposed to do this!" response) and then you remove the thing from their inbox and you subtract points as a miss.

When i do run something im supposed to run, it resolves the thing but it doesnt delete it from my inbox