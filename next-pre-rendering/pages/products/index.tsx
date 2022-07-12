import { GetStaticProps, NextPage } from 'next';
import { IProduct } from '../../interfaces';

interface ProductListProps {
  products: IProduct[];
}

const ProductList: NextPage<ProductListProps> = ({ products }) => (
  <>
    <h1>List of products</h1>
    <ul>
      {products.map(({ id, title, price }) => (
        <li key={id}>
          <h3>
            {id} {title} {price}
          </h3>
          <hr />
        </li>
      ))}
    </ul>
  </>
);

export default ProductList;

export const getStaticProps: GetStaticProps = async () => {
  console.log('Generating / Regenerating ProductList');
  const response = await fetch('http://localhost:4000/products');
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 30,
  };
};
