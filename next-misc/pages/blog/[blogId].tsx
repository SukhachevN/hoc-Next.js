import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface BlogProps {
  title: string;
  description: string;
}

const Blog: NextPage<BlogProps> = ({ title, description }) => {
  const router = useRouter();

  console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <h1 className='content'>Blog - {router.query?.blogId}</h1>
    </>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async () => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  console.log(user, password);

  return {
    props: {
      title: 'title',
      description: 'description',
    },
  };
};
