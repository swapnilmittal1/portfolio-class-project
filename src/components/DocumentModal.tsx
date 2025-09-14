import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
  githubUrl?: string;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  title,
  pdfUrl,
  githubUrl
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-6xl h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-semibold text-gradient clash-grotesk">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Professional Document Preview
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(githubUrl, '_blank')}
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(pdfUrl, '_blank')}
                className="flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="h-full p-6">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full border-0 rounded-lg"
              title={title}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentModal;
