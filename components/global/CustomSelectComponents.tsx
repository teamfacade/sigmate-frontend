import {
  components,
  IndicatorsContainerProps,
  OptionProps,
  PlaceholderProps,
  ValueContainerProps,
} from 'react-select';

function ValueContainer({
  children,
  ...props
}: ValueContainerProps<ReactSelect.OptionType>) {
  return (
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  );
}

function IndicatorsContainer(
  props: IndicatorsContainerProps<ReactSelect.OptionType>
) {
  return <components.IndicatorsContainer {...props} />;
}

function Placeholder(props: PlaceholderProps<ReactSelect.OptionType>) {
  return <components.Placeholder {...props} />;
}

function Option(props: OptionProps<ReactSelect.OptionType>) {
  return <components.Option {...props} />;
}

export { ValueContainer, IndicatorsContainer, Placeholder, Option };
