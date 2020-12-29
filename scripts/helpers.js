/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import format from 'prettier-eslint';

/**
 * Get a list of all svg files in a directory.
 * @param {string} dir
 */
export const readSvgDir = (dir) => fs.readdirSync(dir).filter((file) => path.extname(file) === '.svg');

/**
 * Reads a file into a string.
 * @param {string} dir
 * @param {string} filename
 */
export const readFile = (dir, filename) => fs.readFileSync(path.join(dir, filename), 'utf-8');

/**
 * Empties a file's contents.
 * @param {string} dir
 * @param {string} filename
 */
export const emptyFile = (dir, filename) => fs.writeFileSync(path.join(dir, filename), '', 'utf-8');

/**
 * Formats (using `prettier-eslint`) and writes content to a file.
 * @param {string} dir
 * @param {string} filename
 * @param {string} content The content to write.
 */
export const writeToFile = (dir, filename, content) => {
  const formattedContent = format({
    text: content,
    filePath: path.join(dir, filename),
  });

  fs.writeFileSync(path.join(dir, filename), formattedContent, 'utf-8');
};

/**
 * Gets the paths inside an SVG formatted string.
 * @param {string} string An SVG formatted string.
 */
export const getPaths = (string) => string.replace(/<\/?svg[^>]*>/g, '');

/**
 * Converts hyphenated string to CamelCase.
 * @example
 * // returns 'atSign'
 * toCamelCase('at-sign')
 * @param {string}
 * @returns {string}
 */
export const toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => (p2 ? p2.toUpperCase() : p1.toLowerCase()));

/**
 * Converts hyphenated string to PascalCase.
 * @example
 * // returns 'AtSign'
 * toPascalCase('at-sign')
 * @param {string}
 * @returns {string}
 */
export const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);

  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

/**
 * Converts a filename with extension to its ES6 Module name.
 * @example
 * // returns 'AtSign'
 * filenameToModule('at-sign.svg')
 * @param {string} name
 */
export const filenameToModule = (name) => toPascalCase(path.parse(name).name);
