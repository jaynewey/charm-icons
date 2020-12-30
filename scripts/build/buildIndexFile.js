import { emptyFile, writeToFile, filenameToModule } from '../helpers';

export default function buildIndexFile(outputDir, filenames) {
  const indexFilename = 'index.js';

  emptyFile(outputDir, indexFilename);

  const content = filenames
    .map((filename) => {
      const iconName = filenameToModule(filename);
      return `export { default as ${iconName} } from './${iconName}';\n`;
    })
    .join('\n');

  writeToFile(outputDir, indexFilename, content);
}
