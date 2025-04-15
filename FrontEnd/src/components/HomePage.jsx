import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search, Upload, BarChart3, Clock, Globe, Zap, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import Navigation from './Navigation';
import { motion } from 'framer-motion';

const HomePage = ({ darkMode, setDarkMode, isAuthenticated, user, onLogout }) => {
  const [stats, setStats] = useState({
    threats: 0,
    users: 0,
    sources: 0
  });

  // Add network lines state
  const [networkLines, setNetworkLines] = useState([]);

  // Add circuit lines state
  const [circuitLines, setCircuitLines] = useState([]);

  useEffect(() => {
    const targetValues = {
      threats: 100000,
      users: 5000,
      sources: 50
    };

    const interval = setInterval(() => {
      setStats(prev => {
        const newStats = {
          threats: Math.min(prev.threats + 100, targetValues.threats),
          users: Math.min(prev.users + 50, targetValues.users),
          sources: Math.min(prev.sources + 1, targetValues.sources)
        };

        // Clear interval if all values have reached their targets
        if (
          newStats.threats === targetValues.threats &&
          newStats.users === targetValues.users &&
          newStats.sources === targetValues.sources
        ) {
          clearInterval(interval);
        }

        return newStats;
      });
    }, 10);

    // Create network lines
    const createNetworkLine = () => {
      const line = {
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      };
      setNetworkLines(prev => [...prev, line]);
      
      // Remove the line after animation
      setTimeout(() => {
        setNetworkLines(prev => prev.filter(l => l.id !== line.id));
      }, line.duration * 1000);
    };

    // Create initial lines
    for (let i = 0; i < 10; i++) {
      setTimeout(createNetworkLine, i * 200);
    }

    // Create new lines periodically
    const networkInterval = setInterval(createNetworkLine, 400);

    // Create circuit lines
    const createCircuitLine = () => {
      const line = {
        id: Math.random(),
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        rotate: Math.random() * 360,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2
      };
      setCircuitLines(prev => [...prev, line]);
      
      // Remove the line after animation
      setTimeout(() => {
        setCircuitLines(prev => prev.filter(l => l.id !== line.id));
      }, line.duration * 1000);
    };

    // Create initial lines
    for (let i = 0; i < 8; i++) {
      setTimeout(createCircuitLine, i * 300);
    }

    // Create new lines periodically
    const circuitInterval = setInterval(createCircuitLine, 600);

    return () => {
      clearInterval(interval);
      clearInterval(networkInterval);
      clearInterval(circuitInterval);
    };
  }, []);

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Real-time IOC Search",
      description: "Search through millions of Indicators of Compromise in real-time with our advanced search engine"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Threat Intelligence",
      description: "Get comprehensive threat intelligence from multiple sources with automated correlation"
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Bulk IOC Upload",
      description: "Upload and analyze multiple IOCs in various formats with instant results"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Visualize threat data with interactive charts and real-time analytics"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Historical Analysis",
      description: "Track and analyze historical threat patterns with advanced timeline visualization"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Integration",
      description: "Seamlessly integrate with your existing security tools via API or plugins"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CISO, TechCorp",
      content: "ThreatSense has revolutionized our threat intelligence operations. The real-time analysis and comprehensive data sources are unmatched.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Security Analyst, FinSecure",
      content: "The platform's intuitive interface and powerful analytics have significantly reduced our incident response time.",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "Threat Intelligence Lead, GlobalBank",
      content: "ThreatSense provides the most comprehensive threat intelligence I've seen. The integration capabilities are exceptional.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} isAuthenticated={isAuthenticated} user={user} onLogout={onLogout} />
      
      {/* Hero Section */}
      <section className="relative hero-background min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="particle-grid"></div>
        <div className="cyber-wave"></div>
        <div className="network-grid"></div>
        
        {/* Network Lines */}
        <div className="network-lines">
          {networkLines.map(line => (
            <motion.div
              key={line.id}
              className="network-line"
              style={{
                left: line.left,
                animationDelay: `${line.delay}s`,
                animationDuration: `${line.duration}s`
              }}
            />
          ))}
        </div>
        
        {/* Circuit Lines */}
        {circuitLines.map(line => (
          <motion.div
            key={line.id}
            className="circuit-line"
            style={{
              top: line.top,
              left: line.left,
              transform: `rotate(${line.rotate}deg)`,
              animationDelay: `${line.delay}s`,
              animationDuration: `${line.duration}s`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}
        
        {/* Circuit Nodes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="circuit-node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
        
        {/* Floating particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Glowing orbs */}
        <div className="glow-effect" style={{ left: '20%', top: '20%' }}></div>
        <div className="glow-effect" style={{ right: '20%', bottom: '30%' }}></div>
        <div className="glow-effect" style={{ left: '50%', bottom: '20%' }}></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold relative z-10"
                >
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 bg-clip-text text-transparent relative z-10 flex flex-wrap gap-2 justify-center lg:justify-start"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className="text-5xl md:text-6xl lg:text-7xl font-bold">Advanced</span>
                        <span className="text-5xl md:text-6xl lg:text-7xl font-bold">Threat</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-normal">Intelligence</span>
                        <span className="text-5xl md:text-6xl lg:text-7xl font-bold">Platform</span>
                      </div>

                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                          repeatDelay: 0.5,
                        }}
                        style={{ mixBlendMode: 'overlay' }}
                      />
                    </motion.div>

                    {/* Glowing line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[1px]"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
                      }}
                      animate={{
                        scaleX: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.4, 0.6, 1],
                      }}
                    />

                    {/* Cyber dots */}
                    <div className="absolute -inset-x-4 -inset-y-4 -z-10">
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-indigo-500/30 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            opacity: [0, 0.5, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>

                    {/* Cyber grid */}
                    <div 
                      className="absolute inset-0 -z-20"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, rgba(99,102,241,0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(99,102,241,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                      }}
                    />
                  </div>
                </motion.h1>

                {/* Enhanced floating particles */}
                <motion.div className="absolute inset-0 -z-10">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-indigo-500/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              <motion.p 
                className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.span
                  className="text-indigo-400 font-semibold inline-block"
                  animate={{
                    color: ["#818cf8", "#a78bfa", "#818cf8"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  ThreatSense
                </motion.span>{" "}
                provides comprehensive threat intelligence and analysis tools to help security teams{" "}
                <motion.span
                  className="text-purple-400 font-semibold inline-block"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  identify
                </motion.span>
                ,{" "}
                <motion.span
                  className="text-blue-400 font-semibold inline-block"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  analyze
                </motion.span>
                , and{" "}
                <motion.span
                  className="text-indigo-400 font-semibold inline-block"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  respond
                </motion.span>{" "}
                to emerging threats in real-time.
              </motion.p>

              <motion.div 
                className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.button 
                  className="relative px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold transition-all transform hover:scale-105 group overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Get Started</span>
                </motion.button>

                <motion.button 
                  className="relative px-8 py-3 rounded-lg border border-indigo-600 text-indigo-400 font-semibold transition-all transform hover:scale-105 group overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.5
                    }}
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Learn More</span>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="floating relative w-full max-w-2xl mx-auto mt-24 lg:mt-8">
                <div className="shield-container">
                  <div className="shield-glow absolute inset-0"></div>
                  <div className="shield-ring absolute inset-[-10%] rounded-full border border-indigo-500/20"></div>
                  <div className="shield-ring-outer absolute inset-[-20%] rounded-full border border-indigo-500/10"></div>
                  <motion.div
                    className="shield-pulse absolute inset-[-5%] rounded-full bg-indigo-500/5"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                  <motion.div 
                    animate={{
                      rotateZ: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="shield-particles absolute inset-[-30%] opacity-50"
                  >
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-indigo-500/30 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `rotate(${i * 45}deg) translateY(-150%)`,
                        }}
                      />
                    ))}
                  </motion.div>
                  <Shield className="w-full h-auto text-indigo-500 opacity-90 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {[
            { label: 'IOCs Analyzed', value: stats.threats },
            { label: 'Active Users', value: stats.users },
            { label: 'Threat Sources', value: stats.sources }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 4) }}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-400">{stat.label}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {stat.value.toLocaleString()}+
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>

      {/* Live Threat Feed */}
      <div className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Live Threat Feed
            </h2>
            <p className="mt-3 text-xl text-gray-500 dark:text-gray-300">
              Real-time updates on emerging threats
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">New Malware Campaign Detected</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">2 minutes ago</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500 dark:text-gray-300">
                  A new malware campaign targeting financial institutions has been detected across multiple regions.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-4xl font-extrabold text-white">
                Advanced Security Tools
              </p>
              <div className="mt-4 max-w-2xl mx-auto">
                <p className="text-xl text-gray-300">
                  Comprehensive threat intelligence and analysis tools to protect your organization
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative flex flex-col h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                        {feature.icon}
                      </div>
                      <h3 className="ml-4 text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              What our users say
            </h2>
            <p className="mt-3 text-xl text-gray-500 dark:text-gray-300">
              Trusted by security professionals worldwide
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500 dark:text-gray-300">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-600 dark:text-indigo-400">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-105"
              >
                Get started
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-200 hover:scale-105"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">ThreatSense</span>
              </div>
              <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                Empowering organizations with advanced threat intelligence and cybersecurity solutions.
              </p>
              <div className="mt-6 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Integration Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-base text-gray-400 text-center">
              © 2024 ThreatSense. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 