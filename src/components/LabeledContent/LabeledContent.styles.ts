import {
  SlotClassNames,
  makeStyles,
  mergeClasses,
} from '@fluentui/react-components';
import {
  LabeledContentSlots,
  LabeledContentStates,
} from './LabeledContent.types';

export const labeledContentClassNames: SlotClassNames<LabeledContentSlots> = {
  root: 'LabeledContent',
  label: 'LabeledContent-Label',
};

const useStyles = makeStyles<keyof LabeledContentSlots>({
  root: {},
  label: {},
});

export function useLabeledContentStyles(states: LabeledContentStates) {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    labeledContentClassNames.root,
    classNames.root,
    states.root.className
  );

  if (states.label) {
    states.label.className = mergeClasses(
      labeledContentClassNames.label,
      classNames.label,
      states.label.className
    );
  }

  return states;
}
