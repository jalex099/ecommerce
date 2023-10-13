import Box from "@mui/material/Box";
import Bold18 from "#/components/shared/fonts/Bold18";
import HorizontalScroller from "#/components/shared/HorizontalScroller";
import NewContentCard from "#/components/domain/feed/NewContentCard";

const tempNews = [
  { image: "https://picsum.photos/200/300", title: "Noticia 1" },
  { image: "https://picsum.photos/200/300", title: "Noticia 2" },
  { image: "https://picsum.photos/200/300", title: "Noticia 3" },
  { image: "https://picsum.photos/200/300", title: "Noticia 4" },
  { image: "https://picsum.photos/200/300", title: "Noticia 5" },
  { image: "https://picsum.photos/200/300", title: "Noticia 6" },
];

function NewContent({ news }) {
  if (!news) return null;
  return (
    <Box sx={style.container}>
      <Bold18>Novedades</Bold18>
      <HorizontalScroller>
        {tempNews?.map((item, index) => (
          <NewContentCard key={index} item={item} />
        ))}
      </HorizontalScroller>
    </Box>
  );
}

const style = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
  },
};

export default NewContent;
