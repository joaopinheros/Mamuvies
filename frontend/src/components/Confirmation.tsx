import React from 'react';

interface ConfirmationProps {
  imageUrl: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ imageUrl }) => {
  return (
    <div>
      <h3>Thank you for your rating!</h3>
      <img src={imageUrl} alt="Confirmation" />
    </div>
  );
};

export default Confirmation;
