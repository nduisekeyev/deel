import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders users", () => {
  render(<App />);
  const linkElement = screen.getByText(/users/i);
  expect(linkElement).toBeInTheDocument();
});
