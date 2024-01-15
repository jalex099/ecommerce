
import { Button } from "@mui/material";


const ContinueButtonContainer = ({ isDisabled, onClick }) => (
            <Button
                variant="contained"
                size="small"
                className={"w-full"}
                color={"primary"}
                onClick={onClick}
                disabled={isDisabled}
            >
                Continuar
            </Button>
)

export default ContinueButtonContainer