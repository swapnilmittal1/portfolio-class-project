import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveAvatarProps {
  className?: string;
}

const InteractiveAvatar: React.FC<InteractiveAvatarProps> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 rounded-full blur-3xl scale-150" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Avatar container with 3D tilt effect */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Avatar image */}
        <div className="relative w-64 h-64 xl:w-80 xl:h-80 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-2xl">
          <Image
            src="/assets/memoji.jpg"
            alt="Swapnil Mittal"
            fill
            className="object-cover transition-all duration-300"
            style={{
              filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
            }}
          />
          
          {/* Overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
          
          {/* Glow effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: `0 0 40px rgba(132, 134, 255, 0.5), 0 0 80px rgba(132, 134, 255, 0.3)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>

        {/* Status indicator */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="w-3 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      {/* Interactive cursor follower */}
      {isHovered && (
        <motion.div
          className="absolute w-4 h-4 bg-primary/50 rounded-full pointer-events-none z-20"
          style={{
            left: mousePosition.x + 128, // Half of avatar width
            top: mousePosition.y + 128,  // Half of avatar height
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        />
      )}

      {/* Floating text */}
      <motion.div
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-lg font-semibold text-foreground mb-1">Interactive Avatar</p>
        <p className="text-sm text-muted-foreground">Move your cursor around</p>
      </motion.div>
    </div>
  );
};

export default InteractiveAvatar;
