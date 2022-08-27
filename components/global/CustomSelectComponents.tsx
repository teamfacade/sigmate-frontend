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
}: ValueContainerProps<OptionType>) {
  return <components.ValueContainer {...props}>{children}</components.ValueContainer>
}

function IndicatorsContainer(props: IndicatorsContainerProps<OptionType>) {
  return <components.IndicatorsContainer {...props} />
}

function Placeholder(props: PlaceholderProps<OptionType>) {
  return <components.Placeholder {...props} />
}

function Option(props: OptionProps<OptionType>) {
  return <components.Option {...props} />
}

export { ValueContainer, IndicatorsContainer, Placeholder, Option };
