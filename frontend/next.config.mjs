import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../'),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'skilledboys.com',
      },
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
      },
    ],
  },
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://skilledboys.onrender.com'
        : 'http://127.0.0.1:5000');
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl.replace(/\/+$/, '')}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      // Legacy landing page redirects (fixes Google sitelink 'Skilled Workers Image')
      {
        source: '/landing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/landing.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/skilled-workers-image',
        destination: '/',
        permanent: true,
      },
      // Service Areas redirects (fixes Google sitelink 'Our Service Areas - Skilled Boys')
      {
        source: '/area',
        destination: '/areas',
        permanent: true,
      },
      {
        source: '/area.html',
        destination: '/areas',
        permanent: true,
      },
      {
        source: '/areas.html',
        destination: '/areas',
        permanent: true,
      },
      // Categories redirects
      {
        source: '/category',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/category.html',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/categories.html',
        destination: '/categories',
        permanent: true,
      },
      // Results / Search redirects
      {
        source: '/result',
        destination: '/find-workers',
        permanent: true,
      },
      {
        source: '/result.html',
        destination: '/find-workers',
        permanent: true,
      },
      {
        source: '/results.html',
        destination: '/find-workers',
        permanent: true,
      },
      // Legacy HTML file extensions to canonical routes
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/login.html',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/register.html',
        destination: '/register',
        permanent: true,
      },
      {
        source: '/worker-login.html',
        destination: '/worker-login',
        permanent: true,
      },
      {
        source: '/worker-register.html',
        destination: '/worker-register',
        permanent: true,
      },
      {
        source: '/worker-dashboard.html',
        destination: '/worker-dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
