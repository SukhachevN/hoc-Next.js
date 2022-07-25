import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface BlogProps {
  title: string;
  description: string;
}

const Blog: NextPage<BlogProps> = ({ title, description }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <div>Blog - {router.query?.blogId}</div>
    </>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { blogId: '1' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title: 'title',
    description: 'description',
  },
});
