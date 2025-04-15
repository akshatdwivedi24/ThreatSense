import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail } from 'lucide-react';

const ExportMenu = ({ onClose, onExportCSV, onExportEmail }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 z-50"
    >
      <div className="py-1">
        <button
          onClick={() => {
            onExportCSV();
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </button>
        <button
          onClick={() => {
            onExportEmail();
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
        >
          <Mail className="h-4 w-4 mr-2" />
          Share via Email
        </button>
      </div>
    </motion.div>
  );
};

export default ExportMenu; 