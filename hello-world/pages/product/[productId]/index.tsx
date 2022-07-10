import { useRouter } from 'next/router';

const ProductDeatails = () => {
  const router = useRouter();

  const { productId } = router.query;

  return <h1>Details about product {productId}</h1>;
};

export default ProductDeatails;
