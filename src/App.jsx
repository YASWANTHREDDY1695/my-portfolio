import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  Code2, 
  Database, 
  Layers, 
  Brain, 
  Menu, 
  X,
  Server,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Zap,
  Globe,
  Search,
  Activity,
  Lock,
  MessageSquare,
  MousePointer2,
  Music,
  ShoppingCart,
  Vote
} from 'lucide-react';

/**
 * DATA & CONFIGURATION
 * ------------------------------------------------------------------
 */

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const SKILLS_DATA = {
  programming: {
    title: "Core Programming",
    icon: <Terminal className="w-6 h-6 text-cyan-400" />,
    skills: [
      "C", "C++", "Modular Programming", "File Handling", 
      "Data Structures", "Algorithm Design", "Problem Solving"
    ]
  },
  web_dev: {
    title: "Web Development",
    icon: <Globe className="w-6 h-6 text-violet-400" />,
    skills: [
      "HTML5", "CSS3", "JavaScript", "PHP", 
      "Spotify API", "Responsive UI", "Backend Integration"
    ]
  },
  tools: {
    title: "Tools & Utilities",
    icon: <Layers className="w-6 h-6 text-orange-400" />,
    skills: [
      "VS Code", "Git", "GitHub", "Command Line", 
      "Debugging", "System Optimization"
    ]
  },
  soft_skills: {
    title: "Professional Skills",
    icon: <Brain className="w-6 h-6 text-pink-400" />,
    skills: [
      "Project Management", "Logic Building", "Team Collaboration", 
      "Freelancing", "Educational Content Design"
    ]
  }
};

const EXTRA_SKILLS = [
  "Object-Oriented Programming", "Console Applications", "API Integration", "Database Management", "Sorting Techniques"
];

const PROJECTS = [
  {
    title: "Online Shopping System",
    description: "A comprehensive console-based C++ application simulating an e-commerce platform. Features product browsing, cart management, and order processing.",
    tags: ["C++", "File I/O", "Modular Programming"],
    featured: true,
    icon: <ShoppingCart className="text-yellow-400" />
  },
  {
    title: "Spotify Clone",
    description: "A responsive web interface replicating Spotify. Integrated with the Spotify Developer API to fetch and render track data, manage playlists, and simulate playback.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "Spotify API"],
    featured: true,
    icon: <Music className="text-green-400" />
  },
  {
    title: "Online Election System",
    description: "Secure voting system built in C. Implements candidate registration, voter authentication, and duplicate vote prevention using robust file handling.",
    tags: ["C", "Security", "File Handling", "Validation"],
    featured: false,
    icon: <Vote className="text-cyan-400" />
  }
];

const FLAGSHIP_PROJECT = {
  title: "Custom Programming Solutions",
  subtitle: "Freelance Educational Logic Design",
  challenge: "Students and educators often struggle with visualizing complex sorting algorithms and file handling mechanisms in C programming.",
  solution: "Designed and delivered custom C programs tailored for educational use. These solutions focus on logic-based clarity, implementing efficient sorting techniques and demonstrating secure file handling mechanisms for academic assignments.",
  impact: "Enhanced learning outcomes for students by providing clean, modular, and well-documented code examples that bridge the gap between theory and practical implementation.",
  metrics: [
    { label: "Role", value: "Freelancer" },
    { label: "Focus", value: "Logic" },
    { label: "Status", value: "Active" }
  ],
  stack: ["C Language", "Algorithms", "Data Structures", "File I/O", "Optimization", "Education"]
};

// NEW DATA FOR RESUME
const EDUCATION_DATA = [
  {
    institution: "SRM University AP",
    degree: "B.Tech in Computer Science & Engineering",
    year: "2023 - 2027",
    score: "CGPA: 3.01/4.0",
    icon: <Code2 size={16} />
  },
  {
    institution: "Sri Bhavishya Junior College",
    degree: "Intermediate (MPC)",
    year: "2021 - 2023",
    score: "Score: 879/1000",
    icon: <Brain size={16} />
  },
  {
    institution: "St. John's High School",
    degree: "Class 10th (AP State Board)",
    year: "2021",
    score: "10.0 GPA",
    icon: <Brain size={16} />
  }
];

