import { PluggableList, unified } from 'unified';
import INotifyPropertyChanged from '@/types/INotifyPropertyChanged';
import NoDomEvent from './NoDomEvent';
import PropertyChangedEventArgs from '@/types/PropertyChangedEventArgs';
import React from 'react';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKaTex from 'rehype-katex';
import rehypeReact, { Options } from 'rehype-react';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkMath from 'remark-math';
import UnionToIntersection from '@/types/UnionToIntersection';
import rehypeHighlight, { Options as HighlightOptions } from 'rehype-highlight';
import hljs from 'highlight.js';
import getAllLanguageClassNames from '@/utilities/highlightingLanguages';
import { visit } from 'unist-util-visit';

/**
 * A helper class used to process Markdown texts to React elements.
 *
 * @class MarkdownProcessor
 * @implements {INotifyPropertyChanged<MarkdownProcessor>}
 */
class MarkdownProcessor implements INotifyPropertyChanged<MarkdownProcessor> {
  propertyChanged: NoDomEvent<PropertyChangedEventArgs, MarkdownProcessor> =
    new NoDomEvent();
  private _processorOptions: {
    remarkPlugins: PluggableList;
    rehypePlugins: PluggableList;
  } = {
    rehypePlugins: [],
    remarkPlugins: [],
  };
  /**
   * The processor should not process any thing while this field is set to
   * `false`.
   *
   * @private
   * @memberof MarkdownProcessor
   */
  private _isFrozen = false;

  private _reactOptions: Options = { createElement: React.createElement };
  /**
   * Get or set the options used to process Markdown texts to react.
   *
   * @memberof MarkdownProcessor
   */
  public get reactOptions() {
    return this._reactOptions;
  }
  /**
   * Get or set the options used to process Markdown texts to react.
   *
   * @memberof MarkdownProcessor
   */
  public set reactOptions(value: Options) {
    this._setField('_reactOptions', value, 'reactOptions');
  }

  private _highlightOptions: HighlightOptions = {
    ignoreMissing: true,
    detect: true,
  };
  /**
   * Get or set the options while highlighting the code inside Markdown texts.
   *
   * @memberof MarkdownProcessor
   */
  public get highlightOptions() {
    return this._highlightOptions;
  }
  /**
   * Get or set the options while highlighting the code inside Markdown texts.
   *
   * @memberof MarkdownProcessor
   */
  public set highlightOptions(value: HighlightOptions) {
    this._setField('_highlightOptions', value, 'highlightOptions');
  }

  private _shouldUseGfm: boolean = true;
  /**
   * Get or set a value that indicates if the processor should use
   * GitHub-Flavored-Markdown to process texts.
   *
   * @memberof MarkdownProcessor
   */
  public get shouldUseGfm() {
    return this._shouldUseGfm;
  }
  /**
   * Get or set a value that indicates if the processor should use
   * GitHub-Flavored-Markdown to process texts.
   *
   * @memberof MarkdownProcessor
   */
  public set shouldUseGfm(value: boolean) {
    this._setField('_shouldUseGfm', value, 'shouldUseGfm');
  }

  private _shouldUseKaTeX: boolean = true;
  /**
   * Get or set a value that indicates if the processor should use KaTeX grammar
   * to process math formulas.
   *
   * @memberof MarkdownProcessor
   */
  public get shouldUseKaTeX() {
    return this._shouldUseKaTeX;
  }
  /**
   * Get or set a value that indicates if the processor should use KaTeX grammar
   * to process math formulas.
   *
   * @memberof MarkdownProcessor
   */
  public set shouldUseKaTeX(value: boolean) {
    this._setField('_shouldUseKaTeX', value, 'shouldUseKaTeX');
  }

  private _shouldUseHeaderSlug: boolean = true;
  /**
   * Get or set a value that indicates if the processor should generates an id
   * for each header.
   *
   * @memberof MarkdownProcessor
   */
  public get shouldUseHeaderSlug() {
    return this._shouldUseHeaderSlug;
  }
  /**
   * Get or set a value that indicates if the processor should generates an id
   * for each header.
   *
   * @memberof MarkdownProcessor
   */
  public set shouldUseHeaderSlug(value: boolean) {
    this._setField('_shouldUseHeaderSlug', value, 'shouldUseHeaderSlug');
  }

  private _shouldUseExternalLink: boolean = true;
  /**
   * Get or set a value that indicates if the processor should adds `noreferrer`
   * and `nofollow` to links that will navigate to outside of site.
   *
   * @memberof MarkdownProcessor
   */
  public get shouldUseExternalLink() {
    return this._shouldUseExternalLink;
  }
  /**
   * Get or set a value that indicates if the processor should adds `noreferrer`
   * and `nofollow` to links that will navigate to outside of site.
   *
   * @memberof MarkdownProcessor
   */
  public set shouldUseExternalLink(value: boolean) {
    this._setField('_shouldUseExternalLink', value, 'shouldUseExternalLink');
  }

  private _shouldHighlightCode: boolean = true;
  /**
   * Get or set a value that indicates if the processor should highlights the
   * code.
   *
   * @memberof MarkdownProcessor
   */
  public get shouldHighlightCode() {
    return this._shouldHighlightCode;
  }
  /**
   * Get or set a value that indicates if the processor should highlights the
   * code.
   *
   * @memberof MarkdownProcessor
   */
  public set shouldHighlightCode(value: boolean) {
    this._setField('_shouldHighlightCode', value, 'shouldHighlightCode');
  }

