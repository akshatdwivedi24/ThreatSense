import { Shield, TrendingUp, Mail, Bookmark, User } from 'lucide-react';
import Navigation from './Navigation';

const Features = ({ darkMode, setDarkMode, isAuthenticated, user, onLogout }) => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-indigo-400" />,
      title: "Threat Lookup Tool",
      description: "Comprehensive tool for searching and analyzing threats across multiple sources. Get detailed information about specific threats, their indicators, and recommended actions."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-indigo-400" />,
      title: "Threat Trends & Analytics",
      description: "Advanced analytics dashboard showing threat trends, patterns, and statistics. Visualize threat data through interactive charts and graphs for better insights."
    },
    {
      icon: <Mail className="h-8 w-8 text-indigo-400" />,
      title: "Daily/Weekly IOC Feed Email Alerts",
      description: "Stay updated with regular email alerts containing the latest Indicators of Compromise. Customize your alert preferences and frequency."
    },
    {
      icon: <Bookmark className="h-8 w-8 text-indigo-400" />,
      title: "User-Saved Watchlists / Favorites",
      description: "Create and manage personalized watchlists of threats and indicators. Save important findings for quick access and monitoring."
    },
    {
      icon: <User className="h-8 w-8 text-indigo-400" />,
      title: "Threat Group/Actor Profiles",
      description: "Detailed profiles of known threat actors and groups. Access historical data, tactics, techniques, and procedures (TTPs) used by different threat actors."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navigation 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <h1 className="text-3xl font-bold text-white mb-8">Features</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm p-6 border border-gray-700/50">
                <div className="flex items-center space-x-4 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 