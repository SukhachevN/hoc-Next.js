import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setPreviewData('Nikita');
  res.redirect(req.query.redirect?.toString() ?? '');
};

export default handler;
