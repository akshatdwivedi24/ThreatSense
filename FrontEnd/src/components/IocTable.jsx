import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { AlertTriangle, Globe, FileText, ArrowUpDown, Eye, Shield, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

const IocTable = forwardRef((props, ref) => {
  const [iocs, setIocs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedIocs, setSelectedIocs] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchIocs = async () => {
      try {
        console.log('Fetching IOCs...');
        const response = await fetch('http://localhost:8081/api/iocs');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch IOCs: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Fetched IOCs:', data);
        setIocs(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching IOCs:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIocs();
    const interval = setInterval(fetchIocs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedIocs = [...iocs].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredIocs = sortedIocs.filter(ioc => {
    const matchesSearch = ioc.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ioc.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || ioc.type.toLowerCase() === typeFilter;
    const matchesSeverity = severityFilter === 'all' || ioc.severity?.toLowerCase() === severityFilter;
    return matchesSearch && matchesType && matchesSeverity;
  });

  const paginatedIocs = filteredIocs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredIocs.length / itemsPerPage);

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'ip':
        return <Globe className="h-4 w-4" />;
      case 'domain':
        return <Globe className="h-4 w-4" />;
      case 'hash':
        return <FileText className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity) => {
    const severityMap = {
      high: { color: 'bg-red-500', text: 'High' },
      medium: { color: 'bg-yellow-500', text: 'Medium' },
      low: { color: 'bg-green-500', text: 'Low' }
    };
    const { color, text } = severityMap[severity?.toLowerCase()] || { color: 'bg-gray-500', text: 'Unknown' };
    return <Badge className={`${color} text-white`}>{text}</Badge>;
  };

  const handleIocAction = async (action, iocId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/iocs/${iocId}/${action}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error(`Failed to ${action} IOC`);
      // Refresh IOCs after action
      fetchIocs();
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  const exportToCSV = () => {
    try {
      // Prepare CSV content
      const headers = ['Type', 'Value', 'Source', 'Severity', 'First Seen', 'Last Updated'];
      const csvContent = [
        headers.join(','),
        ...filteredIocs.map(ioc => {
          // Helper function to safely format dates
          const formatDate = (dateString) => {
            try {
              if (!dateString) return 'N/A';
              const date = new Date(dateString);
              return isNaN(date.getTime()) ? 'N/A' : date.toISOString();
            } catch (error) {
              return 'N/A';
            }
          };

          return [
            ioc.type || 'N/A',
            `"${ioc.value || 'N/A'}"`, // Wrap in quotes to handle commas in values
            ioc.source || 'N/A',
            ioc.severity || 'N/A',
            formatDate(ioc.firstSeen),
            formatDate(ioc.lastUpdated)
          ].join(',');
        })
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ioc_data_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    }
  };

  // Expose the export function to parent component
  useImperativeHandle(ref, () => ({
    exportToCSV
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search IOCs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-gray-800/50 border-gray-700 text-gray-300 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-gray-300">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-gray-300">All Types</SelectItem>
            <SelectItem value="ip" className="text-gray-300">IP Address</SelectItem>
            <SelectItem value="domain" className="text-gray-300">Domain</SelectItem>
            <SelectItem value="hash" className="text-gray-300">File Hash</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700 text-gray-300">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-gray-300">All Severities</SelectItem>
            <SelectItem value="high" className="text-gray-300">High</SelectItem>
            <SelectItem value="medium" className="text-gray-300">Medium</SelectItem>
            <SelectItem value="low" className="text-gray-300">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {iocs.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No IOCs found. Data will appear here once the scraper collects some indicators.</p>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-gray-700/50">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700/50 hover:bg-gray-800/30">
                  <TableHead className="w-[100px] cursor-pointer text-gray-300 hover:text-gray-100 transition-colors" onClick={() => handleSort('type')}>
                    <div className="flex items-center">
                      Type
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer text-gray-300 hover:text-gray-100 transition-colors" onClick={() => handleSort('value')}>
                    <div className="flex items-center">
                      Value
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer text-gray-300 hover:text-gray-100 transition-colors" onClick={() => handleSort('source')}>
                    <div className="flex items-center">
                      Source
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer text-gray-300 hover:text-gray-100 transition-colors" onClick={() => handleSort('severity')}>
                    <div className="flex items-center">
                      Severity
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">Tags</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedIocs.map((ioc) => (
                  <TableRow 
                    key={ioc.id}
                    className="border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <TableCell className="text-gray-300">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(ioc.type)}
                        <span className="capitalize">{ioc.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-gray-300">{ioc.value}</TableCell>
                    <TableCell className="text-gray-300">{ioc.source}</TableCell>
                    <TableCell>{getSeverityBadge(ioc.severity)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {ioc.tags?.map((tag, index) => (
                          <Badge 
                            key={`${ioc.id}-${tag}-${index}`} 
                            className="bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleIocAction('view', ioc.id)}
                          className="p-1 hover:bg-gray-800/50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleIocAction('block', ioc.id)}
                          className="p-1 hover:bg-gray-800/50 rounded transition-colors"
                          title="Block IOC"
                        >
                          <Shield className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleIocAction('flag', ioc.id)}
                          className="p-1 hover:bg-gray-800/50 rounded transition-colors"
                          title="Flag for Review"
                        >
                          <Flag className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, filteredIocs.length)} of {filteredIocs.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default IocTable; 