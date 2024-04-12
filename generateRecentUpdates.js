const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

async function generateRecentUpdates() {
  const blogDirectory = path.join(__dirname, './blog');
  const researchDirectory = path.join(__dirname, './research');
  const blogFiles = fs.readdirSync(blogDirectory);
  const researchFiles = fs.readdirSync(researchDirectory);
  const recentPosts = [];

  const blogPosts = generatePosts(blogFiles, blogDirectory, 'blog')
  const researchPosts = generatePosts(researchFiles, researchDirectory, 'research')
  const combinedPosts = [...blogPosts, ...researchPosts];
  const sortedPosts = combinedPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  })
  const recentCombinedPosts = sortedPosts.slice(0, 5);

  recentCombinedPosts.map((post) => post.id = generateId())
  recentPosts.push(...recentCombinedPosts);

  fs.writeFileSync('recentUpdates.json', JSON.stringify(recentPosts, null, 2));
}

function generatePosts(files, directory, type) {
  return files
  // Filter out only .md files
  .filter(file => fs.statSync(path.join(directory, file)).isDirectory())
  // Sort files in descending order based on last modified date
  .sort((a, b) => {
    const dateA = fs.statSync(path.join(directory, a)).mtime;
    const dateB = fs.statSync(path.join(directory, b)).mtime;
    return dateB.getTime() - dateA.getTime();
  })

  .reduce((posts, subdirectory) => {
    const filePath = path.join(directory, subdirectory);
    const filesInSubdirectory = fs.readdirSync(filePath);
    const mdFile = filesInSubdirectory.find(file => file.endsWith('.md'));

    if (mdFile) {
      const fullFilePath = path.join(filePath, mdFile);
      const title = getTitleFromFrontMatter(fullFilePath);
      const date = getDateFromFileName(mdFile);
      const image = getImageFromFrontMatter(fullFilePath);
      const link = getLinkFromFrontMatter(fullFilePath, type);
      const description = getDescriptionFromFrontMatter(fullFilePath);

      posts.push({ title, date, image, link, description });
    }

    return posts;
  }, [])
  // Get the first 5 most recent posts
  .slice(0, 5);
}

function getTitleFromFrontMatter(file) {
  const { data: frontMatter } = matter(fs.readFileSync(file, 'utf8'));
  return frontMatter.title;
}

function getDateFromFileName(file) {
  const match = file.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (match) {
    return match[1];
  }
  return null;
}

function getImageFromFrontMatter(file) {
  const { data: frontMatter } = matter(fs.readFileSync(file, 'utf8'));
  return frontMatter.image;
}

let postId = 0;
function generateId() {
  return ++postId;
}

function getLinkFromFrontMatter(file, type) {
  const { data: frontMatter } = matter(fs.readFileSync(file, 'utf8'));
  const slug = frontMatter.slug;
  return `https://panoptic.xyz/${type}/${slug}`
}

function getDescriptionFromFrontMatter(file) {
  const { data: frontMatter } = matter(fs.readFileSync(file, 'utf8'));
  return frontMatter.description;
}

function getShortDescription(file) {
  const content = fs.readFileSync(file, 'utf8');
  const withoutFrontMatter = content.replace(/---[\s\S]*?---/, '');
  const withoutImages = withoutFrontMatter.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const withoutIframes = withoutImages.replace(/<iframe[^>]*>[^<]*<\/iframe>/g, '');
  const withoutComments = withoutIframes.replace(/<!--[\s\S]*?-->/g, '');
  const withoutNewLines = withoutComments.replace(/^\s+|\n/g, '');
  const withSpacesAfterPeriods = withoutNewLines.replace(/\.([A-Z]|$)/g, '. $1');
  const words = withSpacesAfterPeriods.split(' ');
  const shortWords = words.slice(0, 43);
  return shortWords.join(' ');
}

generateRecentUpdates();
