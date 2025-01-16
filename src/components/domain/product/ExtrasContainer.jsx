import Box from "@mui/material/Box";
import TagsContainer from "#/components/domain/product/TagsContainer";
import ShippingAndReturnPolicy from "#/components/domain/product/ShippingAndReturnPolicy";
import { useHookstate } from "@hookstate/core";

function ExtrasContainer({ tags = [] }) {
  const expanded = useHookstate(false);

  const handleChange = (panel) => (event, newExpanded) => {
    expanded?.set(newExpanded ? panel : false);
  };

  return (
    <Box className="">
      {
        tags?.length > 0 &&
        <TagsContainer
          tags={tags}
          expanded={expanded.get() === 0}
          onChange={handleChange(0)}
        />
      }
      {/*<ShippingAndReturnPolicy*/}
      {/*  expanded={expanded.get() === 1}*/}
      {/*  onChange={handleChange(1)}*/}
      {/*/>*/}
    </Box>
  );
}

export default ExtrasContainer;
