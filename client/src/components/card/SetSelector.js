import React from 'react';
import '../../styles/SetSelector.css';

const sets = ['BT1', 'BT2', 'BT3', 'BT4', 'BT5', 'BT6', 'BT7', 'BT8', 'BT9', 'BT10'];

const SetSelector = ({ selectedSet, onSelectSet }) => {
  return (
    <div className="set-selector-container">
      <label className="selector-label">Set</label>
      <div className="set-buttons">
        {sets.map((set) => (
          <button
            key={set}
            className={`set-button ${selectedSet === set ? 'selected' : ''}`}
            onClick={() => onSelectSet(set)}
          >
            {set}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SetSelector;