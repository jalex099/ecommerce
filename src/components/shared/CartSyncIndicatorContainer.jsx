import SyncIcon from "#/components/shared/icons/SyncIcon";
import { motion } from "framer-motion";
import SemiBold12 from "#/components/shared/fonts/SemiBold12";
import { AnimatePresence } from "framer-motion";

export default function CartSyncIndicatorContainer({ isSyncing = false }) {
  return (
    <AnimatePresence>
      {!!isSyncing && (
        <motion.div
          className=" fixed top-3 right-3 z-[9999] flex flex-row gap-2 justify-center items-center px-3 py-1 rounded-md shadow-lg"
          style={{ background: "#FFFFFF" }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
        >
          <SyncIcon className="w-4 h-4" />
          <SemiBold12>Sincronizando carrito</SemiBold12>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
