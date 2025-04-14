import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search, Upload, BarChart3, Clock, Globe, Zap, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import Navigation from './Navigation';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
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
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mb-4">
                  <Zap className="w-4 h-4 mr-2" />
                  Real-time Threat Intelligence Platform
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="lg:w-1/2">
                    <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      <span className="block">Advanced Threat</span>
                      <span className="block text-indigo-600 dark:text-indigo-400">Intelligence Platform</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      ThreatSense provides comprehensive threat intelligence and analysis tools to protect your organization. 
                      Our platform aggregates data from multiple sources to give you real-time insights into emerging threats.
                    </p>
                    <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3 sm:gap-4">
                      <div className="rounded-md shadow">
                        <a
                          href="/dashboard"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:scale-105"
                        >
                          Get Started
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      </div>
                      <div>
                        <a
                          href="#features"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:scale-105"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 sm:mt-12 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                      <div className="relative flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <Shield className="w-full h-full text-indigo-600 dark:text-indigo-400" />
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
    </div>
  );
};

export default HomePage; 