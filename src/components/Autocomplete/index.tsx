import { FocusEventHandler, useEffect, useState } from "react";
import CloseIcon from "../Icon/CloseIcon";
import AutocompleteItem from "./AutocompleteItem";
import AutocompleteList from "./AutocompleteList";

type AutocompleteProps<T> = {
  suggestions: T[];
  loading?: boolean;
  onHover?: (result: T) => void;
  onSelect?: (result: T) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onInputClick?: (result: boolean) => void;
};

const Autocomplete = <T extends { id: number; name: string }>(
  props: AutocompleteProps<T>
) => {
  const {
    suggestions: initialSuggestions,
    loading,
    onSelect,
    onHover,
    onFocus,
    onInputClick,
  } = props;

  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<T[]>(initialSuggestions);
  const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValue(value);

    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

    // Filter suggestions based on user input
    const filtered = suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);

    // Check if filtered suggestions are empty and input value is not empty
    if (filtered.length === 0 && value.trim() !== "") {
      setFilteredSuggestions([{ id: -1, name: "No results found" }] as T[]); // Set "No results found"
    }
  };

  const handleInputClick = () => {
    if (onInputClick) {
      onInputClick(true);
    }
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setInputFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleInputBlur = () => {
    setInputFocused(false);
    // setSuggestions(initialSuggestions);
  };

  const handleSelect = (item: T) => {
    // Call onSelect callback with the selected item
    if (onSelect) {
      onSelect(item);
    }
    setInputValue(item.name); // Set input value on selection
    setFilteredSuggestions([]); // Clear filtered suggestions after selection
  };

  const handleOnClear = () => {
    setInputValue("");
    setFilteredSuggestions(suggestions);
  };

  useEffect(() => {
    // Update suggestions state when the prop changes
    setSuggestions(initialSuggestions);
  }, [initialSuggestions]);

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Search type here..."
      />
      <div className="autocomplete-close-icon" onClick={handleOnClear}>
        <CloseIcon />
      </div>

      {inputFocused && loading && <div>Loading...</div>}

      {/* Render AutocompleteList only if loading is false */}
      {!loading && (filteredSuggestions.length > 0 || inputValue === "") && (
        <AutocompleteList
          options={
            filteredSuggestions.length > 0 ? filteredSuggestions : suggestions
          }
          renderItem={(item) => (
            <AutocompleteItem item={item} inputValue={inputValue} />
          )}
          onClick={handleSelect}
          onHover={onHover}
          onClear={handleOnClear}
        />
      )}
    </div>
  );
};

export default Autocomplete;
