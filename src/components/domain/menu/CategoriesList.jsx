import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function CategoriesList({ items, selected, handleChange }) {
  return (
    <Tabs
      value={selected || false}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{ children: <div /> }}
    >
      {items.map((item, index) => (
        <Tab key={index} label={item.name} value={item.idcat} disableRipple />
      ))}
    </Tabs>
  );
}

export default CategoriesList;
