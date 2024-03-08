import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import "@/__mocks__/intersectionObserverMock";

import Page from "../page";

jest.mock("../actions", () => ({
  fetchPokemons: jest.fn().mockResolvedValue({
    pokemons: [{ id: 1, name: "Pikachu", image: "/pikachu.jpg" }],
    pagination: { hasNext: false, nextOffset: 0 },
  }),
}));

describe("page", () => {
  it("renders correctly", async () => {
    const page = await Page();
    render(page);

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  });

  it("fetches a list of pokemons on first render", async () => {
    const page = await Page();
    render(page);

    const pikachu = await screen.findByAltText("Pikachu");

    expect(pikachu).toBeInTheDocument();
  });
});
