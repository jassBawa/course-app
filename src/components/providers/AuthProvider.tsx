'use client';
import { cognitoAuthConfig } from '@/config/constants';
import { useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from 'react-oidc-context';

function AWSAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      <AuthCookieSync />

      {children}
    </AuthProvider>
  );
}

export default AWSAuthProvider;

const AuthCookieSync = () => {
  const auth = useAuth();
  const hasSynced = useRef(false); // <- prevents repeated calls

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.access_token && !hasSynced.current) {
      fetch('/api/set-auth-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: auth.user.access_token }),
      });

      hasSynced.current = true;
    }
  }, [auth.isAuthenticated, auth.user?.access_token]);

  return null;
};