const EXPERIENCE_DATA = [
  {
    role: "Freelance Programmer",
    company: "Custom Programming Solutions",
    year: "Nov 2024 - Present",
    description: "Designing tailored C programs for educational use, delivering logic-based solutions involving sorting techniques and file handling mechanisms.",
    icon: <Terminal size={16} />
  },
  {
    role: "Project Developer",
    company: "Online Shopping System",
    year: "Nov 2024",
    description: "Developed a console-based C++ application simulating an online shopping platform with product browsing and order handling features.",
    icon: <ShoppingCart size={16} />
  }
];

/**
 * ANIMATION COMPONENTS
 * ------------------------------------------------------------------
 */

// 1. DECRYPTED TEXT EFFECT (Hacker Style)
const DecryptedText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  
  useEffect(() => {
    let iteration = 0;
    let interval = null;

    if (isHovering) { 
        interval = setInterval(() => {
            setDisplayText(prev => 
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    } else {
        setDisplayText(text); 
    }

    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <span 
        onMouseEnter={() => setIsHovering(true)} 
        onMouseLeave={() => setIsHovering(false)}
        className={`${className} cursor-default`}
    >
        {displayText}
    </span>
  );
};

// 2. 3D TILT CARD (Interactive Depth)
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const div = cardRef.current;
    const rect = div.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    const x = yPct * 15; 
    const y = -xPct * 15; 
    
    setRotation({ x, y });
    setPosition({ x: mouseX, y: mouseY });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out transform-gpu rounded-xl border border-slate-800 bg-slate-900/40 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(45, 212, 191, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full z-20">{children}</div>
    </div>
  );
};

// 3. REVEAL ON SCROLL (Staggered)
const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) transform ${
        isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-12 blur-sm"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// 4. TYPEWRITER (Clean)
const Typewriter = ({ text, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout;
    let currentIndex = 0;

    const startTyping = () => {
       const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); 
      return () => clearInterval(interval);
    };

    timeout = setTimeout(startTyping, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${className} font-mono`}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 text-cyan-400`}>_</span>
    </span>
  );
};

// 5. MAGNETIC BUTTON
const MagneticButton = ({ children, onClick, className = "" }) => {
    const btnRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.2, y: y * 0.2 }); 
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <button
            ref={btnRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`transition-transform duration-200 ease-out ${className}`}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
            {children}
        </button>
    );
};


