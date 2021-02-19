import { Button } from '@/src/ui';
import React from 'react';

export const LogoutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div>
      Logout
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};
