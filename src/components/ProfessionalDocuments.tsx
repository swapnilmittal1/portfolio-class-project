import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Code, BookOpen, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DocumentModal from './DocumentModal';

interface Document {
  title: string;
  description: string;
  type: string;
  icon: React.ComponentType<any>;
  pdfUrl: string;
  githubUrl?: string;
  highlights: string[];
}

const documents: Document[] = [
  {
    title: "Reverse-Proxy API Debugger",
    description: "A comprehensive technical document showcasing my Palantir Software Engineering Intern application project. This document demonstrates my ability to identify real-world production problems, design practical solutions, and build end-to-end systems that deliver measurable value to engineering teams.",
    type: "Technical Project",
    icon: Code,
    pdfUrl: "/assets/reverse-proxy-debugger.pdf",
    githubUrl: "https://github.com/swapnilmittal1/reverese_proxy_api_debugger",
    highlights: [
      "End-to-end product development from problem definition to deployment",
      "Production API debugging and observability solutions",
      "Web dashboard development with search and analytics capabilities",
      "Clear technical communication for hiring managers and engineers"
    ]
  },
  {
    title: "Meta AI Social Commerce Platform",
    description: "A comprehensive technical document showcasing my full-stack product development capabilities. This project demonstrates my ability to design complete user journeys, architect scalable systems, and integrate AI features into real-world applications. Perfect for hiring managers and PMs evaluating end-to-end product thinking.",
    type: "Full-Stack Project",
    icon: Code,
    pdfUrl: "/assets/meta-ai-social-commerce.pdf",
    githubUrl: "https://github.com/swapnilmittal1/META-AI-Social-Commerce-Platform",
    highlights: [
      "End-to-end product development from design to deployment",
      "Microservices architecture with clear service boundaries",
      "AI-powered recommendations and chat assistant integration",
      "Complete user journey: registration, browsing, ordering, and status tracking"
    ]
  }
];

const ProfessionalDocuments: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (document: Document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <section id="documents" data-scroll-section className="my-32">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
            📄 Professional Documents
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
            Professional Documents
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Key documents that showcase my technical expertise, problem-solving abilities, and professional development. These highlight my capacity to build production systems and communicate complex technical concepts effectively.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="rounded-xl bg-gradient-to-br from-white/5 to-white/10 p-[1px] backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <div className="rounded-xl bg-background/95 backdrop-blur-sm p-8 h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <doc.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gradient clash-grotesk">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {doc.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Highlights:</h4>
                    <ul className="space-y-2">
                      {doc.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handlePreview(doc)}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    {doc.githubUrl ? (
                      <Button
                        variant="outline"
                        onClick={() => window.open(doc.githubUrl, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => window.open(doc.pdfUrl, '_blank')}
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              These documents demonstrate my ability to solve real-world problems and communicate technical solutions effectively
            </span>
          </div>
        </motion.div>
      </div>

      {/* Document Modal */}
      {selectedDocument && (
        <DocumentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedDocument.title}
          pdfUrl={selectedDocument.pdfUrl}
          githubUrl={selectedDocument.githubUrl}
        />
      )}
    </section>
  );
};

export default ProfessionalDocuments;
