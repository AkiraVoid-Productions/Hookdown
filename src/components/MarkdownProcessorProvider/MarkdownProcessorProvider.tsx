import MarkdownProcessorContext from '@/contexts/MarkdownProcessor';
import MarkdownProcessor from '@/helpers/MarkdownProcessor';
import React from 'react';
import Blockquote from '../Blockquote';
import CodeBlock from '../CodeBlock';
import { Link, Text } from '@fluentui/react-components';

/**
 * This component provide an instance of `MarkdownProcessor`, which is
 * instantiated and stored in a global context. This make it can be accessible
 * at every part of the app, so that we can easily change its options inside
 * every children components, without a serializing-deserializing process or
 * instantiate it many times.
 */
export function Provider(props: React.PropsWithChildren) {
  const markdownProcessor = React.useMemo(() => {
    const processor = new MarkdownProcessor();
    processor.shouldUseGfm = true;
    processor.reactOptions = {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
          <Link {...props} inline />
        ),
        pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
          <CodeBlock {...props} />
        ),
        blockquote: (props: React.BlockquoteHTMLAttributes<HTMLElement>) => (
          <Blockquote {...props} />
        ),
        p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
          <Text {...props} as='p' block />
        ),
      },
    };
    return processor;
  }, []);

  return (
    <MarkdownProcessorContext.Provider value={markdownProcessor}>
      {props.children}
    </MarkdownProcessorContext.Provider>
  );
}
