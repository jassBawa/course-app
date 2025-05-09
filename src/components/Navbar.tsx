'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from 'react-oidc-context';
import { LoaderCircle } from 'lucide-react';
import { ModeToggle } from './ui/dark-toggle';
import { useEffect } from 'react';

export default function Navbar() {
  const auth = useAuth();

  // Handle auth state changes and ensure consistent behavior
  useEffect(() => {
    // Check for authentication errors
    if (auth.error) {
      console.error('Auth error:', auth.error);
    }

    // This helps with sign-in callbacks
    if (auth.isAuthenticated && window.location.hash.includes('id_token')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [auth.isAuthenticated, auth.error]);

  const handleSignIn = () => {
    auth.signinRedirect().catch((error) => {
      console.error('Sign-in error:', error);
    });
  };

  const handleSignOut = () => {
    // First use the OIDC context to sign out
    auth.removeUser();

    // Then redirect to Cognito's logout endpoint
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const logoutUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI;
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;

    if (clientId && logoutUri && cognitoDomain) {
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
        logoutUri
      )}`;
    } else {
      console.error('Missing Cognito environment variables for logout');
    }
  };

  return (
    <nav className="w-full transition-colors bg-white border-b shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900 transition-opacity dark:text-white hover:opacity-90"
          >
            VideoStream
          </Link>

          <div className="flex items-center space-x-4">
            {auth.isLoading ? (
              <LoaderCircle className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : auth.isAuthenticated ? (
              <>
                <Link href="/admin">
                  <Button
                    variant="default"
                    className="text-sm text-white transition-colors bg-indigo-700 hover:bg-indigo-500"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-sm"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button onClick={handleSignIn} className="text-sm">
                Sign in
              </Button>
            )}

            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
