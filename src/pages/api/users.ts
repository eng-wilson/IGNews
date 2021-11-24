import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const user = [
    {
      id: 1,
      nome: "Wilson",
    },
  ];

  return response.json(user);
};
