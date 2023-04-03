import MarkdownProcessor from '@/helpers/MarkdownProcessor';
import { createContext } from 'react';

/** The context used to instantiate `MarkdownProcessor` and store it. */
export const context = createContext<MarkdownProcessor>(
  new MarkdownProcessor()
);
