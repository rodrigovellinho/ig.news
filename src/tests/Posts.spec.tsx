import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../pages/posts";
import { stripe } from "../services/stripe";
import { mocked } from "ts-jest/utils";
import { getPrismicClient } from "../services/prismic";

jest.mock("../services/prismic");

const posts = [
  {
    slug: "my-new-post",
    title: "My new Post",
    excerpt: "my-new-post",
    updatedAt: "march",
  },
];

describe("Posts Page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My new Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new post" }],
              content: [{ type: "paragraph", text: "post excerpt" }],
            },
            last_publication_date: "04-01-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "post excerpt",
              updatedAt: "01 de abril de 2021",
            },
          ],
        },
      })
    );
  });
});
