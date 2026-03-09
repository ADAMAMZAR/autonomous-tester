import { useState, useEffect } from 'react';
import { getDevicesByCategory, getDeviceById } from '../data/deviceModels';

/**
 * DeviceSelector Component
 * 
 * Allows users to select device type (mobile/desktop), choose from predefined models,
 * or customize dimensions. Auto-clears model selection when custom dimensions are entered.
 * 
 * @param {Object} props
 * @param {string} props.deviceType - 'mobile' or 'desktop'
 * @param {Function} props.onDeviceTypeChange - Callback when device type changes
 * @param {string} props.selectedModel - Selected device model ID
 * @param {Function} props.onModelChange - Callback when model selection changes
 * @param {number} props.width - Current width value
 * @param {Function} props.onWidthChange - Callback when width changes
 * @param {number} props.height - Current height value
 * @param {Function} props.onHeightChange - Callback when height changes
 */
const DeviceSelector = ({
  deviceType,
  onDeviceTypeChange,
  selectedModel,
  onModelChange,
  width,
  onWidthChange,
  height,
  onHeightChange
}) => {
  const devices = getDevicesByCategory(deviceType);

  // Handle device model selection
  const handleModelSelect = (e) => {
    const modelId = e.target.value;
    onModelChange(modelId);

    if (modelId) {
      const device = getDeviceById(modelId);
      if (device) {
        onWidthChange(device.width);
        onHeightChange(device.height);
      }
    }
  };

  // Handle custom width change - auto-clear model selection
  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value) || 0;
    onWidthChange(newWidth);
    
    // Auto-clear model selection when user manually changes width
    if (selectedModel) {
      const device = getDeviceById(selectedModel);
      if (device && newWidth !== device.width) {
        onModelChange('');
      }
    }
  };

  // Handle custom height change - auto-clear model selection
  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value) || 0;
    onHeightChange(newHeight);
    
    // Auto-clear model selection when user manually changes height
    if (selectedModel) {
      const device = getDeviceById(selectedModel);
      if (device && newHeight !== device.height) {
        onModelChange('');
      }
    }
  };

  return (
    <div className="device-selector">
      <label className="form-label">AGENT DEVICE SIMULATION</label>
      
      {/* Device Type Toggle */}
      <div className="device-type-toggle">
        <button
          className={`toggle-btn ${deviceType === 'mobile' ? 'active' : ''}`}
          onClick={() => onDeviceTypeChange('mobile')}
        >
          📱 Mobile
        </button>
        <button
          className="toggle-btn coming-soon"
          disabled
          title="Desktop mode is coming soon"
        >
  🖥️ Desktop(coming soon)
</button>

      </div>

      {/* Device Model Dropdown */}
      <div className="form-group">
        <label className="form-label-small">Device Model</label>
        <select
          className="form-select"
          value={selectedModel}
          onChange={handleModelSelect}
        >
          <option value="">Select a {deviceType} device...</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name} ({device.width}x{device.height})
            </option>
          ))}
        </select>
      </div>

      {/* Custom Dimensions */}
      <div className="dimensions-group">
        <div className="form-group">
          <label className="form-label-small">Width (px)</label>
          <input
            type="number"
            className="form-input"
            value={width || ''}
            onChange={handleWidthChange}
            placeholder="Enter width"
            min="1"
          />
        </div>
        <div className="form-group">
          <label className="form-label-small">Height (px)</label>
          <input
            type="number"
            className="form-input"
            value={height || ''}
            onChange={handleHeightChange}
            placeholder="Enter height"
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceSelector;
