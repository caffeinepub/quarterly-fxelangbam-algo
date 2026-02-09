import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Shield, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, loginStatus } = useInternetIdentity();
  const { isAuthenticated, isAdmin, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate({ to: '/admin/dashboard' });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const isProcessing = loginStatus === 'logging-in' || isLoading;

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Sign in with Internet Identity to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleLogin}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {isAuthenticated && !isAdmin && !isLoading && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive text-center">
                Your account does not have admin privileges.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
