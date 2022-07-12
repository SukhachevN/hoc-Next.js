import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { IProduct } from '../../interfaces';

const Product: NextPage<IProduct> = ({ id, title, description, price }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div>
      <h3>
        {id} {title} {price}
      </h3>
      <p>{description}</p>
    </div>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { productId: '1' } }],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  console.log(`Regenerating product ${params?.productid}`);
  const response = await fetch(
    `http://localhost:4000/products/${params?.productId}`
  );
  const product = (await response.json()) as IProduct;

  if (!product.id) return { notFound: true };

  return {
    props: {
      ...product,
    },
    revalidate: 10,
  };
};
