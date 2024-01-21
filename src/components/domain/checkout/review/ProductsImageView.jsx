import Box from "@mui/material/Box";
import { Avatar, AvatarGroup } from "@mui/material";
import ImageService from "#/services/ImageService.js";
import { ImageList } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";

const ProductsImageView = ({ products }) => {

  const { findImage } = ImageService();
  return (
    <Box className={"w-full flex justify-center"}>
      <ImageList cols={products?.length} rowHeight={100} className={"rounded-md overflow-hidden"} variant={"masonry"} >
        {products.map((prd, index) => (
          <ImageListItem key={index} className={"rounded-full"} sx={{marginLeft: index === 0 ? 0 : -6 * (index)}}>
            <img
              srcSet={`${findImage(prd?._id, "PRD", "jpg")}?w=161&fit=crop&auto=format&dpr=2 2x`}
              src={`${findImage(prd?._id, "PRD", "jpg")}?w=161&fit=crop&auto=format`}
              alt={prd.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}

export default ProductsImageView;