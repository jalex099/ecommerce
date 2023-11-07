import { Helmet } from "react-helmet-async";
import { COMPANY, PAGES } from "#/config/constants";

function HelmetMeta({ page, ...props }) {
  const { category, product } = props || {};
  return (
    <Helmet>
      <title>{`${
        category
          ? // ? `Categoria ${category?.name}`
            `${category?.name}`
          : product
          ? // ? `Producto ${product?.name}`
            `${product?.name}`
          : PAGES[page].title
      } - ${COMPANY} `}</title>
      <meta name="description" content={PAGES[page].desc} />
    </Helmet>
  );
}

export default HelmetMeta;
