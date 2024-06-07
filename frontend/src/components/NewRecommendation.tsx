import React, { useState } from 'react';

interface NewRecommendationProps {
  onSubmit: (rating: number) => void;
}

export const NewRecommendation: React.FC<NewRecommendationProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onSubmit(rating);
  };

  return (
    <div>
      <h3>Rate this movie</h3>
      <div>
        <input type="checkbox" id="terrible" value={1} onChange={() => handleRatingChange(1)} />
        <label htmlFor="terrible">Terrible</label>
      </div>
      <div>
        <input type="checkbox" id="bad" value={2} onChange={() => handleRatingChange(2)} />
        <label htmlFor="bad">Bad</label>
      </div>
      <div>
        <input type="checkbox" id="average" value={3} onChange={() => handleRatingChange(3)} />
        <label htmlFor="average">Average</label>
      </div>
      <div>
        <input type="checkbox" id="good" value={4} onChange={() => handleRatingChange(4)} />
        <label htmlFor="good">Good</label>
      </div>
      <div>
        <input type="checkbox" id="excellent" value={5} onChange={() => handleRatingChange(5)} />
        <label htmlFor="excellent">Excellent</label>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewRecommendation;
