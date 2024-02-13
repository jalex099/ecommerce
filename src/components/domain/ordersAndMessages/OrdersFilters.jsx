import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useHookstate } from "@hookstate/core";
import DialogOrdersFilter
  from "#/components/domain/ordersAndMessages/DialogOrdersFilter.jsx";
import IconButton from "@mui/material/IconButton";
import FilterIcon from "#/components/shared/icons/FilterIcon.jsx";
import { useMemo, useRef } from "react";
import Badge from "@mui/material/Badge";

const OrdersFilters = ({ filters, setFilters, handleSearch, searchRef }) => {
  const isOpen = useHookstate(false);

  const handleFilterChange = (filtersInside) => {
    setFilters(filtersInside);
  };

  const handleOpenDialog = () => {
    isOpen.set(true);
  }

  const handleCloseDialog = () => {
    isOpen.set(false);
  }

  const filtersCounter = useMemo(() => {
    let quantity = 0;
    // Recorrer cada key de filters y si todos los valores son vacios, retornar true
    for (const key in filters) {
      if (filters[key]?.length !== 0) {
        quantity += filters[key]?.length;
      }
    }
    return quantity;
  }, [filters]);

  return (
    <>
        <IconButton
          sx={style?.button}
          aria-label="filter"
          onClick={handleOpenDialog}
        >
          <Badge badgeContent={filtersCounter} color="primary" >
          <FilterIcon  className="w-5 h-5"/>
          </Badge>
        </IconButton>
      <DialogOrdersFilter
        isOpen={isOpen.get()}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

const style = {
  button: {
    height: "40px",
    width: "40px",
  },
}

export default OrdersFilters;