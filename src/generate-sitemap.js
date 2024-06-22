const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, mkdirSync } = require('fs');
const { Readable } = require('stream');
const fetch = require('node-fetch');
const path = require('path');

const SITEMAP_DIR = './public';
const MAX_URLS = 10000; // Adjust this limit as necessary

// Ensure sitemap directory exists
mkdirSync(SITEMAP_DIR, { recursive: true });

const fetchJobSlugs = async () => {
  const query = `
    query GetJobs($limit: Int, $offset: Int) {
      jobs(limit: $limit, offset: $offset) {
        slug
      }
    }
  `;
  let jobSlugs = [];
  let offset = 0;
  const limit = 1000; // Fetch 1000 job slugs at a time

try {
  while (true) {
    const response = await fetch('http://127.0.0.1:4000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { filter: {
        title: '',
        category: '',
        jobType: '',
        jobLocation: '',
        isRemote: false,
        status: ''
      }, limit: 10, offset: 0 } }),
    });

    console.log("response", response)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const jobs = result.data.jobs;

    if (jobs.length === 0) break;

    jobSlugs = jobSlugs.concat(jobs.map(job => job.slug));
    offset += limit;

    if (jobSlugs.length >= MAX_URLS) break;
  }

  return jobSlugs.slice(0, MAX_URLS);
} catch (error) {
  console.error('Error fetching job slugs:', error.message);
  return [];
}
};

const generateSitemap = async () => {
  const jobSlugs = await fetchJobSlugs();

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/employers', changefreq: 'monthly', priority: 0.8 },
    { url: '/register', changefreq: 'monthly', priority: 0.8 },
    { url: '/sign-up', changefreq: 'monthly', priority: 0.8 },
    { url: '/sign-in', changefreq: 'monthly', priority: 0.8 },
    { url: '/forgot-password', changefreq: 'monthly', priority: 0.8 },
    { url: '/job-list', changefreq: 'daily', priority: 0.9 },
    ...jobSlugs.map(slug => ({ url: `/jobs/${slug}`, changefreq: 'daily', priority: 0.9 })),
  ];

  const sitemap = new SitemapStream({ hostname: 'https://punesi.com' });

  streamToPromise(Readable.from(links).pipe(sitemap)).then((data) =>
    createWriteStream(path.join(SITEMAP_DIR, 'sitemap.xml')).write(data)
  );
};

generateSitemap();
