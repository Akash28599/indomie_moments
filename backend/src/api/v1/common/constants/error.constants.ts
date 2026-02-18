export const ERROR_MESSAGES = {
  // Auth
  USERNAME_PASSWORD_REQUIRED: 'Username and password are required.',
  INVALID_CREDENTIALS: 'Invalid username or password.',
  ACCOUNT_INACTIVE: 'Your account is inactive.',
  ACCESS_DENIED_NO_TOKEN: 'Access denied. No token provided.',
  INVALID_TOKEN: 'Invalid token.',
  INVALID_INACTIVE_ADMIN: 'Invalid or inactive admin account.',
  INSUFFICIENT_PERMISSIONS: 'Access denied. Insufficient permissions.',
  // OTP Auth
  PHONE_NUMBER_REQUIRED: 'Phone number is required.',
  FULL_NAME_REQUIRED: 'Full name is required for registration.',
  USER_NOT_FOUND_REGISTER_FIRST: 'This number is not registered. Please register first.',
  OTP_CODE_REQUIRED: 'OTP code is required.',
  INVALID_PHONE_NUMBER: 'Invalid phone number format.',
  INVALID_OTP: 'Invalid or expired OTP code.',
  OTP_EXPIRED: 'OTP code has expired. Please request a new one.',
  OTP_ATTEMPTS_EXCEEDED: 'Too many failed attempts. Please request a new OTP.',

  // Generic
  UNAUTHORIZED: 'Unauthorized',
  ROUTE_NOT_FOUND: 'Route not found',
  INTERNAL_ERROR: 'Internal server error',

  // Resources
  CAMPAIGN_NOT_FOUND: 'Campaign not found',
  FAILED_DASHBOARD_STATS: 'Failed to get dashboard stats',
  FAILED_CREATE_CAMPAIGN: 'Failed to create campaign',
  FAILED_FETCH_CAMPAIGNS: 'Failed to fetch campaigns',
  FAILED_FETCH_CAMPAIGN: 'Failed to fetch campaign',
  FAILED_UPDATE_CAMPAIGN: 'Failed to update campaign',
  FAILED_DELETE_CAMPAIGN: 'Failed to delete campaign',
  FAILED_GET_USERS: 'Failed to get users',
  FAILED_EXPORT_USERS: 'Failed to export users',
} as const;
