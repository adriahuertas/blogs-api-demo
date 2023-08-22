import lodash from 'lodash';

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === maxLikes) || null;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authors = lodash.countBy(blogs, 'author');
  const author = Object.keys(authors).reduce((prev, current) =>
    authors[prev] > authors[current] ? prev : current
  );

  return { author, blogs: authors[author] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const authors = lodash.groupBy(blogs, 'author');
  // Get total like for each author
  Object.keys(authors).forEach((author) => {
    authors[author] = authors[author].reduce(
      (sum, blog) => sum + blog.likes,
      0
    );
  });
  // Get the author with more likes
  const author = Object.keys(authors).reduce((prev, current) =>
    authors[prev] > authors[current] ? prev : current
  );
  return { author, likes: authors[author] };
};

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
