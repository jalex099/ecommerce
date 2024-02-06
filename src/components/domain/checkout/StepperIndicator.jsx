import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { CHECKOUT_STEPS } from "#/config/constants";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { motion } from "framer-motion";
import useValidateCheckout
  from "#/components/domain/checkout/controllers/useValidateCheckout.js";
import { addToast } from "#/stores/UIState.js";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { useMemo } from "react";

export default function StepperIndicator({steps, activeStep, handleClick}) {

  return (
    <Stepper
      activeStep={activeStep}
      connector={<QontoConnector />}
      className="w-full"
    >
      {Object?.keys(steps)?.map((value, index) => (
        <Step key={index}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            className={"flex-col"}
            onClick={() => handleClick(index)}
          >
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
      transition: "all 0.3s ease",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.neutral5.main,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.neutral15.main,
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: theme.palette.primary.main,
  }),
  "& .QontoStepIcon-completedIcon": {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
  },
  "& .QontoStepIcon-circle": {
    width: 10,
    height: 10,
    ...(ownerState.active && {
      width: 16,
      height: 16,
      "& span": {
        width: 12,
        height: 12,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.neutral0.main,
        "& span": {
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: theme.palette.primary.main,
        },
      },
    }),
    borderRadius: "50%",
    backgroundColor: "currentColor",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <motion.div
          className="QontoStepIcon-completedIcon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      ) : (
        <div className="QontoStepIcon-circle ">
          <span>
            <span />
          </span>
        </div>
      )}
    </QontoStepIconRoot>
  );
}
