import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { IPost } from '../../interfaces';

const Post: NextPage<IPost> = ({ id, title, body }) => {
  const router = useRouter();

  //   if (router.isFallback) return <>Loading...</>;

  return (
    <>
      <h3>
        {id} - {title}
      </h3>
      <p>{body}</p>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await response.json()) as IPost[];
  const paths = posts.map(({ id }) => ({
    params: {
      postId: id.toString(),
    },
  }));

  return {
    paths: [
      { params: { postId: '1' } },
      { params: { postId: '2' } },
      { params: { postId: '3' } },
    ],

    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.postId}`
  );
  const result = (await response.json()) as IPost;

  if (!result.id) return { notFound: true };

  console.log(`Generating page for /posts/${params?.postId}`);

  return {
    props: {
      ...result,
    },
  };
};
