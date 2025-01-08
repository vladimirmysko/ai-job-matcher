/** @type {import("prettier").Options} */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  arrowParens: 'always',
  semi: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  tailwindFunctions: ['cn', 'clsx', 'tw', 'twMerge'],
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
