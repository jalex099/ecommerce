import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function CategoriesList({ items, selected, handleChange }) {
  return (
    <Tabs
      value={selected}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{ children: <div /> }}
    >
      {items.map((item, index) => (
        <Tab key={index} label={item.name} value={item._id} disableRipple />
      ))}
    </Tabs>
  );
}

export default CategoriesList;
