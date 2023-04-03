import React from 'react';

export type UseComponent<TProps, TStates> = (
  props: TProps,
  ref?: React.ForwardedRef<any>
) => TStates;
