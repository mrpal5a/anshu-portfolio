/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://anshu-builds.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/login'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/login'] },
    ],
  },
};
