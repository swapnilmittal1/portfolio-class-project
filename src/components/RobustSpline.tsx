import React, { useState, useEffect, Suspense } from 'react';
import Spline from '@splinetool/react-spline';

interface RobustSplineProps {
  scene: string;
  className?: string;
}

const RobustSpline: React.FC<RobustSplineProps> = ({ scene, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const maxRetries = 2;

  useEffect(() => {
    setIsMounted(true);
    
    // Set a timeout to show error if loading takes too long
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log('Spline loading timeout, showing error');
        setHasError(true);
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleLoad = () => {
    console.log('Spline animation loaded successfully');
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (error: any) => {
    console.error('Spline animation failed to load:', error);
    setHasError(true);
    setIsLoading(false);
    
    if (retryCount < maxRetries) {
      console.log(`Retrying Spline load (${retryCount + 1}/${maxRetries})`);
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setHasError(false);
        setIsLoading(true);
      }, 3000); // 3 second delay between retries
    }
  };

  const handleRetry = () => {
    console.log('Manual retry triggered');
    setRetryCount(0);
    setHasError(false);
    setIsLoading(true);
  };

  if (!isMounted) {
    return (
      <div className={`flex items-center justify-center h-96 w-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="animate-pulse rounded-full h-12 w-12 bg-primary/20 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  if (hasError && retryCount >= maxRetries) {
    return (
      <div className={`flex items-center justify-center h-96 w-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-muted-foreground mb-2">3D Animation unavailable</p>
          <p className="text-sm text-muted-foreground mb-4">Network or loading issue</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            Try Again
          </button>
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
            <p className="text-muted-foreground text-sm">
              Loading 3D Animation...
              {retryCount > 0 && ` (${retryCount}/${maxRetries})`}
            </p>
          </div>
        </div>
      )}
      
      <Suspense fallback={
        <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
          <div className="text-center">
            <div className="animate-pulse rounded-full h-12 w-12 bg-primary/20 mx-auto mb-4"></div>
            <p className="text-muted-foreground text-sm">Loading...</p>
          </div>
        </div>
      }>
        <Spline
          scene={scene}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            width: '100%',
            height: '100%'
          }}
        />
      </Suspense>
    </div>
  );
};

export default RobustSpline;
