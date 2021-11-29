/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';

import moduleTemplate from './moduleTemplate';
import buildIconFiles from './buildIconFiles';
import buildIndexFile from './buildIndexFile';
import { readSvgDir } from '../helpers';
import buildTypesFile from './buildTypesFile';

const ICON_DIR = path.resolve(__dirname, '../../icons');
const OUTPUT_DIR = path.resolve(__dirname, '../../build/icons');

const svgFiles = readSvgDir(ICON_DIR);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

buildIconFiles(ICON_DIR, OUTPUT_DIR, svgFiles, moduleTemplate);
buildIndexFile(OUTPUT_DIR, svgFiles);
console.log('Successfully built export file.')
buildTypesFile(path.resolve(`${OUTPUT_DIR}/..`), svgFiles);
console.log('Successfully built types file.')
