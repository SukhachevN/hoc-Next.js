import { NextApiRequest, NextApiResponse } from 'next';
import { comments, IComment } from '../../../data/comments';

const hanlder = (
  req: NextApiRequest,
  res: NextApiResponse<IComment[] | string>
) => {
  const requestHandler = {
    GET: () => res.status(200).json(comments),
    POST: () => {
      const text: string = req.body.comment;
      comments.push({
        id: Date.now(),
        text,
      });
      res.status(201).json(comments);
    },
    default: () => res.status(405).json(''),
  };
  const method = req.method as keyof typeof requestHandler;

  return requestHandler[method]
    ? requestHandler[method]()
    : requestHandler.default();
};

export default hanlder;
