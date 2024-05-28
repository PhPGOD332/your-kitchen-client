const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const serviceRoutes = {
  loginUrl: `${NEXT_PUBLIC_API_URL}/api/login`,
  registrationUrl: `${NEXT_PUBLIC_API_URL}/api/registration`,
  refreshUrl: `${NEXT_PUBLIC_API_URL}/api/refresh`,
}

