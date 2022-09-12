// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Panoptic Docs',
  tagline: 'Documentation for the Panoptic Protocol',
  url: 'https://docs.panoptic.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'panoptic-labs', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Panoptic',
        logo: {
          alt: 'Panoptic Logo',
          src: 'img/logo.svg',
        },
        style: 'dark',
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: '/category/options-trading-101',
            position: 'left',
            label: 'Options trading 101',
          },
          {
            type: 'doc',
            docId: '/category/security',
            position: 'left',
            label: 'Security',
          },
          {
            type: 'doc',
            docId: '/category/faq',
            position: 'right',
            label: 'FAQ',
          },
          {
            href: 'https://github.com/panoptic-labs/docs',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://app.panoptic.xyz',
            label: 'App',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Protocol',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/#',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/panoptic_xyz',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/panoptic-labs/docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Axicon Labs, Inc.`,
      },
      prism: {
        additionalLanguages: ['solidity'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },      
    }),

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  
  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
    },
  ],

};

module.exports = config;
