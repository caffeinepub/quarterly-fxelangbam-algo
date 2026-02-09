import { useState, ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSiteGate } from './useSiteGate';
import GateScreen from './GateScreen';

interface SiteWideGateProps {
  children: ReactNode;
}

export default function SiteWideGate({ children }: SiteWideGateProps) {
  const { isUnlocked, isLoading } = useSiteGate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { attemptUnlock } = useSiteGate();

  const handleSubmit = (username: string, password: string) => {
    setIsSubmitting(true);
    setError(null);

    // Small delay to show loading state
    setTimeout(() => {
      const success = attemptUnlock(username, password);
      
      if (success) {
        // Navigate to home page on success
        navigate({ to: '/' });
      } else {
        setError('Invalid username or password. Please try again.');
      }
      
      setIsSubmitting(false);
    }, 300);
  };

  // Show loading state while checking sessionStorage
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show gate screen if not unlocked
  if (!isUnlocked) {
    return (
      <GateScreen
        onSubmit={handleSubmit}
        error={error}
        isSubmitting={isSubmitting}
      />
    );
  }

  // Render children if unlocked
  return <>{children}</>;
}
