import { useState, useEffect } from 'react';
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
import { AlertTriangle, Globe, FileText } from 'lucide-react';

const IocTable = () => {
  const [iocs, setIocs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // Set up polling every 30 seconds
    const interval = setInterval(fetchIocs, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredIocs = iocs.filter(ioc => {
    const matchesSearch = ioc.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ioc.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || ioc.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

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
        <div className="text-red-500">
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
          className="max-w-sm"
        />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="ip">IP Address</SelectItem>
            <SelectItem value="domain">Domain</SelectItem>
            <SelectItem value="hash">File Hash</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {iocs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No IOCs found. Data will appear here once the scraper collects some indicators.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIocs.map((ioc) => (
                <TableRow key={ioc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(ioc.type)}
                      <span className="capitalize">{ioc.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{ioc.value}</TableCell>
                  <TableCell>{ioc.source}</TableCell>
                  <TableCell>{getSeverityBadge(ioc.severity)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ioc.tags?.map((tag, index) => (
                        <Badge key={`${ioc.id}-${tag}-${index}`} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default IocTable; 