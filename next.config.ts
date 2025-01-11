import nextPWA from 'next-pwa';

const nextConfig = {};

const withPWA = nextPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === "development",
})(nextConfig);

export default withPWA;