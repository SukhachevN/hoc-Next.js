import { GetStaticProps, NextPage } from 'next';

interface NewsProps {
  data: string;
}

const News: NextPage<NewsProps> = ({ data }) => (
  <h1 className='content'>{data}</h1>
);

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('running getStaticProps');

  return {
    props: {
      data: context.previewData ?? 'News',
    },
  };
};

export default News;
