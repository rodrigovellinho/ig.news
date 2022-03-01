import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../pages";
import { stripe } from "../services/stripe";
import { mocked } from "ts-jest/utils";

jest.mock("next-auth/react", () => {
  return {
    useSession: () => [null, "loading"],
  };
});
jest.mock("next/router");
jest.mock("../services/stripe");

describe("Home Page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "priceId", amount: "R$ 10,00" }} />);

    expect(screen.getByText("for R$ 10,00 per month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: "priceId",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "priceId",
            amount: "$10.00",
          },
        },
        revalidate: 86400,
      })
    );
  });
});
