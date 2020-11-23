const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const kebabCase = require('lodash/kebabCase');

const SRC_DIR = '../node_modules/rsuite-icon-font/lib';

/**
 * Dist directory
 * @type {string}
 */
const DIST_DIR = '../src/icons';
const ALIAS_DIR = '../';

const resolvePath = (...paths) => path.resolve(__dirname, ...paths);

module.exports = function() {
  const files = glob.sync(resolvePath(`${SRC_DIR}/**/*.js`));
  files.forEach(function generateComponent(svgPath, index) {
    const basename = path.basename(svgPath);
    const componentName = path.basename(basename, path.extname(basename));
    const categoryName = path.relative(path.resolve(__dirname, SRC_DIR), path.dirname(svgPath));
    const isLegacy = categoryName === 'legacy';
    const kebabCaseName = kebabCase(componentName);
    console.log(`(${index + 1}/${files.length}) Generating ${componentName}.tsx ...`);

    // Output Icons src
    fs.outputFileSync(
      resolvePath(DIST_DIR, isLegacy ? 'legacy' : '', `${componentName}.tsx`),
      `// Generated by script, don't edit it please.
import { createSvgIcon } from '${isLegacy ? '../' : ''}../IconBase';
import ${componentName}Svg from 'rsuite-icon-font/lib/${categoryName}/${componentName}';

export default createSvgIcon({
  as: ${componentName}Svg,
  ariaLabel: '${kebabCaseName}',
  category: '${categoryName}',
  displayName: '${componentName}'
});
`
    );

    // It only release when publish
    if (process.env.PUBLISH) {
      // Output Icons alias
      fs.outputFileSync(
        resolvePath(ALIAS_DIR, isLegacy ? 'legacy' : '', `${componentName}.js`),
        `"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _${componentName}["default"];
  }
});

var _${componentName} = _interopRequireDefault(require(".${isLegacy ? '.' : ''}/lib/icons${
          isLegacy ? '/legacy' : ''
        }/${componentName}"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
`
      );

      // Output Icons alias define
      fs.outputFileSync(
        resolvePath(ALIAS_DIR, isLegacy ? 'legacy' : '', `${componentName}.d.ts`),
        `/// <reference types="react" />
declare const _default: import("react").FC<import(".${
          isLegacy ? '.' : ''
        }/lib/IconBase").IconProps>;
export default _default;
`
      );
    }
  });
};
