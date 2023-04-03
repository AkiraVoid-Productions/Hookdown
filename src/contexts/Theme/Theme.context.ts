import * as React from 'react';
import { ContextType } from './Theme.types';
import { defaultContext } from './Theme.values';

/** The context used to provide theme changing ability to the entire site. */
export const context = React.createContext<ContextType>(defaultContext);
