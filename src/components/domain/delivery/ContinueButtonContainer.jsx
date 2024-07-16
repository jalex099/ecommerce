
import { Button } from "@mui/material";


const ContinueButtonContainer = ({ isDisabled, onClick, ...props }) => (
            <Button
                variant="contained"
                size="small"
                className={"w-full"}
                color={"primary"}
                onClick={onClick}
                disabled={isDisabled}
                {...props}
            >
                Continuar
            </Button>
)

export default ContinueButtonContainer