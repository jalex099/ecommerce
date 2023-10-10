import { Helmet } from "react-helmet-async";
import { COMPANY, PAGES } from "#/config/constants";

function HelmetMeta({ page, ...props }) {
  const { category, product } = props || {};
  return (
    <Helmet>
      <title>{`${
        category
          ? // ? `Categoria ${category?.nombre}`
            `${category?.nombre}`
          : product
          ? // ? `Producto ${product?.N}`
            `${product?.N}`
          : PAGES[page].title
      } - ${COMPANY} `}</title>
      <meta name="description" content={PAGES[page].desc} />
    </Helmet>
  );
}

export default HelmetMeta;
