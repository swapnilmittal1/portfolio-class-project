import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

interface SimpleSplineProps {
  scene: string;
  className?: string;
}

const SimpleSpline: React.FC<SimpleSplineProps> = ({ scene, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    console.log('SimpleSpline: Component mounted, starting load');
    
    // Show fallback after 5 seconds if still loading
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.log('SimpleSpline: Timeout reached, showing fallback');
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  const handleLoad = () => {
    console.log('SimpleSpline: Animation loaded successfully');
    setIsLoading(false);
    setHasError(false);
    setShowFallback(false);
  };

  const handleError = (error: any) => {
    console.error('SimpleSpline: Animation failed to load:', error);
    setHasError(true);
    setIsLoading(false);
    setShowFallback(true);
  };

  // Show fallback if there's an error or timeout
  if (hasError || showFallback) {
    return (
      <div className={`flex items-center justify-center h-96 w-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce">🤖</div>
          <p className="text-lg font-semibold text-foreground mb-2">Interactive 3D Robot</p>
          <p className="text-sm text-muted-foreground">Hover to interact</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground text-sm">Loading 3D Animation...</p>
          </div>
        </div>
      )}
      
      <Spline
        scene={scene}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default SimpleSpline;
