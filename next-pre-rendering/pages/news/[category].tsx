import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { INews } from '../../interfaces';

interface NewsByCategoryProps {
  category: string;
  news: INews[];
}

const NewsByCategory: NextPage<NewsByCategoryProps> = ({
  news = [],
  category,
}) => (
  <>
    <h1>
      List of News Articles for category <i>{category}</i>
    </h1>
    <ul>
      {news.map(({ id, title, description }) => (
        <li key={id}>
          <h3>
            {id} {title}
          </h3>
          <p>{description}</p>
          <hr />
        </li>
      ))}
    </ul>
  </>
);

export default NewsByCategory;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    `http://localhost:4000/news?category=${params?.category}`
  );
  const news = await response.json();

  if (!news.length) return { notFound: true };

  console.log(`Pre-rendering News Articles for category ${params?.category}`);

  return {
    props: {
      category: params?.category,
      news,
    },
  };
};
