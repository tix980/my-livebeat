import { useEffect } from 'react';
import { useLocation } from 'wouter';

import { useAuth } from '@/hooks/use-auth';

import Container from '@/components/Container';

function Session() {
  const { verifySession } = useAuth();
  const [, navigate] = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId');
    const secret = params.get('secret');

    if ( typeof userId !== 'string' || typeof secret !== 'string' ) {
      navigate('/login');
      return;
    }

    (async function run() {
      await verifySession({ userId, secret });
      navigate('/');
    })();
  }, []);
  return (
    <Container className="h-screen flex items-center justify-center text-center">
      <p>Logging you in...</p>
    </Container>
  )
}

export default Session;