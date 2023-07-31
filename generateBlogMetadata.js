const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

async function generateBlogMetadata() {
  const blogDirectory = path.join(__dirname, './blog');
  // Read all files in the blog directory
  const files = fs.readdirSync(blogDirectory);
  // Retrieve metadata for the 5 most recent blog posts
  const recentPosts = files
  // Filter out only subdirectories that follow the naming pattern YYYY-MM-DD-name
  .filter(file => fs.statSync(path.join(blogDirectory, file)).isDirectory())
  // Sort subdirectories in descending order based on date in the directory name
  .sort((a, b) => {
    const dateA = new Date(a.split('-').slice(0, 3).join('-'));
    const dateB = new Date(b.split('-').slice(0, 3).join('-'));
    return dateB.getTime() - dateA.getTime();
  })
  // Get metadata for each .md file within the sorted subdirectories
  .reduce((posts, subdirectory) => {
    const filePath = path.join(blogDirectory, subdirectory);
    const filesInSubdirectory = fs.readdirSync(filePath);
    const mdFile = filesInSubdirectory.find(file => file.endsWith('.md'));

    if (mdFile) {
      const fullFilePath = path.join(filePath, mdFile);
      const title = getTitleFromFrontMatter(fullFilePath);
      const date = getDateFromFileName(mdFile);
      const image = getImageFromFrontMatter(fullFilePath);
      const link = getLinkFromFrontMatter(fullFilePath);
      const description = getShortDescription(fullFilePath);
      const id = generateId();

      posts.push({ title, date, image, link, description, id });
    }

    return posts;
  }, [])
  // Get the first 5 most recent posts
  .slice(0, 5);
  // Write metadata to JSON file
  fs.writeFileSync('blog_metadata.json', JSON.stringify(recentPosts, null, 2));
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

function getLinkFromFrontMatter(file) {
  const { data: frontMatter } = matter(fs.readFileSync(file, 'utf8'));
  const slug = frontMatter.slug;
  return `https://panoptic.xyz/blog/${slug}`
}
function getShortDescription(file) {
  const content = fs.readFileSync(file, 'utf8');
  const withoutFrontMatter = content.replace(/---[\s\S]*?---/, '');
  const withoutImages = withoutFrontMatter.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const withoutIframes = withoutImages.replace(/<iframe[^>]*>[^<]*<\/iframe>/g, '');
  const withoutComments = withoutIframes.replace(/<!--[\s\S]*?-->/g, '');
  const withoutNewLines = withoutComments.replace(/^\s+|\n/g, '');
  const withSpacesAfterPeriods = withoutNewLines.replace(/\.(?! )/g, '. ');
  const words = withSpacesAfterPeriods.split(' ');
  const shortWords = words.slice(0, 43);
  return shortWords.join(' ');
}

generateBlogMetadata();