  /**
   * Called while properties have been changed.
   *
   * @private
   * @memberof MarkdownProcessor
   * @param {keyof Omit<
   *   MarkdownProcessor,
   *   'propertyChanged' | 'process' | 'processAsync'
   * >} propertyName
   *   The name of changed property.
   * @param {any} oldValue The previous value of changed property.
   * @param {any} newValue The current value of changed property.
   */
  private _onPropertyChanged(
    propertyName: keyof Omit<
      MarkdownProcessor,
      'propertyChanged' | 'process' | 'processAsync'
    >,
    oldValue: any,
    newValue: any
  ) {
    this.propertyChanged.invoke(this, { newValue, oldValue, propertyName });
  }

  /**
   * Set a field to given value.
   *
   * It will automatically compare if given value is equal to current value, and
   * if not, it will sets the field to given value and triggers
   * `this._onPropertyChanged`.
   *
   * @private
   * @memberof MarkdownProcessor
   * @param {`_${keyof Omit<
   *   MarkdownProcessor,
   *   'propertyChanged' | 'process' | 'processAsync'
   * >}`} field
   *   The field that need to be set.
   * @param {MarkdownProcessor[typeof field]} newValue The value need to be set
   *   to.
   * @param {keyof Omit<
   *   MarkdownProcessor,
   *   'propertyChanged' | 'process' | 'processAsync'
   * >} propertyName
   *   The name of property related to this field.
   */
  private _setField(
    field: `_${keyof Omit<
      MarkdownProcessor,
      'propertyChanged' | 'process' | 'processAsync'
    >}`,
    newValue: MarkdownProcessor[typeof field],
    propertyName: keyof Omit<
      MarkdownProcessor,
      'propertyChanged' | 'process' | 'processAsync'
    >
  ) {
    if (this[field] !== newValue) {
      let oldValue = this[field];
      this[field] = newValue as UnionToIntersection<typeof newValue>;
      this._onPropertyChanged(propertyName, oldValue, newValue);
    }
  }

  /** A rehype plugin that adds language property to CodeBlock. */
  private _rehypeHighlightOptimize = () => (tree: any) => {
    visit(tree, 'element', node => {
      if (node.tagName === 'pre') {
        if (node.children[0].tagName === 'code') {
          const codeNode = node.children[0];
          node.children = codeNode.children;
          if (codeNode.properties.className?.includes('hljs')) {
            const language = (codeNode.properties.className as string[])
              .find(value => value.startsWith('language-'))
              ?.split('-')[1];
            if (language) {
              const languageName = hljs.getLanguage(language)?.name;
              node.properties.language =
                (languageName === 'Javascript' ? 'JavaScript' : languageName) ??
                language;
            } else {
              // Set to text.
              node.properties.language = 'Text';
            }
          } else {
            // Hide language tag.
            node.properties.languageTag = null;
            node.properties.showCopyButton = false;
          }
        }
      }
    });
  };

  /**
   * Get the processor used to process Markdown texts.
   *
   * @private
   * @returns Processor used to process Markdown texts.
   */
  private _getProcessor() {
    this._processorOptions = {
      remarkPlugins: [],
      rehypePlugins: [],
    };
    if (this.shouldUseGfm) this._processorOptions.remarkPlugins.push(remarkGfm);
    if (this.shouldUseExternalLink)
      this._processorOptions.rehypePlugins.push(rehypeExternalLinks);
    if (this.shouldUseHeaderSlug)
      this._processorOptions.rehypePlugins.push(rehypeSlug);
    if (this.shouldUseKaTeX) {
      this._processorOptions.remarkPlugins.push(remarkMath);
      this._processorOptions.rehypePlugins.push(rehypeKaTex);
    }
    if (this._shouldHighlightCode) {
      this._processorOptions.rehypePlugins.push([
        rehypeHighlight,
        this.highlightOptions,
      ]);
      this._processorOptions.rehypePlugins.push(this._rehypeHighlightOptimize);
    }

    return unified()
      .use(remarkParse)
      .use([...this._processorOptions.remarkPlugins])
      .use(remarkRehype)
      .use(rehypeSanitize, {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          code: [
            ...(defaultSchema.attributes?.code || []),
            ['className', ...getAllLanguageClassNames()],
          ],
          div: [
            ...(defaultSchema.attributes?.div || []),
            ['className', 'math', 'math-display'],
          ],
          span: [
            ...(defaultSchema.attributes?.span || []),
            ['className', 'math', 'math-inline'],
          ],
        },
      })
      .use([...this._processorOptions.rehypePlugins])
      .use(rehypeReact, this._reactOptions);
  }

  /**
   * Process Markdown texts to React elements.
   *
   * @param text The Markdown texts that need to be processed.
   * @returns The processed React elements.
   */
  public process(text: string) {
    if (!this._isFrozen) {
      this._isFrozen = true;

      const result = this._getProcessor().processSync(text)
        .result as React.ReactNode;
      this._isFrozen = false;
      return result;
    }
  }

  /**
   * Process Markdown texts to React elements asynchronously.
   *
   * @param text The Markdown texts that need to be processed.
   * @returns A promise that will resolves to the processed React elements.
   */
  public async processAsync(text: string) {
    return new Promise<React.ReactNode>((resolve, reject) => {
      if (this._isFrozen) {
        reject('frozen');
      } else {
        this._isFrozen = true;
        this._getProcessor().process(text, (error, file) => {
          if (!file) {
            reject(error);
          } else {
            resolve(file.result);
          }
          this._isFrozen = false;
        });
      }
    });
  }
}

export default MarkdownProcessor;
