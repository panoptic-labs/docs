const siteUrl = "https://panoptic.xyz";
const description =
  "Panoptic is a perpetual options protocol built on Uniswap that enables oracle-free options trading on any token";
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const founderId = `${siteUrl}/about#guillaume-lambert`;

const founderProfiles = [
  {
    label: "Medium",
    url: "https://lambert-guillaume.medium.com/",
    icon: "/img/icons/medium.svg",
  },
  { label: "X", url: "https://x.com/guil_lambert", icon: "/img/icons/x.svg" },
  {
    label: "LinkedIn",
    icon: "/img/icons/linkedin.svg",
    url: "https://www.linkedin.com/in/guillaume-lambert-686591a0",
  },
  {
    label: "arXiv",
    icon: "/img/icons/arxiv.svg",
    url: "https://arxiv.org/search/q-fin?searchtype=author&query=Lambert,+G",
  },
  {
    label: "GitHub",
    url: "https://github.com/guil-lambert",
    icon: "/img/icons/github.svg",
  },
];

const founder = {
  "@type": "Person",
  "@id": founderId,
  name: "Guillaume Lambert",
  jobTitle: "Founder",
  description: "Guillaume is the founder of Panoptic.",
  worksFor: { "@id": organizationId },
  image: `${siteUrl}/img/Guillaume.jpg`,
  url: `${siteUrl}/about`,
  sameAs: founderProfiles.map(({ url }) => url),
};

const organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: "Panoptic",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/img/logo.svg`,
  description,
  founder: { "@id": founderId },
  sameAs: [
    "https://x.com/panoptic_xyz",
    "https://github.com/panoptic-labs/",
    "https://discord.gg/8sX5Af2KXG",
    "https://defillama.com/protocol/panoptic-protocol",
    "https://www.linkedin.com/company/panoptic-xyz",
    "https://www.youtube.com/@Panopticxyz",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  name: "Panoptic",
  url: `${siteUrl}/`,
  description,
  publisher: { "@id": organizationId },
};

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organization, website],
};

function articleGraph(metadata, image, dateModified) {
  const url = new URL(metadata.permalink, siteUrl).href;
  const authors = metadata.authors.filter((author) => author.name);
  const hasFounder = authors.some((author) => author.key === "G");
  const article = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    ...(dateModified && { dateModified }),
    ...(image && { image: new URL(image, siteUrl).href }),
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    ...(authors.length > 0 && {
      author: authors.map((author) =>
        author.key === "G"
          ? { "@id": founderId }
          : {
              "@type": "Person",
              name: author.name,
              ...(author.url && { url: new URL(author.url, siteUrl).href }),
            },
      ),
    }),
  };
  return {
    "@context": "https://schema.org",
    "@graph": hasFounder ? [article, founder] : [article],
  };
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

module.exports = {
  description,
  founder,
  founderProfiles,
  siteGraph,
  articleGraph,
  serializeJsonLd,
};
