import React from 'react';
import '../../styles/LevelSelector.css';

const levels = [2, 3, 4, 5, 6, 7];

const LevelSelector = ({ selectedLevel, onSelectLevel }) => {
  return (
    <div className="level-selector-container">
      <label className="selector-label">Level</label>
      <div className="level-buttons">
        {levels.map((level) => (
          <button
            key={level}
            className={`level-button ${selectedLevel === level ? 'selected' : ''}`}
            onClick={() => onSelectLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;