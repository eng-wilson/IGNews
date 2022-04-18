import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getSession, useSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post excerpt</p>",
  updatedAt: "april 18th 2022",
};

jest.mock("next-auth/react");

const prismic = require("../../services/prismic");

describe("Posts Page", () => {
  it("should render correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });

  it("should redirect user if no subscription is found", async () => {
    const getSessionMocked = mocked(useSession);

    getSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        }),
      })
    );
  });

  it("should load initial data", async () => {
    const useSessionMocked = mocked(getSession);
    const getPrismicClientMocked = jest.spyOn(prismic, "createClient");

    useSessionMocked.mockReturnValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: "heading",
              text: "Fake title",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "Fake content",
            },
          ],
        },
        last_publication_date: "01-01-2020",
      }),
    });

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
            title: "Fake title",
            content: "<p>Fake content</p>",
            updatedAt: "01 de janeiro de 2020",
          },
        },
      })
    );
  });
});
