import { useHookstate } from "@hookstate/core";
import Regular16 from "#/components/shared/fonts/Regular16";
import { useEffect } from "react";
import Box from "@mui/material/Box";
const TextShowMore = ({ text, maxChars = 120 }) => {
  const showAll = useHookstate(true);

  useEffect(() => {
    if (text?.length + 10 > maxChars) {
      showAll.set(false);
    }
  }, [text]);

  const handleShowAll = () => {
    showAll.set(true);
  };

  if (showAll.get()) {
    return <Regular16>{text}</Regular16>;
  }
  return (
    <>
      <Regular16>
        {text?.slice(0, maxChars)}...
        <Box
          component="span"
          className="text-primary cursor-pointer text-sm lowercase ml-2"
          onClick={handleShowAll}
          sx={{ color: (theme) => theme.palette.neutral50.main }}
        >
          Ver más
        </Box>
      </Regular16>
    </>
  );
};

export default TextShowMore;
