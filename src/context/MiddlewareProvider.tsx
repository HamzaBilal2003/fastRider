import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const MiddlewareProvider = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get('authToken'); // or useContext(AuthContext)

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default MiddlewareProvider;
