import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setAuthToken } from '../api/axios';

export default function SyncAuthToken() {
  const token = useSelector((s: RootState) => s.auth.token);
  useEffect(() => {
    setAuthToken(token);
  }, [token]);
  return null;
}
