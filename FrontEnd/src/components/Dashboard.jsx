import { useState, useEffect, useRef } from 'react';
import { BarChart3, Shield, AlertTriangle, Search, RefreshCw, TrendingUp, Globe, Clock, Activity } from 'lucide-react';
import Navigation from './Navigation';
import IocTable from './IocTable';
import ExportMenu from './ExportMenu';
import EmailShareModal from './EmailShareModal';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = ({ darkMode, setDarkMode, isAuthenticated, user, onLogout }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const iocTableRef = useRef(null);
  const [stats, setStats] = useState({
    totalIocs: 0,
    activeThreats: 0,
    searchesToday: 0,
    threatTrend: 0,
    mitigatedThreats: 0,
    averageResponseTime: 0
  });

  const [timeRange, setTimeRange] = useState('24h');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchStats = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/iocs/stats?timeRange=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats({
        totalIocs: data.totalIocs,
        activeThreats: data.activeThreats,
        searchesToday: Math.floor(Math.random() * 1000),
        threatTrend: data.threatTrend || 12.5,
        mitigatedThreats: data.mitigatedThreats || 85,
        averageResponseTime: data.averageResponseTime || 45
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const handleExportCSV = () => {
    if (iocTableRef.current) {
      iocTableRef.current.exportToCSV();
    }
    setShowExportMenu(false);
  };

  const handleExportEmail = () => {
    setShowExportMenu(false);
    setShowEmailModal(true);
  };

  const handleSendEmail = async (email, message, csvData) => {
    try {
      // TODO: Implement email sending functionality
      // This is where you would call your backend API to send the email
      console.log('Sending email to:', email);
      console.log('Message:', message);
      console.log('CSV Data:', csvData);
      
      // For now, we'll just simulate a successful send
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 to-gray-800`}>
      <Navigation 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Security Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-lg border border-gray-600 bg-gray-800/50 backdrop-blur-sm text-sm text-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button 
              onClick={fetchStats}
              className="flex items-center space-x-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </button>
          </div>
        </div>
        
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {[
            {
              icon: <Shield className="h-6 w-6 text-white" />,
              bgColor: "from-indigo-500/20 to-indigo-600/20",
              iconBg: "bg-indigo-500",
              title: "Total IOCs",
              value: stats.totalIocs.toLocaleString(),
              trend: {
                value: stats.threatTrend,
                icon: <TrendingUp className="h-4 w-4" />,
                color: "text-green-400"
              }
            },
            {
              icon: <AlertTriangle className="h-6 w-6 text-white" />,
              bgColor: "from-red-500/20 to-red-600/20",
              iconBg: "bg-red-500",
              title: "Active Threats",
              value: stats.activeThreats.toLocaleString(),
              subtext: `${stats.mitigatedThreats}% Mitigated`,
              subtextColor: "text-yellow-400"
            },
            {
              icon: <Clock className="h-6 w-6 text-white" />,
              bgColor: "from-green-500/20 to-green-600/20",
              iconBg: "bg-green-500",
              title: "Avg. Response Time",
              value: `${stats.averageResponseTime} min`
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20"></div>
              <div className="relative overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm px-4 py-5 sm:p-6 shadow-lg border border-gray-700/50">
                <dt>
                  <div className={`absolute rounded-lg ${stat.iconBg} bg-gradient-to-r ${stat.bgColor} p-3`}>
                    {stat.icon}
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-300">
                    {stat.title}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  {stat.trend && (
                    <p className={`ml-2 flex items-baseline text-sm font-semibold ${stat.trend.color}`}>
                      {stat.trend.icon}
                      <span className="ml-1">{stat.trend.value}%</span>
                    </p>
                  )}
                  {stat.subtext && (
                    <p className={`ml-2 flex items-baseline text-sm font-semibold ${stat.subtextColor}`}>
                      {stat.subtext}
                    </p>
                  )}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Threat Distribution Chart */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Threat Distribution
              </h3>
              <div className="h-64">
                <Doughnut
                  data={{
                    labels: ['Malware', 'Phishing', 'Ransomware', 'DDoS', 'Data Breach', 'Zero-Day', 'Insider Threat'],
                    datasets: [{
                      data: [25, 20, 15, 12, 10, 10, 8],
                      backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',  // indigo
                        'rgba(168, 85, 247, 0.8)',  // purple
                        'rgba(236, 72, 153, 0.8)',  // pink
                        'rgba(16, 185, 129, 0.8)',  // green
                        'rgba(245, 158, 11, 0.8)',  // yellow
                        'rgba(239, 68, 68, 0.8)',   // red
                        'rgba(59, 130, 246, 0.8)',  // blue
                      ],
                      borderColor: [
                        'rgba(99, 102, 241, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(59, 130, 246, 1)',
                      ],
                      borderWidth: 2,
                      hoverOffset: 10,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: '#E5E7EB',
                          font: {
                            size: 12
                          },
                          padding: 20,
                          usePointStyle: true,
                          pointStyle: 'circle'
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                          }
                        },
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#E5E7EB',
                        bodyColor: '#E5E7EB',
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        borderWidth: 1,
                        padding: 10
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Geographic Distribution
              </h3>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ['United States', 'China', 'Russia', 'Germany', 'United Kingdom', 'India', 'Brazil', 'Japan', 'South Korea', 'France'],
                    datasets: [{
                      label: 'Threats Detected',
                      data: [35, 25, 15, 8, 7, 5, 3, 2, 2, 1],
                      backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(20, 184, 166, 0.8)',
                        'rgba(249, 115, 22, 0.8)'
                      ],
                      borderColor: [
                        'rgba(99, 102, 241, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(20, 184, 166, 1)',
                        'rgba(249, 115, 22, 1)'
                      ],
                      borderWidth: 1,
                      borderRadius: 4,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.raw}% of total threats`;
                          }
                        },
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#E5E7EB',
                        bodyColor: '#E5E7EB',
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        borderWidth: 1,
                        padding: 10
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(75, 85, 99, 0.2)',
                          drawBorder: false
                        },
                        ticks: {
                          color: '#E5E7EB',
                          font: {
                            size: 12
                          }
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(75, 85, 99, 0.2)',
                          drawBorder: false
                        },
                        ticks: {
                          color: '#E5E7EB',
                          callback: function(value) {
                            return value + '%';
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 p-6">
            <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Activity />, text: "Run Analysis" },
                { icon: <Globe />, text: "Scan Network" },
                { icon: <Shield />, text: "Update Rules" },
                { icon: <BarChart3 />, text: "Generate Report" }
              ].map((action, index) => (
                <button
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-600/10 hover:from-indigo-500/20 hover:to-purple-600/20 transition-colors duration-150"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-indigo-400">
                      {action.icon}
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-300">
                      {action.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* IOC Table Section */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-700/50">
              <div>
                <h2 className="text-lg font-medium text-white">Live IOC Feed</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Real-time updates on Indicators of Compromise from various sources
                </p>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  Export Data
                </button>
                {showExportMenu && (
                  <ExportMenu
                    onClose={() => setShowExportMenu(false)}
                    onExportCSV={handleExportCSV}
                    onExportEmail={handleExportEmail}
                  />
                )}
              </div>
            </div>
            <div className="px-4 sm:px-6 pb-4">
              <IocTable ref={iocTableRef} />
            </div>
          </div>
        </div>
      </div>

      <EmailShareModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={handleSendEmail}
        csvData={iocTableRef.current?.getCSVData?.()}
      />
    </div>
  );
};

export default Dashboard; 