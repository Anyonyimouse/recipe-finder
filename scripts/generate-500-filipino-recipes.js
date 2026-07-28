const { buildDataset } = require('./dataset/builder');

try {
  buildDataset();
} catch (error) {
  console.error('Failed to generate dataset:', error);
  process.exit(1);
}
