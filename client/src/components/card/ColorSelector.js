import React, { useState } from 'react';
import '../../styles/ColorSelector.css';

const colorOptions = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Green', hex: '#008000' },
  { name: 'Black', hex: '#000000' },
  { name: 'Purple', hex: '#800080' },
  { name: 'White', hex: '#FFFFFF' }
];

const ColorSelector = ({ onChange }) => {
  const [selectedColors, setSelectedColors] = useState([]);

  const handleAddColor = (color) => {
    if (selectedColors.length < 3 && !selectedColors.includes(color)) {
      const newColors = [...selectedColors, color];
      setSelectedColors(newColors);
      onChange(newColors);
    }
  };

  const handleRemoveColor = (color) => {
    const newColors = selectedColors.filter(c => c !== color);
    setSelectedColors(newColors);
    onChange(newColors);
  };

  return (
    <div className="color-selector-container">
      <div className="color-swatches">
        <div className="color-swatch-label">Select Colors: </div>
        {colorOptions.map((color) => (
          <div
            key={color.name}
            className="color-swatch"
            style={{ backgroundColor: color.hex }}
            onClick={() => handleAddColor(color.name)}
          />
        ))}
      </div>
      <div className="selected-colors">
        {selectedColors.map((color, index) => {
          const colorHex = colorOptions.find(c => c.name === color).hex;
          return (
            <div
              key={color}
              className="selected-color"
              style={{
                backgroundColor: colorHex,
                width: `${100 / selectedColors.length}%`
              }}
              onClick={() => handleRemoveColor(color)}
            >
              {selectedColors.length > 1 && <button type="button">x</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;