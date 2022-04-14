import { NextApiRequest, NextApiResponse } from "next";

const getUsers = (request: NextApiRequest, response: NextApiResponse) => {
  const user = [
    {
      id: 1,
      nome: "Wilson",
    },
  ];

  return response.json(user);
};

export default getUsers;
