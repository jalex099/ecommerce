import SemiBold12 from "#/components/shared/fonts/SemiBold12.jsx";
import { motion } from "framer-motion";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import Box from "@mui/material/Box";
import useLongPress from "#/hooks/useLongPress.jsx";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";

const BankAccount = ({ bankAccount }) => {

  const handleLongPress = () => {
    navigator.clipboard.writeText(bankAccount?.value);
  }

  const backspaceLongPress = useLongPress(handleLongPress, 500);
  return (
    <Box className={"flex flex-row gap-4 w-full items-center justify-center"}>
      <Regular14>
        {bankAccount?.description}
      </Regular14>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        {...backspaceLongPress}
      >
        <Regular14  className="select-none text-center ">
          {bankAccount?.value}
        </Regular14>
      </motion.div>
    </Box>
  )
}

export default BankAccount;