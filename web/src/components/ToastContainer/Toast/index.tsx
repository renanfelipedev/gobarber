import React, { useEffect, useCallback } from 'react';
import {
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { useToast, ToastMessage } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertTriangle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  const handleRemoveToast = useCallback(
    (id: string) => {
      removeToast(id);
    },
    [removeToast],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      hasDescription={!!message.description}
      type={message.type}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={(): void => handleRemoveToast(message.id)}>
        <FiXCircle size={16} />
      </button>
    </Container>
  );
};

export default Toast;
