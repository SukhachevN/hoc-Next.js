import { GetStaticProps } from 'next';
import Link from 'next/link';
import { IPost } from '../../interfaces';

interface PostListProps {
  posts: IPost[];
}

const PostList: React.FC<PostListProps> = ({ posts = [] }) => (
  <>
    <h1>Post List</h1>
    <ul>
      {posts.map(({ title, body, id }) => (
        <Link key={id} href={`/posts/${id}`} passHref>
          <li>
            <h3>
              {id}-{title}
            </h3>
            <p>{body}</p>
            <hr />
          </li>
        </Link>
      ))}
    </ul>
  </>
);

export default PostList;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await response.json()) as IPost[];
  return { props: { posts } };
};
