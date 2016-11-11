import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';

const name = `apiHelper`;

const plugins = [
  babel(),
  bundleSize()
];

const isProd = process.env.NODE_ENV === `production`;

if (isProd) plugins.push(uglify());

export default {
  entry: `src/index.js`,
  plugins,
  dest: `dist/${name}${isProd ? `.min` : ``}.js`,
  moduleName: name,
  format: `umd`
};
