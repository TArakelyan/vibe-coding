import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// eslint-disable-next-line no-eval
const preview = eval(fs.readFileSync(path.join(projectRoot, 'data/preview.js'), 'utf8').replace('const WIKI_PREVIEW = ', ''));

const articlesMap = new Map();

preview.forEach((cat) => {
  cat.articles.forEach((article) => {
    if (!articlesMap.has(article.id)) {
      articlesMap.set(article.id, {
        ...article,
        categories: [cat.slug],
        audienceTags: []
      });
    } else {
      const existing = articlesMap.get(article.id);
      if (!existing.categories.includes(cat.slug)) {
        existing.categories.push(cat.slug);
      }
    }
  });
});

// Аудиторные теги для «Ключевых терминов» (по данным sports.ru)
const audienceByArticle = {
  '3259658': ['beginner'],
  '3259642': ['beginner'],
  '3259631': ['beginner'],
  '3259620': ['beginner'],
  '3259610': ['beginner', 'amateur'],
  '3259600': ['beginner'],
  '3259598': ['beginner', 'amateur', 'advanced'],
  '3128168': ['beginner', 'amateur'],
  '3259588': ['beginner'],
  '3259578': ['beginner'],
  '3259568': ['beginner'],
  '3259558': ['beginner'],
  '3259548': ['beginner'],
  '3259538': ['beginner'],
  '3259528': ['beginner'],
  '3259518': ['beginner'],
  '3259508': ['beginner'],
  '3259498': ['beginner'],
  '3259488': ['beginner'],
  '3259478': ['beginner'],
  '3259468': ['beginner'],
  '3259458': ['beginner'],
  '3259448': ['beginner'],
  '3259438': ['beginner'],
  '3259428': ['beginner'],
  '3259418': ['beginner'],
  '3182727': ['advanced', 'pro'],
  '3259792': ['advanced', 'pro'],
  '3259782': ['advanced'],
  '3259772': ['advanced'],
  '3259762': ['advanced'],
  '3259752': ['advanced'],
  '3259742': ['advanced'],
  '3259732': ['advanced'],
  '3259722': ['advanced'],
  '3259712': ['advanced'],
  '3259702': ['advanced'],
  '3259692': ['advanced'],
  '3259682': ['advanced'],
  '3259672': ['advanced'],
  '3259662': ['advanced']
};

articlesMap.forEach((article, id) => {
  if (article.categories.includes('klyuchevye-terminy')) {
    article.audienceTags = audienceByArticle[id] || ['beginner'];
  }
});

const articles = [...articlesMap.values()];

fs.writeFileSync(
  path.join(projectRoot, 'data/articles.js'),
  `const WIKI_ARTICLES = ${JSON.stringify(articles, null, 2)};\n`
);

console.log('articles:', articles.length);
