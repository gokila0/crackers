import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuth') === 'true';
  });

  // Customer Auth State
  const [customerUser, setCustomerUser] = useState(() => {
    const saved = localStorage.getItem('customerUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('isAdminAuth', isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  useEffect(() => {
    if (customerUser) {
      localStorage.setItem('customerUser', JSON.stringify(customerUser));
    } else {
      localStorage.removeItem('customerUser');
    }
  }, [customerUser]);

  // Admin Login Handler
  const adminLogin = (usernameOrEmail, password) => {
    const inputUser = usernameOrEmail ? usernameOrEmail.toLowerCase().trim() : '';
    if ((inputUser === 'manicrackers' || inputUser === 'manicrackers@omaadhishivam.com') && password === 'mani88') {
      setIsAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid admin username or password.' };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  // Customer Auth Handlers
  const customerRegister = (name, email, phone, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('registeredCustomers') || '[]');
    if (existingUsers.some(u => u.email === email)) {
      return { success: false, message: 'Account with this email already exists!' };
    }
    const newUser = { id: Date.now().toString(), name, email, phone, password };
    existingUsers.push(newUser);
    localStorage.setItem('registeredCustomers', JSON.stringify(existingUsers));
    setCustomerUser({ id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone });
    return { success: true };
  };

  const customerLogin = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('registeredCustomers') || '[]');
    const user = existingUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCustomerUser({ id: user.id, name: user.name, email: user.email, phone: user.phone });
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const customerLogout = () => {
    setCustomerUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isAdminAuthenticated,
      adminLogin,
      adminLogout,
      customerUser,
      customerLogin,
      customerRegister,
      customerLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
