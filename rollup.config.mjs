import path from 'path';
import { fileURLToPath } from 'url';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgr from '@svgr/rollup';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Custom plugin: redirect src/icons/index.js (Webpack require.context) → src/lib/iconRegistry.js (static)
const dynamicIconsPath = path.resolve(__dirname, 'src', 'icons', 'index.js');
const staticRegistryPath = path.resolve(__dirname, 'src', 'lib', 'iconRegistry.js');

function aliasIconRegistry() {
  return {
    name: 'alias-icon-registry',
    resolveId(source, importer) {
      if (!importer) return null;
      // Resolve the import relative to the importer
      if (source.endsWith('/icons') || source.endsWith('/icons/index') || source.endsWith('/icons/index.js')) {
        const resolved = path.resolve(path.dirname(importer), source);
        // Normalize: if the resolved path points at src/icons or src/icons/index.js, redirect
        if (resolved === dynamicIconsPath || resolved === path.resolve(__dirname, 'src', 'icons')) {
          return staticRegistryPath;
        }
      }
      return null;
    },
  };
}

export default [
  {
    input: 'src/lib/index.js',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      aliasIconRegistry(),
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx'],
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx'],
        presets: ['@babel/preset-react'],
      }),
      commonjs(),
      svgr({
        svgo: false,
        exportType: 'default',
      }),
      postcss({
        extract: 'styles.css',
        minimize: true,
        sourceMap: true,
      }),
      terser(),
    ],
    external: [
      'react',
      'react-dom',
      /^prism-react-editor(\/.*)?$/,
    ],
  },
];
