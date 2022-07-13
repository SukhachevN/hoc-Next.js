import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { IComment, comments } from '../../data/comments';

const Comment: React.FC<IComment> = ({ id, text }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div>
      {id} - {text}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { commentId: '1' },
      },
      {
        params: { commentId: '2' },
      },
      {
        params: { commentId: '3' },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const commentId = context.params?.commentId as string;

  const comment = comments.find(({ id }) => id === +commentId);

  if (!comment) return { notFound: true };

  return {
    props: {
      ...comment,
    },
  };
};

export default Comment;
