import {
  ToolbarButton,
  ToolbarButtonProps,
  Tooltip,
} from '@fluentui/react-components';

export type ToolbarButtonWithTooltipProps = ToolbarButtonProps & {
  tooltip: string;
  id: string;
};

/** A simple component of a toolbar button with tooltip. */
function ToolbarButtonWithTooltip(props: ToolbarButtonWithTooltipProps) {
  return (
    <Tooltip relationship='label' content={props.tooltip}>
      <ToolbarButton {...props} />
    </Tooltip>
  );
}

export default ToolbarButtonWithTooltip;
