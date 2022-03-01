import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

test("adds active class if the link as currently active", () => {
  render(<Header />);

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Posts")).toBeInTheDocument();
});
