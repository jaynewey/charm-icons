/* eslint-disable no-console */
import path from 'path';

import Icon from './icon';
import buildIconFile from './buildIconFile';
import { readFile, getPaths } from '../helpers';
import keywords from '../../keywords.json';

/**
 * Generates ES modules for every icon file in a directory.
 * @param {string} iconDir
 * @param {string} outputDir
 * @param {[string]} filenames
 * @param {function} template
 */
export default function buildIconFiles(iconDir, outputDir, filenames, template) {
  filenames.forEach((filename) => {
    const iconName = path.parse(filename).name;
    const paths = getPaths(readFile(iconDir, filename)).replace(/[\n\r]/g, '');
    const icon = new Icon(iconName, paths, keywords[iconName]);

    buildIconFile(icon, outputDir, template);

    console.log(`Successfully built ${icon.name}.`);
  });
}
