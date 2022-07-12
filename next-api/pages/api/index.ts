import { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  name: string;
}

const hanlder = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'Home' });
};

export default hanlder;
