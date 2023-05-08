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
                label: "Telegram",
                href: "https://t.me/panoptic",
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
                href: "https://research.panoptic.xyz/",
              },
              {
                label: "Blog",
                href: "https://blog.panoptic.xyz",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Axicon Labs Inc.<br><br>
        The content provided is for informational and educational purposes only and is not intended as, nor should it be construed as, financial, investment, or trading advice, or a recommendation to buy, sell, or hold any options. Options trading carries significant risks, including the potential for substantial losses, and may not be suitable for all investors. Before engaging in options trading, you should consult with a qualified financial advisor or other professional to evaluate your specific financial situation and objectives.`,
      },
      prism: {
        additionalLanguages: ["solidity"],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
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
            "https://raw.githubusercontent.com/panoptic-labs/docs/main/static/img/logo.png",
        },
        {
          name: "twitter:image",
          content:
            "https://raw.githubusercontent.com/panoptic-labs/docs/main/static/img/logo.png",
        },
      ],
      announcementBar: {
        id: "ETH_Denver_2023",
        content:
          "Don't miss our first-ever live product demo at ETH Denver 2023! Watch our COO's <a href=\"https://docs.panoptic.xyz/docs/faq/ask-the-founder#eth-denver-2023---the-panoptic-protocol-a-new-defi-options-paradigm\">presentation</a> 👈🏾",
        textColor: "#FFFFFF",
        isCloseable: true,
      },
      image:
        "https://raw.githubusercontent.com/panoptic-labs/docs/main/static/img/logo.png",
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
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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

  plugins: ["@docusaurus-terminology/parser"],
};

module.exports = config;
