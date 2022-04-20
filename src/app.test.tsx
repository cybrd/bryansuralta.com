import { render, screen } from "@testing-library/react";
import { App } from "./app";

test("renders", () => {
  render(<App />);
  const lipsum = screen.getAllByText(/Lorem ipsum/i)[0];
  expect(lipsum).toBeInTheDocument();
});
