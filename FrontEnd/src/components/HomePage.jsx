import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search, Upload, BarChart3, Clock, Globe, Zap, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import Navigation from './Navigation';

const HomePage = ({ darkMode, setDarkMode, isAuthenticated, user, onLogout }) => {
  const [stats, setStats] = useState({
    threats: 0,
    users: 0,
    sources: 0
  });

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

    return () => clearInterval(interval);
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
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-950 dark:bg-gray-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-purple-500/20 to-pink-600/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 backdrop-blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:60px_60px]"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 dark:bg-indigo-900/50 dark:text-indigo-300 mb-4 sm:mb-5 backdrop-blur-xl">
                  <Zap className="w-4 h-4 mr-2" />
                  Real-time Threat Intelligence Platform
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-12">
                  <div className="lg:w-1/2 lg:flex-1">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-white text-center lg:text-left">
                      <span className="block mb-2 sm:mb-3">Advanced Threat</span>
                      <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                        Intelligence Platform
                      </span>
                    </h1>
                    <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-300 sm:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                      ThreatSense provides comprehensive threat intelligence and analysis tools to protect your organization. 
                      Our platform aggregates data from multiple sources to give you real-time insights into emerging threats.
                    </p>
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                      <div className="rounded-xl shadow-lg shadow-indigo-500/20">
                        <a
                          href="/dashboard"
                          className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30"
                        >
                          Get Started
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      </div>
                      <div>
                        <a
                          href="#features"
                          className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all duration-200 hover:scale-105 backdrop-blur-xl"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0 lg:w-1/2 lg:flex-1 flex justify-center lg:justify-end">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                      <div className="relative flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <Shield className="w-full h-full text-indigo-400 dark:text-indigo-300 drop-shadow-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
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
      <div id="features" className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to stay secure
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Our platform provides comprehensive threat intelligence and analysis tools to protect your organization.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 h-full">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {feature.icon}
                    </div>
                    <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by security teams worldwide
            </h2>
            <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
              Join thousands of organizations using ThreatSense to protect their assets.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                IOCs Analyzed
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                {stats.threats.toLocaleString()}+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                Active Users
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                {stats.users.toLocaleString()}+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                Threat Sources
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                {stats.sources}+
              </dd>
            </div>
          </dl>
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