import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, pdfUrl, title = "Resume" }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[95vw] h-[90vh] max-w-6xl bg-background rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/[6.5%] to-white/5">
              <h3 className="text-xl font-semibold text-gradient clash-grotesk">
                {title}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors group"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </button>
                <button
                  onClick={handleOpenInNewTab}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors group"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors group"
                  title="Close"
                >
                  <X className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
                </button>
              </div>
            </div>
            
            {/* PDF Viewer */}
            <div className="h-[calc(100%-4rem)]">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full border-0"
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFModal;
