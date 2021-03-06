import { render, screen } from "@testing-library/react";
import Post, { getServerSideProps } from "../pages/posts/[slug]";
import { getSession } from "next-auth/react";
import { mocked } from "ts-jest/utils";
import { getPrismicClient } from "../services/prismic";

jest.mock("../services/prismic");
jest.mock("next-auth/react");

const post = {
  slug: "my-new-post",
  title: "My new Post",
  content: "<p>my-new-post</p>",
  updatedAt: "march",
};
describe("Post Page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("My new Post")).toBeInTheDocument();
    expect(screen.getByText("my-new-post")).toBeInTheDocument();
  });

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: `/posts/preview/my-new-post`,
        }),
      })
    );
  });

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession);
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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

    const response = await getServerSideProps({
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
        redirect: 1800,
      })
    );
  });
});
