// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/palenight");
const darkCodeTheme = require("prism-react-renderer/themes/shadesOfPurple");

const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Panoptic",
  tagline: "The Panoptic Protocol",
  url: "http://panoptic.xyz/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "panoptic-labs", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Panoptic",
        logo: {
          alt: "Panoptic Logo",
          src: "img/logo.svg",
        },
        style: "dark",
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          {
            to: 'blog',
            label: 'Blog',
            position: 'left'
          },
          {
            to: 'research',
            label: 'Research',
            position: 'left'
          },
          {
            type: "doc",
            docId: "faq/faq",
            position: "right",
            label: "FAQ",
          },
          {
            href: "https://github.com/panoptic-labs/docs",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://app.panoptic.xyz",
            label: "App",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        logo: {
          alt: "Panoptic Logo",
          src: "https://raw.githubusercontent.com/panoptic-labs/docs/4825969722841d1ace89c3837ae05511b96d6426/static/img/logo.svg",
          width: 160,
          height: 160,
        },
        links: [
          {
            title: "Learn",
            items: [
              {
                label: "Intro",
                to: "/docs/intro",
              },
              {
                label: "Options Trading 101",
                to: "/docs/trading/basic-concepts",
              },
              {
                label: "Developers",
                to: "/docs/developers/smart-contracts-overview",
              },
              {
                label: "Glossary",
                to: "/docs/terms/American",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/panoptic_xyz",
              },
              {
                label: "Discord",
                href: "https://discord.gg/8sX5Af2KXG",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/panoptic-xyz",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/panoptic-labs/docs",
              },
              {
                label: "Research",
                href: "https://panoptic.xyz/research",
              },
              {
                label: "Blog",
                href: "https://panoptic.xyz/blog",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Axicon Labs Limited. All Rights Reserved. Panoptic™ is a trademark of Axicon Labs Inc. All other trademarks and registered trademarks are the sole property of their respective owners.<br><br>
        The content provided is for informational and educational purposes only and is not intended as, nor should it be construed as, financial, investment, or trading advice, or a recommendation to buy, sell, or hold any options. Options trading carries significant risks, including the potential for substantial losses, and may not be suitable for all investors. Before engaging in options trading, you should consult with a qualified financial advisor or other professional to evaluate your specific financial situation and objectives.`,
      },
      prism: {
        additionalLanguages: ["solidity"],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      metadata: [
        {
          property: "og:image",
          content:
            "https://raw.githubusercontent.com/panoptic-labs/docs/main/static/img/website-banner.png",
        },
        {
          name: "twitter:image",
          content:
            "https://raw.githubusercontent.com/panoptic-labs/docs/main/static/img/website-banner.png",
        },
      ],
      announcementBar: {
        id: "ETH_Denver_2023",
        content:
          "📢 Our trading competition on Avalanche is live. A <a href=\"https://panoptic.xyz/blog/panoptic-beta-launch-epoch-four">$1,000 prize pool</a> awaits! Also, the <a href=\"https://panoptic.xyz/blog/december-nutcracker\">December Nutcracker</a> competition is underway on Base, with mystery prizes in store. <a href=\"https://beta.panoptic.xyz\">Join now</a>!",
        textColor: "#FFFFFF",
        isCloseable: true,
      },
      image:
        "https://raw.githubusercontent.com/panoptic-labs/docs/main/static/img/website-banner.png",
      algolia: {
        appId: '8ICJTW297L',
        // Public API key: it is safe to commit it
        apiKey: '5274a086bb1beb9f844aa87f71435c7b',
        indexName: 'panoptic',
        contextualSearch: true,
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: '/docs/', // or as RegExp: /\/docs\//
        //   to: '/',
        // },
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
    }),

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          blogTitle: 'Panoptic Blog',
          blogDescription: 'All-Things DeFi Options',
          postsPerPage: 9,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: "ALL",
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 300}}),
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} 2023 Axicon Labs Limited. All Rights Reserved. Panoptic™ is a trademark of Axicon Labs Inc. All other trademarks and registered trademarks are the sole property of their respective owners.`,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: 'G-L8XETHMC9F',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "/katex/katex.min.css",
      type: "text/css",
    },
  ],

  plugins: [
    "@docusaurus-terminology/parser",

    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'research',
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: 'research',
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: 'research',
        blogTitle: 'Research',
        blogDescription: 'DeFi Options Research',
        postsPerPage: 9,
        blogSidebarTitle: 'All posts',
        blogSidebarCount: "ALL",
        showReadingTime: true,
        readingTime: ({content, frontMatter, defaultReadingTime}) =>
          defaultReadingTime({content, options: {wordsPerMinute: 300}}),
        feedOptions: {
          type: 'all',
          copyright: `Copyright © ${new Date().getFullYear()} 2023 Axicon Labs Limited. All Rights Reserved. Panoptic™ is a trademark of Axicon Labs Inc. All other trademarks and registered trademarks are the sole property of their respective owners.`,
          createFeedItems: async (params) => {
            const {blogPosts, defaultCreateFeedItems, ...rest} = params;
            return defaultCreateFeedItems({
              // keep only the 10 most recent blog posts in the feed
              blogPosts: blogPosts.filter((item, index) => index < 10),
              ...rest,
            });
          },
        },
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      },
    },
  ],
};

module.exports = config;
