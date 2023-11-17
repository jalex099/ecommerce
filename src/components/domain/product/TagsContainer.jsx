import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12";
import Regular18 from "#/components/shared/fonts/Regular18";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

function TagsContainer({ tags, ...props }) {
  return (
    <Accordion {...props}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-tags-content"
        id="panel-tags-header"
      >
        <Regular18>Tags</Regular18>
      </AccordionSummary>
      <AccordionDetails>
        <Box className="flex flex-row gap-2 w-full flex-wrap" sx={style.tag}>
          {tags?.map((tag, index) => {
            return <Regular12 key={index}>{tag}</Regular12>;
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

const style = {
  tag: {
    "& > *": {
      padding: "4px 8px",
      borderRadius: "4px",
      bgcolor: (theme) => theme.palette.primary10.main,
      color: (theme) => theme.palette.primary.main,
    },
  },
};

export default TagsContainer;
