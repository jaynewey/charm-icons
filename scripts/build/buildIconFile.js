import { writeToFile, toPascalCase } from '../helpers';

/**
 * Generates an ES module for the given Icon instance.
 * @param {Icon} icon Icon instance.
 * @param {string} outputDir The directory to place the ES module.
 * @param {function} template The ES module template.
 */
export default function buildIconFile(icon, outputDir, template) {
  const filename = toPascalCase(icon.name);

  writeToFile(outputDir, `${filename}.js`, template(filename, icon));
}
