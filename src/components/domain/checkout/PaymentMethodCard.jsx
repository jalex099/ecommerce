import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import Radio from "@mui/material/Radio";
import Regular14 from "#/components/shared/fonts/Regular14";
import CashIcon from "#/components/shared/icons/CashIcon.jsx";
import CardIcon from "#/components/shared/icons/CardIcon.jsx";
import BankIcon from "#/components/shared/icons/BankIcon.jsx";

const PaymentMethodCard = ({ paymentMethod, isSelected, handleChange }) => (

  <Box
    className="flex flex-col items-center justify-around gap-2 py-2 px-4 rounded-md w-[120px] h-[160px] cursor-pointer shadow-md relative"
    sx={{
      color: (theme) =>
        isSelected
          ? theme.palette.primary140.main
          : theme.palette.neutral70.main,
      bgcolor: (theme) =>
        isSelected
          ? theme.palette.primary10.main
          : theme.palette.neutral0.main,
    }}
    onClick={()=>handleChange(paymentMethod?.value)}
  >
    { paymentMethod?.value === 0 && (<CashIcon className={"w-12 "}/>) }
    { paymentMethod?.value === 1 && (<CardIcon className={"w-12 "}/>) }
    { paymentMethod?.value === 2 && (<BankIcon className={"w-12 "}/>) }
    <Box className={"flex-1 flex justify-center items-center"}>
        <SemiBold14 className={" text-center"}>{paymentMethod?.label}</SemiBold14>
    </Box>
    <Radio
      checked={isSelected}
      onChange={()=>handleChange(paymentMethod?.value)}
      value={paymentMethod?.value}
      name="payment-type"
      inputProps={{ "aria-label": "payment-type" }}
      sx={style?.radio}
      size="small"
    />
  </Box>
)

const style = {
  radio: {
    position: "absolute",
    top: 0,
    right: 0
  }
}

export default PaymentMethodCard;