import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('https://formspree.io/f/xdklvkqw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thanks! Your message has been sent successfully. I\'ll get back to you soon!' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again or email me directly.' 
      });
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          className="relative group"
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full pl-12 pr-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </motion.div>

        {/* Email Field */}
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          className="relative group"
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="w-full pl-12 pr-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </motion.div>

        {/* Message Field */}
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          className="relative group"
        >
          <div className="relative">
            <MessageSquare className="absolute left-4 top-6 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, idea, or just say hello!"
              required
              rows={5}
              className="w-full pl-12 pr-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full py-4 text-lg font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
          >
            {status.type === 'loading' ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </motion.div>

        {/* Status Message */}
        {status.type !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl flex items-center space-x-3 ${
              status.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : status.type === 'error'
                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : status.type === 'error' ? (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current flex-shrink-0" />
            )}
            <span className="text-sm">{status.message}</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
