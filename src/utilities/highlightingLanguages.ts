import hljs from 'highlight.js';

/**
 * The default languages that can be highlighted by lowlight.
 *
 * @type {string[]}
 * @exports
 * @see https://github.com/wooorm/lowlight/blob/main/lib/common.js
 */
export const defaultHighlightingLanguages = [
  'arduino',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'go',
  'graphql',
  'http',
  'ini',
  'java',
  'javascript',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'phpTemplate',
  'plaintext',
  'python',
  'pythonRepl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
];

function getLanguageClassNames(language: string) {
  var languageObject = hljs.getLanguage(language);
  if (languageObject) {
    return languageObject.aliases
      ? languageObject.aliases
          .map(alias => `language-${alias.toLowerCase()}`)
          .concat([`language-${languageObject.name?.toLowerCase()}`])
      : [`language-${languageObject.name?.toLowerCase()}`];
  }
}

/**
 * Get languages' CSS class names.
 *
 * @param {string[]} [additionalLanguages] Additional languages, usually
 *   user=specified languages.
 * @returns {string[]} CSS class names of default languages and additional
 *   languages.
 */
function getAllLanguageClassNames(additionalLanguages?: string[]) {
  let classNames: string[] = [];
  defaultHighlightingLanguages
    .concat(additionalLanguages || [])
    .forEach(
      lang =>
        (classNames = classNames.concat(getLanguageClassNames(lang) || []))
    );
  return Array.from(new Set(classNames.filter(name => name !== undefined)));
}

export default getAllLanguageClassNames;
