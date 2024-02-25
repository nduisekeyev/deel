import HighlightMatch from "../HighlightMatch";

type AutocompleteItemProps<T> = {
  item: T;
  inputValue: string;
};

const AutocompleteItem = <T extends { name: string }>(
  props: AutocompleteItemProps<T>
): JSX.Element => {
  const { item, inputValue } = props;

  return <HighlightMatch text={item.name} highlight={inputValue} />;
};

export default AutocompleteItem;
