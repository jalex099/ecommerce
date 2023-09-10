import { useHookstate } from "@hookstate/core";
import { InputText } from "primereact/inputtext";
import { SEARCH_PLACEHOLDER, FADE_ANIMATION } from "#/config/constants";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

const SearchComponent = () => {
  const search = useHookstate("");
  const op = useRef(null);

  const handleComplete = (e) => {
    console.log(e);
  };

  const handleChange = (e) => {
    console.log(e);
    search.set(e.value);
  };
  return (
    <>
      <motion.div
        className="flex justify-between gap-2 items-center"
        initial={FADE_ANIMATION.initial}
        animate={FADE_ANIMATION.animate}
        transition={FADE_ANIMATION.transition}
        exit={FADE_ANIMATION.exit}
      >
        <span className="p-input-icon-right flex-1">
          <i className="pi pi-search" />
          <InputText placeholder={SEARCH_PLACEHOLDER} className="text-sm p-3" />
        </span>
        <Button icon="pi pi-filter" onClick={(e) => op.current.toggle(e)} />
      </motion.div>
      <OverlayPanel ref={op} className="w-[250px]">
        Filters
      </OverlayPanel>
    </>
  );
};

export default SearchComponent;
