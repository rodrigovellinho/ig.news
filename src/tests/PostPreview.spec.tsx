import { render, screen } from "@testing-library/react";
import Post, { getStaticProps } from "../pages/posts/preview/[slug]";
import { useSession } from "next-auth/react";
import { mocked } from "ts-jest/utils";
import { getPrismicClient } from "../services/prismic";
import { useRouter } from "next/router";

const post = {
  slug: "my-new-post",
  title: "My new Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de abril",
};

jest.mock("../services/prismic");
jest.mock("next/router");
jest.mock("next-auth/react");

describe("Post preview Page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<Post post={post} />);

    expect(screen.getByText("My new Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading ?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: "fake-active-subscription" },
      false,
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My new post" }],
          content: [{ type: "paragraph", text: "post excerpt" }],
        },
        last_publication_date: "04-01-2020",
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My new post",
            content: "<p>post excerpt</p>",
            updatedAt: "01 de abril de 2020",
          },
        },
      })
    );
  });
});
