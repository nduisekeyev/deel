import React, { useState } from "react";

type AutocompleteListProps<T> = {
  options: T[];
  renderItem: (item: T) => React.ReactNode;
  onHover?: (item: T) => void;
  onClick?: (item: T) => void;
  onClear?: Function;
};

const AutocompleteList = <T extends { id: number; name: string }>(
  props: AutocompleteListProps<T>
): React.ReactElement => {
  // eslint-disable-next-line
  const { options, renderItem, onHover, onClick, onClear } = props;

  const [hoverItemId, setHoverItemId] = useState<number | null>(null);

  const handleMouseEnter = (itemId: number) => {
    setHoverItemId(itemId);
    if (onHover) {
      const item = options.find((option) => option.id === itemId);
      if (item) onHover(item);
    }
  };

  const handleMouseLeave = () => {
    setHoverItemId(null);
  };

  const handleItemClick = (item: T) => {
    console.log("_item", item);
    if (onClick) onClick(item);
  };

  return (
    <ul>
      {options.map((option) => (
        <li
          key={option.id}
          className={hoverItemId === option.id ? "autocomplete-selected" : ""}
          onMouseEnter={() => handleMouseEnter(option.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleItemClick(option)}
        >
          {renderItem(option)}
        </li>
      ))}
    </ul>
  );
};

export default AutocompleteList;
