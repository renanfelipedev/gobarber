import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const id = uuid();
    const { type, title, description } = message;

    const newToast = {
      id,
      type,
      title,
      description,
    };

    setMessages((state) => [...state, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used with an ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
