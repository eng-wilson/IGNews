import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";

const prismic = require("../../services/prismic");

const posts = [
  {
    slug: "my-new-post",
    title: "My new post",
    excerpt: "Post excerpt",
    updatedAt: "april 18th 2022",
  },
];

describe("Posts Page", () => {
  it("should render correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My new post")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const getPrismicClientMocked = jest.spyOn(prismic, "createClient");

    getPrismicClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: "fake-slug",
          data: {
            title: [
              {
                type: "heading",
                text: "Fake title 1",
              },
            ],
            content: [
              {
                type: "paragraph",
                text: "Fake excerpt 1",
              },
            ],
          },
          last_publication_date: "01-01-2020",
        },
      ]),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "fake-slug",
              title: "Fake title 1",
              excerpt: "Fake excerpt 1",
              updatedAt: "01 de janeiro de 2020",
            },
          ],
        },
      })
    );
  });
});
