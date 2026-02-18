import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const AdminRegister = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  return null;
};
