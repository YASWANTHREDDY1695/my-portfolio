document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Navigation Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(7, 9, 14, 0.9)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(7, 9, 14, 0.65)';
            header.style.boxShadow = 'none';
        }
    });

    // 3. Navigation Active Link Observer
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 4. Mobile Navigation Menu Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            const isVisible = navLinksContainer.style.display === 'flex';
            if (isVisible) {
                navLinksContainer.style.display = 'none';
            } else {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '80px';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.background = '#0b0f19';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.borderBottom = '1px solid var(--card-border)';
                navLinksContainer.style.gap = '20px';
            }
        });

        // Close mobile nav when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinksContainer.style.display = 'none';
                }
            });
        });
    }

    // 5. Interactive Mock Terminal
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const initialTypingElement = document.getElementById('initial-typing');

    // Focus terminal input on click inside the terminal window
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow && terminalInput) {
        terminalWindow.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    // Command Database
    const commands = {
        help: () => `Available commands:
  <span class="highlight-cmd">help</span>           Display this guidance menu
  <span class="highlight-cmd">about</span>          Print professional overview & background
  <span class="highlight-cmd">skills</span>         List technical competencies & languages
  <span class="highlight-cmd">experience</span>     Show work history & internships
  <span class="highlight-cmd">projects</span>       Show details of engineered projects
  <span class="highlight-cmd">certifications</span> List AWS, Oracle & Salesforce credentials
  <span class="highlight-cmd">education</span>      Print academic history and scores
  <span class="highlight-cmd">contact</span>        Display contact details & social channels
  <span class="highlight-cmd">clear</span>          Clear the console log`,

        about: () => `<strong>Avula Sai Praneeth Yaswanth Reddy</strong>
--------------------------------------------------
Computer Science undergraduate specializing in AI/ML Engineering and Cloud Architecture.
Proven expertise in building multi-agent AI systems, serverless cloud-native platforms,
and generative AI applications using modern frameworks and high-performance APIs.
Location: Amaravati, India`,

        skills: () => `<strong>Technical Competencies:</strong>
--------------------------------------------------
• <strong>AI & Machine Learning:</strong> Gemini Pro, YOLOv8, LSTM, Scikit-learn, Pandas, NumPy, OpenCV, NLP
• <strong>Cloud & Backend:</strong> AWS (S3, Lambda, Glue, Athena), Salesforce (LWC, SOQL, Flows), MySQL, REST APIs
• <strong>Programming:</strong> Python, Java SE 17, C, C++, Apex, JavaScript, PHP, HTML5/CSS3`,

        experience: () => `<strong>Professional Experience:</strong>
--------------------------------------------------
<strong>SmartBridge | Salesforce Developer Intern</strong> (May 2025 - July 2025)
• Architected "HandsMen Threads" CRM using Apex Triggers, SOQL, and Salesforce Flows.
• Integrated SkillWallet decentralized identity protocols for secure role-based access.
• Achieved Agentblazer Champion status (completed Apex Specialist & LWC Basics).`,

        projects: () => `<strong>Key Engineering Projects:</strong>
--------------------------------------------------
1. <strong>FinAgent Pro (Wealth Orchestration)</strong>
   - Multi-agent AI system utilizing Gemini Pro and LSTM models.
   - Sharpe ratio of 1.87 for risk-return optimizations.
   - Built interactive React.js dashboard for real-time tracking.

2. <strong>Cloud-Native Logistics Platform</strong>
   - Serverless AWS pipeline using Lambda, S3, DynamoDB, and CloudWatch.
   - Integrated AWS Comprehend NLP for automated parsing.
   - Set up custom SNS alerts to monitor tracking workflows.

3. <strong>FoodSnapChef (AI Food Recognition)</strong>
   - Streamlit application integrating Gemini Pro Vision API.
   - Ensemble deep learning model for food identification.
   - Custom parser processing 6,000+ recipe Indian food dataset.`,

        certifications: () => `<strong>Credentials & Certifications:</strong>
--------------------------------------------------
• <strong>AWS Certified Cloud Practitioner</strong>
  Verified via AWS Education Portal
• <strong>Oracle Certified Professional: Java SE 17 Developer</strong>
  Verified via Oracle Education Portal
• <strong>Salesforce Developer Agentblazer Champion</strong>
  Earned through SmartBridge Internship`,

        education: () => `<strong>Academic Timeline:</strong>
--------------------------------------------------
• <strong>SRM University AP</strong> (2023 - 2027)
  B.Tech in Computer Science Engineering | Current CGPA: <strong>7.8 / 10</strong>
• <strong>Sri Bhavishya Junior College</strong> (2021 - 2023)
  Intermediate (MPC) | Score: <strong>879 / 1000</strong>`,

        contact: () => `<strong>Connect with me:</strong>
--------------------------------------------------
• <strong>Email:</strong> praneethavula160905@gmail.com
• <strong>GitHub:</strong> github.com/YASWANTHREDDY1695
• <strong>LinkedIn:</strong> linkedin.com/in/avula-sai-praneeth-yaswanth-reddy-590279323`
    };

    // Initial Typing Animation inside Terminal
    const initialText = "help";
    let index = 0;

    function typeInitial() {
        if (initialTypingElement && index < initialText.length) {
            initialTypingElement.textContent += initialText.charAt(index);
            index++;
            setTimeout(typeInitial, 150);
        } else {
            // Typing finished, wait, execute, and prepare prompt
            setTimeout(() => {
                const parent = initialTypingElement.parentElement;
                if (parent) {
                    parent.remove(); // Remove the typing line
                }
                executeCommand('help'); // Run the default help command
            }, 600);
        }
    }

    // Start initial typing
    setTimeout(typeInitial, 800);

    // Command Input Handling
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandString = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';
                
                if (commandString) {
                    // Create input log line
                    const logLine = document.createElement('div');
                    logLine.className = 'terminal-line';
                    logLine.innerHTML = `<span class="prompt">guest@praneeth.dev:~$</span> <span>${commandString}</span>`;
                    terminalBody.appendChild(logLine);
                    
                    // Execute command
                    executeCommand(commandString);
                }
            }
        });
    }

    function executeCommand(cmd) {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';
        
        if (cmd === 'clear') {
            terminalBody.innerHTML = '';
            return;
        }
        
        if (commands[cmd]) {
            responseLine.innerHTML = commands[cmd]();
        } else {
            responseLine.className = 'terminal-line error-msg';
            responseLine.textContent = `bash: command not found: ${cmd}. Type 'help' to see list of valid commands.`;
        }
        
        terminalBody.appendChild(responseLine);
        
        // Scroll terminal to the bottom
        setTimeout(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 50);
    }

    // 6. Contact Form Verification & Submitting Simulation
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Client-side inputs check
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showFeedback('All fields are required.', 'error');
                return;
            }

            // Simple email structure validate
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFeedback('Please provide a valid email address.', 'error');
                return;
            }

            // Simulate form submission status
            setSubmitLoading(true);
            
            setTimeout(() => {
                setSubmitLoading(false);
                showFeedback(`Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`, 'success');
                contactForm.reset();
            }, 1800);
        });
    }

    function showFeedback(msg, type) {
        if (formFeedback) {
            formFeedback.textContent = msg;
            formFeedback.className = `form-feedback ${type}`;
            
            // Auto clear feedback after 5 seconds if success
            if (type === 'success') {
                setTimeout(() => {
                    formFeedback.textContent = '';
                    formFeedback.className = 'form-feedback';
                }, 6000);
            }
        }
    }

    function setSubmitLoading(isLoading) {
        if (submitBtn && btnText && btnIcon) {
            if (isLoading) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                btnText.textContent = 'Sending Message...';
                if (typeof lucide !== 'undefined') {
                    submitBtn.removeChild(btnIcon);
                    const spinner = document.createElement('i');
                    spinner.setAttribute('data-lucide', 'loader');
                    spinner.setAttribute('id', 'btn-icon');
                    spinner.style.animation = 'spin 1s linear infinite';
                    submitBtn.appendChild(spinner);
                    lucide.createIcons();
                }
            } else {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                const spinner = document.getElementById('btn-icon');
                if (spinner) {
                    submitBtn.removeChild(spinner);
                }
                const originalIcon = document.createElement('i');
                originalIcon.setAttribute('data-lucide', 'send');
                originalIcon.setAttribute('id', 'btn-icon');
                submitBtn.appendChild(originalIcon);
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }
    }
});

// CSS Injection for dynamic loader spin
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
