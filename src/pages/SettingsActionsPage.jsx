import Container from "@mui/material/Container";
import { useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import AccountSettingsContainer from "#/components/domain/settings/AccountSettingsContainer.jsx";
const SettingsActionsPage = () => {
  const { section } = useParams();
  return (
    <Container>
      {
        section === "cuenta" ? (
          <AccountSettingsContainer />
        ) : (
          <Navigate to="/404" />
        )
      }
    </Container>
  );
}

export default SettingsActionsPage;