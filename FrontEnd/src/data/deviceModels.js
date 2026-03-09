/**
 * Device Models Data
 * 
 * Predefined device models for mobile and desktop simulation.
 * Each model includes name, width, height, and category.
 */

export const mobileDevices = [
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    width: 393,
    height: 852,
    category: 'mobile'
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    width: 430,
    height: 932,
    category: 'mobile'
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    width: 375,
    height: 667,
    category: 'mobile'
  },
  {
    id: 'samsung-galaxy-s23',
    name: 'Samsung Galaxy S23',
    width: 360,
    height: 780,
    category: 'mobile'
  },
  {
    id: 'samsung-galaxy-s23-ultra',
    name: 'Samsung Galaxy S23 Ultra',
    width: 412,
    height: 915,
    category: 'mobile'
  },
  {
    id: 'google-pixel-7',
    name: 'Google Pixel 7',
    width: 412,
    height: 915,
    category: 'mobile'
  },
  {
    id: 'google-pixel-7-pro',
    name: 'Google Pixel 7 Pro',
    width: 412,
    height: 892,
    category: 'mobile'
  },
  {
    id: 'ipad-mini',
    name: 'iPad Mini',
    width: 744,
    height: 1133,
    category: 'mobile'
  },
  {
    id: 'ipad-air',
    name: 'iPad Air',
    width: 820,
    height: 1180,
    category: 'mobile'
  },
  {
    id: 'ipad-pro-11',
    name: 'iPad Pro 11"',
    width: 834,
    height: 1194,
    category: 'mobile'
  }
];

export const desktopDevices = [
  {
    id: 'macbook-pro-16',
    name: 'MacBook Pro 16"',
    width: 1728,
    height: 1117,
    category: 'desktop'
  },
  {
    id: 'macbook-pro-14',
    name: 'MacBook Pro 14"',
    width: 1512,
    height: 982,
    category: 'desktop'
  },
  {
    id: 'macbook-air',
    name: 'MacBook Air',
    width: 1440,
    height: 900,
    category: 'desktop'
  },
  {
    id: 'imac-24',
    name: 'iMac 24"',
    width: 1920,
    height: 1080,
    category: 'desktop'
  },
  {
    id: 'imac-27',
    name: 'iMac 27"',
    width: 2560,
    height: 1440,
    category: 'desktop'
  },
  {
    id: 'full-hd',
    name: 'Full HD (1920x1080)',
    width: 1920,
    height: 1080,
    category: 'desktop'
  },
  {
    id: 'wqhd',
    name: 'WQHD (2560x1440)',
    width: 2560,
    height: 1440,
    category: 'desktop'
  },
  {
    id: '4k',
    name: '4K (3840x2160)',
    width: 3840,
    height: 2160,
    category: 'desktop'
  },
  {
    id: 'ultrawide',
    name: 'Ultrawide (3440x1440)',
    width: 3440,
    height: 1440,
    category: 'desktop'
  }
];

/**
 * Get device by ID
 * @param {string} deviceId - Device ID
 * @returns {Object|null} - Device object or null if not found
 */
export const getDeviceById = (deviceId) => {
  const allDevices = [...mobileDevices, ...desktopDevices];
  return allDevices.find(device => device.id === deviceId) || null;
};

/**
 * Get devices by category
 * @param {string} category - 'mobile' or 'desktop'
 * @returns {Array} - Array of device objects
 */
export const getDevicesByCategory = (category) => {
  return category === 'mobile' ? mobileDevices : desktopDevices;
};
