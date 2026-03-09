/**
 * Mock Data for Mission History
 * 
 * This file contains all the mock data for the Mission History page.
 * You can easily modify the missions array to change the data displayed on the page.
 * 
 * Status Types:
 * - SUCCESS: Mission completed successfully (green badge)
 * - FAILED: Mission failed (red badge)
 * - IN_PROGRESS: Mission currently in progress (yellow badge, shows RUNNING button)
 * - RUNNING: Alternative for in-progress missions
 */

export const missions = [
  {
    id: '082',
    objective: 'Test Pricing Checkout Flow',
    description: 'Verify if the "Enterprise" plan triggers the modal on mobile emulation.',
    status: 'SUCCESS',
    executionDate: '2023-11-24 14:20',
    hasAction: false
  },
  {
    id: '081',
    objective: 'Validate Login Credentials Form',
    description: 'Check for validation errors on empty password fields in staging.',
    status: 'FAILED',
    executionDate: '2023-11-23 09:45',
    hasAction: false
  },
  {
    id: '089',
    objective: 'Cart Persistence Audit',
    description: 'Navigate to shop, add item, refresh, and confirm item remains in cart.',
    status: 'IN_PROGRESS',
    executionDate: '2023-11-23 18:12',
    hasAction: true
  },
  {
    id: '079',
    objective: 'Footer Link Connectivity',
    description: 'Click every link in the global footer and ensure status 200.',
    status: 'SUCCESS',
    executionDate: '2023-11-22 11:30',
    hasAction: false
  },
  {
    id: '078',
    objective: 'Search Component Stress Test',
    description: 'Input odd character string into search bar and verify UI stability.',
    status: 'SUCCESS',
    executionDate: '2023-11-21 16:55',
    hasAction: false
  }
];

/**
 * Get missions with pagination
 * @param {number} page - Current page number (1-indexed)
 * @param {number} perPage - Number of missions per page
 * @returns {Object} - Object containing missions for the page and total count
 */
export const getMissions = (page = 1, perPage = 10) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    missions: missions.slice(start, end),
    total: missions.length,
    page,
    perPage,
    totalPages: Math.ceil(missions.length / perPage)
  };
};

/**
 * Total missions count (for pagination display)
 */
export const TOTAL_MISSIONS = 82; // This is the total shown in the mockup

/**
 * Get status badge configuration
 * @param {string} status - Status type
 * @returns {Object} - Configuration object with label and color class
 */
export const getStatusConfig = (status) => {
  const configs = {
    SUCCESS: { label: 'SUCCESS', className: 'status-success' },
    FAILED: { label: 'FAILED', className: 'status-failed' },
    IN_PROGRESS: { label: 'IN PROGRESS', className: 'status-in-progress' },
    RUNNING: { label: 'RUNNING', className: 'status-in-progress' }
  };
  
  return configs[status] || configs.SUCCESS;
};