// BACKGROUND
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    const particleCount = 40; 
    const connectionDistance = 160;
    const mouseDistance = 220;

    let mouse = { x: null, y: null };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseVx = (Math.random() - 0.5) * 0.3;
        this.baseVy = (Math.random() - 0.5) * 0.3;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.size = Math.random() * 1.5 + 0.5; 
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        this.pulse += 0.05;
        this.x += this.vx;
        this.y += this.vy;

        this.vx += (this.baseVx - this.vx) * 0.05;
        this.vy += (this.baseVy - this.vy) * 0.05;

        if (this.x < 0 || this.x > width) { this.vx *= -1; this.baseVx *= -1; }
        if (this.y < 0 || this.y > height) { this.vy *= -1; this.baseVy *= -1; }

        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = forceDirectionX * force * 0.5; 
            const directionY = forceDirectionY * force * 0.5;
            this.vx -= directionX;
            this.vy -= directionY;
          }
        }
      }

      draw(currentSizePulse) {
        ctx.fillStyle = `rgba(45, 212, 191, ${0.2 + currentSizePulse * 0.5})`; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        const pulseAmt = Math.sin(particles[i].pulse) * 0.1;
        particles[i].draw(pulseAmt);

        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 0.1 * (1 - distance / connectionDistance);
            ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`; 
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-black" />;
};

// NAV COMPONENT
const Navbar = ({ activePage, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => scrollToSection('home')}
        >
          {/* Logo matches the text style in the video */}
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300 font-heading group-hover:text-cyan-400">
            Praneeth<span className="text-cyan-400 group-hover:text-white">.dev</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative text-sm font-medium transition-colors duration-300 text-slate-400 hover:text-white group py-1 ${activePage === link.id ? 'text-white' : ''}`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform origin-left transition-transform duration-300 ${activePage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
          ))}
        </div>

        <button className="md:hidden text-slate-300 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black border-b border-slate-800 shadow-xl transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'}`}>
        <div className="flex flex-col p-6 gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setIsOpen(false);
              }}
              className={`text-left py-2 font-medium ${
                activePage === link.id ? 'text-cyan-400' : 'text-slate-400'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// 3. PAGE SECTIONS

const Home = ({ scrollToSection }) => (
  <div className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden" id="home">
    <div className="max-w-5xl w-full text-center z-10">
      
      <div className="mb-8 animate-fade-in-up">
        <RevealOnScroll>
          <div className="inline-block px-4 py-2 mb-8 bg-slate-900/80 border border-slate-800 rounded-lg hover:border-cyan-500/50 transition-colors duration-300 cursor-code group">
              <span className="font-mono text-cyan-400 text-sm group-hover:animate-pulse">$ sudo run_career --init</span>
          </div>
        </RevealOnScroll>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 animate-fade-in-up delay-100 font-heading">
          Avula Sai Praneeth <br />
          <DecryptedText 
            text="Yaswanth Reddy" 
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 neon-text inline-block p-2"
          />
        </h1>
        
        <RevealOnScroll delay={200}>
          <h2 className="text-xl md:text-2xl text-slate-400 font-normal tracking-wide mb-10">
            Computer Science <span className="text-purple-400">&</span> Engineering Student
          </h2>
        </RevealOnScroll>
      </div>
      
      <div className="text-slate-400 text-lg mb-12 h-8 flex items-center justify-center font-mono">
        <span className="text-cyan-500 mr-3">&gt;</span>
        <Typewriter text="Building functional applications with code" delay={1000} />
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up delay-300">
        <MagneticButton
          onClick={() => scrollToSection('projects')}
          className="px-8 py-4 bg-slate-900 border border-cyan-500/50 text-cyan-400 font-bold text-sm tracking-widest uppercase rounded hover:bg-cyan-500 hover:text-black shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
        >
          View Projects
        </MagneticButton>
        
        <MagneticButton
          onClick={() => scrollToSection('resume')}
          className="px-8 py-4 bg-slate-900 border border-purple-500/50 text-purple-400 font-bold text-sm tracking-widest uppercase rounded hover:bg-purple-500 hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
        >
          Download Resume
        </MagneticButton>

        <MagneticButton
          onClick={() => scrollToSection('contact')}
          className="px-8 py-4 bg-slate-900 border border-cyan-500/50 text-cyan-400 font-bold text-sm tracking-widest uppercase rounded hover:bg-cyan-500 hover:text-black shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
        >
          Contact Me
        </MagneticButton>
      </div>
    </div>
    
    {/* Animated Background Glows */}
    <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slow pointer-events-none"></div>
    <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10 animate-pulse-slower pointer-events-none"></div>
  </div>
);

const About = () => (
  <div className="min-h-screen pt-32 px-6 max-w-7xl mx-auto relative" id="about">
     {/* Decorative Elements */}
     <div className="absolute top-40 right-10 w-24 h-24 border border-cyan-500/20 rounded-full animate-spin-slow pointer-events-none opacity-50"></div>
     <div className="absolute top-60 right-20 w-12 h-12 border border-purple-500/20 rounded-full animate-reverse-spin pointer-events-none opacity-50"></div>

    <RevealOnScroll>
      <div className="text-center mb-16">
          <div className="text-cyan-400 font-mono text-sm mb-2">// ABOUT ME</div>
          <h2 className="text-4xl font-bold text-white font-heading">Engineering Solutions</h2>
      </div>
    </RevealOnScroll>

    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
      <RevealOnScroll className="space-y-6 text-slate-400 leading-relaxed text-lg">
        <p>
          I am a B.Tech student in Computer Science and Engineering at SRM University AP, with a strong focus on web development and programming. I am skilled in building functional applications and reducing complex problems into logical code.
        </p>
        <p>
          My passion lies in hands-on practice, system optimization, and creating user-friendly interfaces. Whether it's designing a C++ application for online shopping or a web-based Spotify clone, I am enthusiastic about leveraging code for real-world problem solving.
        </p>
        <div className="bg-slate-900/50 border-l-4 border-cyan-400 p-6 mt-8 hover:bg-slate-900 transition-colors duration-300 rounded-r-lg group">
            <span className="text-white font-bold block mb-2 text-lg">My mission:</span>
            <span className="text-cyan-400 font-mono text-xl group-hover:translate-x-2 transition-transform inline-block">Code for Optimization.</span>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-2 gap-4 perspective-1000">
          <RevealOnScroll delay={100} className="h-full">
            <TiltCard className="p-6 flex flex-col items-center text-center h-full hover:border-cyan-500/30 transition-colors">
                <Code2 className="text-cyan-400 mb-4" size={32} />
                <h3 className="text-white font-bold mb-1">C / C++</h3>
                <p className="text-xs text-slate-500">System Programming</p>
            </TiltCard>
          </RevealOnScroll>
          <RevealOnScroll delay={200} className="h-full">
            <TiltCard className="p-6 flex flex-col items-center text-center h-full hover:border-purple-500/30 transition-colors">
                <Globe className="text-purple-400 mb-4" size={32} />
                <h3 className="text-white font-bold mb-1">Web Dev</h3>
                <p className="text-xs text-slate-500">HTML, CSS, JS, PHP</p>
            </TiltCard>
          </RevealOnScroll>
          <RevealOnScroll delay={300} className="h-full">
            <TiltCard className="p-6 flex flex-col items-center text-center h-full hover:border-pink-500/30 transition-colors">
                <Database className="text-pink-400 mb-4" size={32} />
                <h3 className="text-white font-bold mb-1">Data Logic</h3>
                <p className="text-xs text-slate-500">File Handling & I/O</p>
            </TiltCard>
          </RevealOnScroll>
          <RevealOnScroll delay={400} className="h-full">
             <TiltCard className="p-6 flex flex-col items-center text-center h-full hover:border-yellow-500/30 transition-colors">
                <Zap className="text-yellow-400 mb-4" size={32} />
                <h3 className="text-white font-bold mb-1">Optimization</h3>
                <p className="text-xs text-slate-500">Problem Solving</p>
            </TiltCard>
          </RevealOnScroll>
      </div>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800 pt-12">
        <RevealOnScroll delay={100} className="text-center group cursor-default p-4 hover:bg-slate-900/30 rounded-lg transition-colors">
            <div className="text-4xl font-bold text-cyan-400 mb-2 neon-text group-hover:scale-110 transition-transform duration-300">B.Tech</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">CSE Student</div>
        </RevealOnScroll>
        <RevealOnScroll delay={200} className="text-center group cursor-default p-4 hover:bg-slate-900/30 rounded-lg transition-colors">
            <div className="text-4xl font-bold text-cyan-400 mb-2 neon-text group-hover:scale-110 transition-transform duration-300">3+</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Academic Projects</div>
        </RevealOnScroll>
        <RevealOnScroll delay={300} className="text-center group cursor-default p-4 hover:bg-slate-900/30 rounded-lg transition-colors">
            <div className="text-4xl font-bold text-cyan-400 mb-2 neon-text group-hover:scale-110 transition-transform duration-300">Freelance</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Experience</div>
        </RevealOnScroll>
        <RevealOnScroll delay={400} className="text-center group cursor-default p-4 hover:bg-slate-900/30 rounded-lg transition-colors">
            <div className="text-4xl font-bold text-cyan-400 mb-2 neon-text group-hover:scale-110 transition-transform duration-300">Learner</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Always Growing</div>
        </RevealOnScroll>
    </div>
  </div>
);

const SkillCard = ({ title, icon, skills, index }) => (
  <RevealOnScroll delay={index * 100} className="h-full">
    <TiltCard className="p-6 h-full bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white font-heading tracking-wide group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <div 
            key={i}
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all duration-300 cursor-default hover:scale-105 hover:shadow-[0_0_10px_rgba(34,211,238,0.1)]"
          >
            {skill}
          </div>
        ))}
      </div>
    </TiltCard>
  </RevealOnScroll>
);

const Skills = () => (
  <div className="min-h-screen pt-32 px-6 max-w-7xl mx-auto" id="skills">
    <RevealOnScroll>
      <div className="text-center mb-16">
          <div className="text-cyan-400 font-mono text-sm mb-2">// TECHNICAL ARSENAL</div>
          <h2 className="text-4xl font-bold text-white mb-4 font-heading">Skills & Technologies</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolkit spanning core programming, web development, and system optimization.
          </p>
      </div>
    </RevealOnScroll>

    <div className="grid md:grid-cols-2 gap-6 mb-20 perspective-1000">
      {Object.values(SKILLS_DATA).map((category, index) => (
        <SkillCard 
          key={index}
          title={category.title}
          icon={category.icon}
          skills={category.skills}
          index={index}
        />
      ))}
    </div>

    <RevealOnScroll className="border-t border-slate-800 pt-10">
        <div className="text-center text-slate-500 mb-8 text-sm font-mono uppercase tracking-widest">Core Competencies</div>
        <div className="flex flex-wrap justify-center gap-3">
            {EXTRA_SKILLS.map((skill, i) => (
                <RevealOnScroll key={i} delay={i * 30} className="inline-block">
                    <span 
                      className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded text-slate-400 text-sm hover:border-purple-500/50 hover:text-purple-400 hover:bg-slate-800 transition-all duration-300 hover:scale-105 cursor-default font-mono block backdrop-blur-sm"
                    >
                        {skill}
                    </span>
                </RevealOnScroll>
            ))}
        </div>
    </RevealOnScroll>
  </div>
);

const Projects = () => (
  <div className="min-h-screen pt-32 px-6 max-w-7xl mx-auto" id="projects">
    <RevealOnScroll>
      <div className="text-center mb-16">
          <div className="text-cyan-400 font-mono text-sm mb-2">// PORTFOLIO</div>
          <h2 className="text-4xl font-bold text-white mb-4 font-heading">Featured Projects</h2>
          <p className="text-slate-400">Practical applications solving real-world problems through modular programming.</p>
      </div>
    </RevealOnScroll>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 perspective-1000">
      {PROJECTS.map((project, index) => (
        <RevealOnScroll key={index} delay={index * 100} className="h-full">
          <TiltCard className="p-6 h-full flex flex-col group hover:bg-slate-900/60 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                    {project.icon}
                </div>
                {project.featured && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded animate-pulse">
                        <Sparkles size={10} /> Featured
                    </span>
                )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors font-heading">
              {project.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs font-mono text-slate-500 bg-black/50 px-2 py-1 rounded border border-slate-800 group-hover:border-slate-600 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </TiltCard>
        </RevealOnScroll>
      ))}
    </div>

    {/* Flagship Project Section */}
    <RevealOnScroll>
      <div className="text-center mb-10">
          <div className="text-purple-400 font-mono text-sm mb-2">// EXPERIENCE</div>
          <h2 className="text-3xl font-bold text-white font-heading">{FLAGSHIP_PROJECT.title}</h2>
      </div>
    </RevealOnScroll>

    <RevealOnScroll>
      <TiltCard className="p-8 md:p-12 overflow-visible border-slate-700/50">
          <div className="grid lg:grid-cols-2 gap-12">
              <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></div>
                      Work Experience
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight font-heading">
                      {FLAGSHIP_PROJECT.subtitle}
                  </h3>
                  
                  <div className="space-y-4 text-slate-400 text-sm mb-8">
                      <p><strong className="text-slate-200">The Challenge:</strong> {FLAGSHIP_PROJECT.challenge}</p>
                      <p><strong className="text-slate-200">The Solution:</strong> {FLAGSHIP_PROJECT.solution}</p>
                      <p><strong className="text-slate-200">The Impact:</strong> {FLAGSHIP_PROJECT.impact}</p>
                  </div>

                  <div className="mb-8">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Competencies</div>
                      <div className="flex flex-wrap gap-2">
                          {FLAGSHIP_PROJECT.stack.map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-cyan-400 text-xs font-mono hover:bg-slate-700 transition-colors cursor-default">
                                  {tech}
                              </span>
                          ))}
                      </div>
                  </div>
              </div>

              <div className="space-y-6">
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4">
                      {FLAGSHIP_PROJECT.metrics.map((metric, i) => (
                          <div key={i} className="bg-black/40 p-4 rounded border border-slate-800 text-center hover:border-cyan-500/30 transition-colors">
                              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{metric.label}</div>
                              <div className="text-xl font-bold text-cyan-400">{metric.value}</div>
                          </div>
                      ))}
                  </div>

                  {/* System Architecture Visualization */}
                  <div className="bg-black/40 border border-slate-800 rounded p-6 h-64 relative flex items-center justify-center overflow-hidden group">
                      <div className="absolute top-4 left-4 text-xs font-mono text-slate-600">Workflow</div>
                      
                      {/* Animated Data Flow */}
                      <div className="absolute inset-0 pointer-events-none">
                         <div className="absolute top-1/2 left-[25%] w-[10px] h-[10px] bg-cyan-400 rounded-full blur-[2px] animate-flow-right"></div>
                      </div>

                      <div className="flex items-center gap-4 z-10">
                          <div className="p-3 bg-slate-800 rounded border border-slate-700 text-xs text-center text-slate-300 w-24 shadow-lg hover:border-slate-500 transition-colors transform group-hover:scale-105 duration-300">
                              Problem
                          </div>
                          <ArrowRight size={16} className="text-slate-600 animate-pulse" />
                          <div className="flex flex-col gap-2">
                              <div className="p-3 bg-purple-900/30 rounded border border-purple-500/30 text-xs text-center text-purple-300 w-32 shadow-[0_0_15px_rgba(168,85,247,0.2)] transform group-hover:scale-105 duration-300 delay-100">
                                  Logic Design
                              </div>
                              <div className="p-3 bg-cyan-900/30 rounded border border-cyan-500/30 text-xs text-center text-cyan-300 w-32 shadow-[0_0_15px_rgba(45,212,191,0.2)] transform group-hover:scale-105 duration-300 delay-200">
                                  Solution
                              </div>
                          </div>
                      </div>
                      
                      <div className="absolute bottom-4 w-full text-center text-[10px] text-slate-600 font-mono">
                          Educational Delivery Pipeline
                      </div>
                  </div>
              </div>
          </div>
      </TiltCard>
    </RevealOnScroll>
  </div>
);

const Resume = () => (
  <div className="min-h-screen flex flex-col items-center justify-center pt-32 px-6" id="resume">
    <div className="max-w-4xl w-full text-center mb-16">
       <RevealOnScroll>
         <div className="text-cyan-400 font-mono text-sm mb-4">// DOWNLOAD</div>
         <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-heading">Resume</h2>
         <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
           My complete professional background, experience, and qualifications.
         </p>
       </RevealOnScroll>

       <RevealOnScroll delay={200}>
         <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto hover:border-cyan-500/30 transition-all duration-300 shadow-2xl relative overflow-hidden group backdrop-blur-md">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
             
             {/* Hover Shine Effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:animate-shine z-0 pointer-events-none"></div>

             <div className="relative z-10">
               <div className="flex items-center justify-center mb-6">
                   <div className="w-20 h-20 bg-slate-950 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300 shadow-xl border border-slate-800">
                       <Activity size={40} />
                   </div>
               </div>

               <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading">Avula Praneeth Reddy</h3>
               <p className="text-slate-400 font-medium mb-1">Computer Science Student & Developer</p>
               <p className="text-xs text-slate-600 font-mono mb-8 uppercase tracking-widest">PDF Format • Last updated Jan 2026</p>

               {/* Stats Grid matching the video style */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border-y border-slate-800 py-6">
                   <div className="text-center">
                       <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Freelance</div>
                       <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Experience</div>
                   </div>
                   <div className="text-center">
                       <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">B.Tech</div>
                       <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Education</div>
                   </div>
                   <div className="text-center">
                       <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">3+</div>
                       <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Projects</div>
                   </div>
                   <div className="text-center">
                       <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">3.01</div>
                       <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">CGPA</div>
                   </div>
               </div>

               <a 
                   href="/Avula%20Sai%20Praneeth%20Yaswanth%20Reddy.pdf" 
                   download="Avula_Sai_Praneeth_Yaswanth_Reddy.pdf"
                   className="w-full py-4 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold rounded-lg uppercase tracking-widest hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer block"
               >
                   <Download size={20} /> Download Resume
               </a>
               
               <a 
                  href="/Avula%20Sai%20Praneeth%20Yaswanth%20Reddy.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 text-xs text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <ExternalLink size={12} /> Or view in browser
               </a>
             </div>
         </div>
       </RevealOnScroll>
    </div>

    {/* Detailed Timeline Section */}
    <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 relative pb-20">
       {/* Central Line for Desktop */}
       <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-slate-800 via-cyan-900/50 to-transparent"></div>

       {/* Experience Column */}
       <div>
          <RevealOnScroll>
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8">
               <div className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                 <Terminal size={24} />
               </div>
               Experience
            </h3>
          </RevealOnScroll>
          <div className="space-y-8">
             {EXPERIENCE_DATA.map((job, index) => (
                <RevealOnScroll key={index} delay={index * 150}>
                   <TiltCard className="p-6 bg-slate-900/40 border border-slate-800 relative group hover:border-purple-500/30 transition-colors">
                      <div className="absolute top-6 -right-3 md:-right-[2.75rem] w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full border-4 border-slate-950 z-10 hidden md:block shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{job.role}</h4>
                         <span className="text-xs font-mono text-slate-400 border border-slate-700 px-2 py-1 rounded bg-slate-950/50">{job.year}</span>
                      </div>
                      <div className="text-sm text-purple-400 font-medium mb-4 flex items-center gap-2">
                         {job.icon} {job.company}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-4">
                         {job.description}
                      </p>
                   </TiltCard>
                </RevealOnScroll>
             ))}
          </div>
       </div>

       {/* Education Column */}
       <div>
          <RevealOnScroll delay={200}>
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8 md:pl-12">
               <div className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                 <Brain size={24} />
               </div>
               Education
            </h3>
          </RevealOnScroll>
          <div className="space-y-8 md:pl-12">
             {EDUCATION_DATA.map((edu, index) => (
                <RevealOnScroll key={index} delay={index * 150 + 200}>
                   <TiltCard className="p-6 bg-slate-900/40 border border-slate-800 relative group hover:border-cyan-500/30 transition-colors">
                      <div className="absolute top-6 -left-3 md:-left-[3.8rem] w-3 h-3 md:w-4 md:h-4 bg-cyan-500 rounded-full border-4 border-slate-950 z-10 hidden md:block shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{edu.institution}</h4>
                         <span className="text-xs font-mono text-slate-400 border border-slate-700 px-2 py-1 rounded bg-slate-950/50">{edu.year}</span>
                      </div>
                      <div className="text-sm text-cyan-400 font-medium mb-4 flex items-center gap-2">
                         {edu.icon} {edu.degree}
                      </div>
                      <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-300 text-xs font-bold">
                         {edu.score}
                      </div>
                   </TiltCard>
                </RevealOnScroll>
             ))}
          </div>
       </div>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:praneethavula160905@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen pt-32 px-6 max-w-4xl mx-auto text-center" id="contact">
      <RevealOnScroll>
        <div className="mb-12">
            <div className="text-cyan-400 font-mono text-sm mb-2">// GET IN TOUCH</div>
            <h2 className="text-4xl font-bold text-white mb-4 font-heading">Contact Me</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
                Have a project in mind or want to discuss development opportunities? Send me a message.
            </p>
        </div>
      </RevealOnScroll>

      <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto">
          <RevealOnScroll delay={100}>
            <a href="mailto:praneethavula160905@gmail.com" className="bg-slate-900/50 border border-slate-800 p-6 rounded hover:border-purple-500/50 transition-colors group cursor-pointer h-full flex flex-col items-center justify-center block">
                <Mail className="mx-auto text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <div className="text-sm font-bold text-white mb-1">Email</div>
                <div className="text-xs text-slate-500 group-hover:text-purple-300 transition-colors break-all px-2">praneethavula160905@gmail.com</div>
            </a>
          </RevealOnScroll>
          <RevealOnScroll delay={150}>
            <a href="https://github.com/YASWANTHREDDY1695" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 border border-slate-800 p-6 rounded hover:border-white/50 transition-colors group cursor-pointer h-full flex flex-col items-center justify-center block">
                <Github className="mx-auto text-white mb-3 group-hover:scale-110 transition-transform" size={24} />
                <div className="text-sm font-bold text-white mb-1">GitHub</div>
                <div className="text-xs text-slate-500 group-hover:text-white transition-colors">@YASWANTHREDDY1695</div>
            </a>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <a href="https://www.linkedin.com/in/avula-sai-praneeth-yaswanth-reddy-590279323" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 border border-slate-800 p-6 rounded hover:border-cyan-500/50 transition-colors group cursor-pointer h-full flex flex-col items-center justify-center block">
                <Linkedin className="mx-auto text-cyan-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <div className="text-sm font-bold text-white mb-1">LinkedIn</div>
                <div className="text-xs text-slate-500 group-hover:text-cyan-300 transition-colors text-center">Avula Praneeth Reddy</div>
            </a>
          </RevealOnScroll>
      </div>

      <RevealOnScroll delay={300}>
        <form className="max-w-xl mx-auto space-y-4" onSubmit={handleSubmit}>
            <div className="text-left group">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block group-focus-within:text-cyan-400 transition-colors">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white focus:border-cyan-500 focus:outline-none transition-colors" 
                  placeholder="Your name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>
            <div className="text-left group">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block group-focus-within:text-cyan-400 transition-colors">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white focus:border-cyan-500 focus:outline-none transition-colors" 
                  placeholder="your.email@example.com" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>
            <div className="text-left group">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block group-focus-within:text-cyan-400 transition-colors">Message</label>
                <textarea 
                  rows="5" 
                  className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white focus:border-cyan-500 focus:outline-none transition-colors" 
                  placeholder="Tell me about your project or inquiry..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
            </div>
            <button className="w-full py-4 bg-cyan-600 text-white font-bold uppercase tracking-widest rounded hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                <Zap size={18} /> Send Message
            </button>
        </form>
      </RevealOnScroll>
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-slate-900 bg-black py-12 mt-20">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
      <div>
        <div className="text-lg font-bold text-white mb-4 font-heading">Praneeth<span className="text-cyan-400">.dev</span></div>
        <p className="text-slate-500 leading-relaxed">
            Computer Science Engineer building functional applications and solving complex problems with code.
        </p>
        <div className="text-slate-600 mt-6">© 2026 Praneeth Reddy.</div>
      </div>
      <div>
        <div className="text-xs font-bold text-white uppercase tracking-widest mb-6">Navigation</div>
        <div className="flex flex-col gap-3 text-slate-500">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">About</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Skills</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Projects</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Resume</span>
        </div>
      </div>
      <div>
        <div className="text-xs font-bold text-white uppercase tracking-widest mb-6">Connect</div>
        <div className="flex gap-4">
             <a href="https://github.com/YASWANTHREDDY1695" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors hover:scale-110"><Github size={20} /></a>
             <a href="https://www.linkedin.com/in/avula-sai-praneeth-yaswanth-reddy-590279323" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors hover:scale-110"><Linkedin size={20} /></a>
             <a href="https://x.com/Praneet94433056" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors hover:scale-110"><Twitter size={20} /></a>
             <a href="mailto:praneethavula160905@gmail.com" className="p-2 bg-slate-900 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors hover:scale-110"><Mail size={20} /></a>
        </div>
      </div>
    </div>
  </footer>
);

// 4. MAIN APP CONTAINER
export default function App() {
  const [activePage, setActivePage] = useState('home');

  // New smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Setup scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePage(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all sections including home
    ['home', ...NAV_LINKS.map(link => link.id)].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-black min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden" style={{ fontFamily: '"Inter", sans-serif' }}>
      <NeuralBackground />
      <Navbar activePage={activePage} scrollToSection={scrollToSection} />
      
      <main className="transition-opacity duration-500">
        <Home scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400&display=swap');

        .font-heading {
          font-family: 'Space Grotesk', sans-serif;
        }

        .neon-text {
          text-shadow: 0 0 10px rgba(45, 212, 191, 0.5), 0 0 20px rgba(45, 212, 191, 0.3);
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }
        @keyframes shine {
            to { transform: translateX(100%); }
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes pulse-slower {
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.15; transform: scale(1.1); }
        }
         @keyframes flow-right {
            0% { transform: translateX(-20px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(80px); opacity: 0; }
        }
         @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
         @keyframes reverse-spin {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-grow {
            animation: grow 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-shine {
            animation: shine 1.5s;
        }
        .animate-pulse-slow {
            animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-pulse-slower {
            animation: pulse-slower 12s infinite ease-in-out;
        }
        .animate-flow-right {
            animation: flow-right 2s infinite linear;
        }
        .animate-spin-slow {
             animation: spin-slow 12s linear infinite;
        }
        .animate-reverse-spin {
             animation: reverse-spin 10s linear infinite;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>
    </div>
  );
}