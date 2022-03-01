import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";
import { useSession } from "next-auth/react";
import { mocked } from "ts-jest/utils";

jest.mock("next-auth/react");

describe("Sign in Button", () => {
  it("Renders correctly when user is not logged in", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("Renders correctly when user is logged in", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
