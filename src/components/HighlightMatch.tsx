import { ReactElement } from "react";

type HighlightMatchProps = {
  text: string;
  highlight: string;
};

const HighlightMatch = (props: HighlightMatchProps): ReactElement => {
  const { text, highlight } = props;

  // Function to highlight the matching part of the text
  const highlightMatch = (text: string, highlight: string): ReactElement => {
    const index = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (index === -1) {
      return <>{text}</>; // No match found, return the original text
    }

    const beforeMatch = text.slice(0, index);
    const match = text.slice(index, index + highlight.length);
    const afterMatch = text.slice(index + highlight.length);

    return (
      <>
        {beforeMatch}
        <strong>{match}</strong>
        {afterMatch}
      </>
    );
  };

  return <>{highlightMatch(text, highlight)}</>;
};

export default HighlightMatch;
