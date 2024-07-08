import DialogTitle from "@mui/material/DialogTitle";
import SemiBold14 from "#/components/shared/fonts/SemiBold14.jsx";
import DialogContent from "@mui/material/DialogContent";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Checkbox,
  FormControl,
  FormControlLabel, FormGroup,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { ORDER_STEPS, PAYMENT_METHODS } from "#/config/constants.js";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import serializeState from "#/utils/serializeState.js";

const DialogOrdersFilter = ({ isOpen, handleClose, filters, handleFilterChange }) => {
  const statusFilter = useHookstate(null);
  const paymentMethodFilter = useHookstate(null);


  useEffect(() => {
    if(!isOpen) return;
    statusFilter?.set(serializeState(filters?.status));
    paymentMethodFilter?.set(serializeState(filters?.paymentMethod));
  }, [isOpen]);
  const handleStatusFilterChange = (e) => {
    if(e?.target?.checked) {
      statusFilter?.set([...statusFilter.get(), e?.target?.value]);
      return;
    }
    statusFilter?.set(statusFilter?.get()?.filter((status) => status !== e?.target?.value));
  }

  const handlePaymentMethodFilterChange = (e) => {
    if(e?.target?.checked) {
      paymentMethodFilter?.set([...paymentMethodFilter.get(), e?.target?.value]);
      return;
    }
    paymentMethodFilter?.set(paymentMethodFilter?.get()?.filter((status) => status !== e?.target?.value));
  }
  const handleSetFilters = () => {
    let filtersObj = {
      status: serializeState(statusFilter?.get()),
      paymentMethod: serializeState(paymentMethodFilter?.get()),
    }
    handleFilterChange(filtersObj);
    handleClose();
  }

  return (
    <Dialog open={isOpen}
            PaperProps={{ sx: style.dialog }}>
      <DialogTitle>
        <SemiBold14>Filtros</SemiBold14>
      </DialogTitle>
      <DialogContent>
        <Box className={"flex flex-col gap-2"}>
          {
            statusFilter?.value && (<FormControl component="fieldset" variant="standard">
              <Regular14>Estado</Regular14>
              <FormGroup row
                         onChange={ handleStatusFilterChange }
              >
                {
                  ORDER_STEPS?.map((step, index) => (
                    <FormControlLabel
                      name="status"
                      key={index}
                      control={
                        <Checkbox
                          checked={statusFilter?.value?.includes(step?.value)}
                          value={step?.value}
                        />
                      }
                      label={step?.label}
                    />
                  ))
                }
              </FormGroup>
            </FormControl>)
          }

          {
            paymentMethodFilter?.value && (<FormControl component="fieldset" variant="standard">
              <Regular14>M&eacute;todo de pago</Regular14>
              <FormGroup row
                         onChange={ handlePaymentMethodFilterChange }
              >
                {
                  PAYMENT_METHODS?.map((step, index) => (
                    <FormControlLabel
                      name="status"
                      key={index}
                      control={
                        <Checkbox
                          checked={paymentMethodFilter?.value?.includes(step?.code)}
                          value={step?.code}
                        />
                      }
                      label={step?.label}
                    />
                  ))
                }
              </FormGroup>
            </FormControl>)
          }
        </Box>
      </DialogContent>
      <DialogActions className="flex flex-row justify-center" sx={{ gap: "4px" }}>
        <Button onClick={handleClose} variant="outlined" className={"flex-grow"} >
          Cancelar
        </Button>
        <Button onClick={handleSetFilters} variant="contained" className={"flex-grow"} >
          Establecer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
const style = {
  dialog: {
    minHeight: "200px",position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0
  },
  link: {
    color: (theme) => theme.palette.primary120.main,
    cursor: "pointer",
  },
};


export default DialogOrdersFilter;