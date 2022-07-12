import { GetServerSideProps, NextPage } from 'next';
import { INews } from '../../interfaces';

interface NewsListProps {
  news: INews[];
}

const NewsList: NextPage<NewsListProps> = ({ news = [] }) => (
  <>
    <h1>List of News Articles</h1>
    <ul>
      {news.map(({ id, title, description, category }) => (
        <li key={id}>
          <h3>
            {id} {title} | {category}
          </h3>
          <p>{description}</p>
          <hr />
        </li>
      ))}
    </ul>
  </>
);

export default NewsList;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:4000/news');
  const news = await response.json();
  console.log('Pre-rendering NewsList');

  return {
    props: {
      news,
    },
  };
};
