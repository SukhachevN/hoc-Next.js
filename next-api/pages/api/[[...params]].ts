import { NextApiRequest, NextApiResponse } from 'next';

const hanlder = (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  const { params } = req.query;
  console.log(params);
  res.status(200).json(params as string[]);
};

export default hanlder;
