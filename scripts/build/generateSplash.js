/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';

import DEFAULT_ATTRS from '../../src/defaultAttrs'
import { getPaths, readSvgDir, readFile } from '../helpers'

const SPLASH_FILENAME = 'splash.svg';
const COLOUR = "#50C878";

/**
 * Generates an svg preview of all the icons.
 */
export default function generateSplash(
  iconDir,
  outputDir,
  filenames,
  padding = 16,
  width = 16,
  colour = COLOUR
) {
  const icon_width = parseInt(DEFAULT_ATTRS.width, 10);
  const icon_height = parseInt(DEFAULT_ATTRS.height, 10);

  const svg_width = width * (icon_width + 2 * padding);
  const svg_height = ~~(filenames.length / width + 1) * (icon_height + 2 * padding);
  
  const attrs = {
      ...DEFAULT_ATTRS,
      ...{
        stroke: colour,
        width: svg_width,
        height: svg_height,
        viewBox: `0 0 ${svg_width} ${svg_height}`
      }
  };

  const attrString = Object.entries(attrs)
    .map(([attr, val]) => `${attr}="${val}"`)
    .join(' ');

  let splash = `<svg ${attrString}>`;

  filenames.forEach((filename, index) => {
    console.log(`Adding ${filename} to ${SPLASH_FILENAME}.`);

    const paths = getPaths(readFile(iconDir, filename)).replace(/[\n\r]/g, '');
    const x = (padding + index * (padding + 2 * icon_width)) % svg_width;
    const y = padding + ~~(index / width) * (padding + 2 * icon_height);

    splash += `<g transform="translate(${x} ${y})">${paths}</g>`;
  });

  splash += '</svg>';

  fs.writeFileSync(path.join(outputDir, SPLASH_FILENAME), splash);

  console.log(`Successfully built ${SPLASH_FILENAME}.`)
}

generateSplash(
    path.resolve(__dirname, '../../icons'),
    path.resolve(__dirname, '../../docs/img'),
    readSvgDir(path.resolve(__dirname, '../../icons'))
);
