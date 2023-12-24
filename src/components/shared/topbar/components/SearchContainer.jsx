import OutlinedInput from "@mui/material/OutlinedInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import * as _ from "lodash";
import DataService from "#/services/DataService";
import { useRef } from "react";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export default function SearchContainer() {
  const { menu } = DataService();
  const results = useHookstate([]);
  const searchRef = useRef(null);

  useEffect(() => {
    console.log(results?.get());
  }, [results?.get()]);

  const handleSearch = _.debounce(() => {
    const search = searchRef.current.value;
    if (search.length < 3) {
      results.set([]);
      return;
    }
    results?.set(
      menu?.filter((a) =>
        _.values(a).some((b) => _.includes(_.toLower(b), _.toLower(search)))
      )
    );
  }, 500);

  return (
    <OutlinedInput
      size="small"
      placeholder="Buscar"
      sx={{ backgroundColor: "#F3F3F3" }}
      endAdornment={
        <SearchOutlinedIcon
          fontSize="32px"
          color="neutral40"
          sx={{ marginRight: "8px" }}
        />
      }
      onKeyUp={handleSearch}
      inputRef={searchRef}
    />
  );
}
