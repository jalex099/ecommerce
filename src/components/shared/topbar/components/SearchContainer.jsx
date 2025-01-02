import OutlinedInput from "@mui/material/OutlinedInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import * as _ from "lodash";
import DataService from "#/services/DataService";
import { useEffect, useRef } from "react";
import { useHookstate } from "@hookstate/core";
import { useSearchParams } from "react-router-dom";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "#/components/shared/icons/CloseIcon.jsx";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import { SLIDE_UP_ANIMATION } from "#/config/constants.js";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Box from "@mui/material/Box";
import ProductCard from "#/components/domain/search/ProductCard.jsx";
import { startLoading, stopLoading } from "#/stores/UIState.js";

export default function SearchContainer() {
  const { menu } = DataService();
  const results = useHookstate([]);
  const searchWord = useHookstate("");
  const isOpen = useHookstate(false);
  const searchRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);

  useEffect(() => {
    const search = searchParams.get("tag");
    if (search) {
      startLoading()
      isOpen.set(true);
      results.set(
        menu?.filter((a) => _.values(a).some((b) => _.includes(_.toLower(b), _.toLower(search))))
      );
      setTimeout(() => {
        searchRef.current.value = search;
        searchWord.set(search);
        stopLoading();
      }, 300);
    }
  }, []);

  useEffect(() => {
    if (isOpen.get() && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isOpen]);

  const handleSearch = _.debounce(() => {
    const search = searchRef.current.value?.trim();
    searchWord.set(search);
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

  const handleClose = () => {
    isOpen.set(false);
    searchWord.set("");
    results.set([]);
    searchRef.current.value = "";
    setSearchParams({ tag: "" });
  }

  const handleOpen = () => {
    isOpen.set(true);
    setTimeout(() => {
      searchRef.current.focus();
    }, 20);
  }

  return (
    <>
      <motion.div
        initial="visible"
        animate={isOpen.get() ? "hidden" : "visible"}
        variants={{
          visible: SLIDE_UP_ANIMATION?.visible,
          hidden: SLIDE_UP_ANIMATION?.hidden,
        }}
      >
        <OutlinedInput
          size="small"
          placeholder="Buscar producto"
          sx={{ backgroundColor: "#F3F3F3" }}
          fullWidth
          endAdornment={
            <SearchOutlinedIcon
              fontSize="32px"
              color="neutral40"
              sx={{ marginRight: "8px" }}
            />
          }
          onClick={handleOpen}
          autoFocus={false}
          onBlur={(e) => e.target.blur()}
          value={searchWord.get()}
          inputRef={inputRef}
        />
      </motion.div>
      <Dialog open={isOpen?.value} PaperProps={{ sx: style.dialog }} onClose={handleClose}>
        <DialogTitle>
          <OutlinedInput
            size="small"
            placeholder="Buscar producto"
            autoFocus={false}
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
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon className="w-6 h-6" />
        </IconButton>
        <DialogContent
          className={"flex flex-col items-center justify-center"}
        >
          <motion.div
            initial="visible"
            animate={results.get().length === 0 && searchWord?.value?.length < 3 ? "visible" : "hidden"}
            variants={{
              visible: SLIDE_UP_ANIMATION?.visible,
              hidden: SLIDE_UP_ANIMATION?.hidden,
            }}
          >
            {results.get().length === 0 && searchWord?.value?.length < 3 && (
              <Regular14 className={"text-center opacity-70"}>Escribe al menos 3 caracteres para realizar la b&uacute;squeda</Regular14>
            )}
          </motion.div>
          <motion.div
            initial="hidden"
            animate={results.get().length !== 0 && searchWord?.value?.length >= 3 ? "visible" : "hidden"}
            variants={{
              visible: SLIDE_UP_ANIMATION?.visible,
              hidden: SLIDE_UP_ANIMATION?.hidden,
            }}
            className={"grid grid-cols-2 gap-4 w-full relative"}
          >
            {results.get().map((result) => (
              <ProductCard key={result.id}
                id={result._id}
                name={result.name}
                description={result.description}
                handleClose={handleClose}
              />
            ))}
          </motion.div>
          <motion.div
            initial="hidden"
            animate={results.get().length === 0 && searchWord?.value?.length >= 3 ? "visible" : "hidden"}
            variants={{
              visible: SLIDE_UP_ANIMATION?.visible,
              hidden: SLIDE_UP_ANIMATION?.hidden,
            }}
          >
            <Regular14 className={"text-center opacity-70"}>No se encontraron resultados</Regular14>
          </motion.div>

        </DialogContent>
      </Dialog>
    </>

  );
}

const style = {
  dialog: {
    minHeight: "300px", position: { xs: "absolute", lg: "relative" }, bottom: 0, left: 0, right: 0
  },
};
