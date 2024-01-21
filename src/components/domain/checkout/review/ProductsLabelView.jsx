import Box from "@mui/material/Box";
import TextEllipsis from "#/components/shared/TextEllipsis";
import { useMemo } from "react";

const ProductsLabelView = ({ products }) => {
  const text = useMemo(()=>{
    return products?.reduce((acc, {name}, index)=> {
      return acc + `${name?.toLowerCase()?.trim()}${index !== products?.length -1 ? ", " : ""}`
    }, "")
  }, [])
  return (
    <Box className={"w-full text-center"}>
       <TextEllipsis text={text} />
    </Box>
  )
}

export default ProductsLabelView