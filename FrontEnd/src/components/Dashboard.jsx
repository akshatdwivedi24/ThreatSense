import { useState, useEffect } from 'react';
import { BarChart3, Shield, AlertTriangle, Search, RefreshCw } from 'lucide-react';
import Navigation from './Navigation';
import IocTable from './IocTable';

const Dashboard = ({ darkMode, setDarkMode, isAuthenticated, user, onLogout }) => {
  const [stats, setStats] = useState({
    totalIocs: 0,
    activeThreats: 0,
    searchesToday: 0
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/iocs/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats({
        totalIocs: data.totalIocs,
        activeThreats: data.activeThreats,
        searchesToday: Math.floor(Math.random() * 1000) // Placeholder for search stats
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={fetchStats}
              className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-300">
                Total IOCs
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.totalIocs.toLocaleString()}
              </p>
            </dd>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-red-500 p-3">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-300">
                Active Threats
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.activeThreats.toLocaleString()}
              </p>
            </dd>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-green-500 p-3">
                <Search className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-300">
                Searches Today
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.searchesToday.toLocaleString()}
              </p>
            </dd>
          </div>
        </div>

        {/* IOC Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Live IOC Feed</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Real-time updates on Indicators of Compromise from various sources
            </p>
          </div>
          <div className="px-4 sm:px-6 pb-4">
            <IocTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 