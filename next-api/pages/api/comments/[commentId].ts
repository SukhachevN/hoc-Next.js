import { NextApiRequest, NextApiResponse } from 'next';
import { comments, IComment } from '../../../data/comments';

const hanlder = (
  req: NextApiRequest,
  res: NextApiResponse<IComment | string>
) => {
  const commentId = req.query.commentId as string;
  const comment = comments.find(({ id }) => id === +commentId);

  if (!comment) {
    res.status(404).json('');
  } else {
    const commentIndex = comments.indexOf(comment);
    const requestHandler = {
      GET: () => res.status(200).json(comment),
      DELETE: () => {
        comments.splice(commentIndex, 1);
        res.status(201).json(comment);
      },
      PATCH: () => {
        const newComment: IComment = { id: +commentId, text: req.body.text };
        comments.splice(commentIndex, 1, newComment);
        res.status(201).json(newComment);
      },
      default: () => res.status(405).json(''),
    };
    const method = req.method as keyof typeof requestHandler;

    return requestHandler[method]
      ? requestHandler[method]()
      : requestHandler.default();
  }
};

export default hanlder;
