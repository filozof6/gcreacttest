import React from "react";
import { render, screen } from "@testing-library/react";
import CardSkeleton from "./CardSkeleton";

test("renders card skeleton", async () => {
  render(<CardSkeleton />);

  const element = await screen.findByTestId("cardSkeleton");

  expect(element).toBeInTheDocument();
});
