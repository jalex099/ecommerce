import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import Container from "@mui/material/Container";
import { useUIState } from "#/stores/UIState.js";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import { useHookstate } from "@hookstate/core";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Regular16 from "#/components/shared/fonts/Regular16";

const settings = [
  {
    title: "Cuenta",
    items: [
      { name: "Información personal", to: "/ajustes/cuenta", id: "INFORMACION_PERSONAL", isActive: true },
      { name: "Métodos de pago", to: "/ajustes/metodos-de-pago", id: "METODOS_DE_PAGO", isActive: true },
    ],
  },
  {
    title: "Centro de notificaciones",
    items: [
      { name: "Notificaciones", to: "/ajustes/notificaciones", id: "NOTIFICACIONES", isActive: false },
    ],
  },
  {
    title: "Soporte",
    items: [
      { name: "Ayuda", to: "/ajustes/ayuda", id: "AYUDA", isActive: true },
      { name: "Contáctanos", to: "/ajustes/contacto", id: "CONTACTO", isActive: true },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Términos y condiciones", to: "/ajustes/terminos-y-condiciones" , id: "TERMINOS_Y_CONDICIONES", isActive: true},
      { name: "Política de privacidad", to: "/ajustes/privacidad", id: "PRIVACIDAD", isActive: true },
    ],
  },
  {
    title: "Sobre nosotros",
    items: [
      { name: "Acerca de", to: "/ajustes/sobre-nosotros", id: "ACERCA_DE", isActive: true },
    ],
  }
]

const SettingsPage = () => {
  const ui = useUIState();
  const selected = useHookstate(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    ui?.setTitle("");
  }, []);

  useEffect(() => {
    if (pathname === "/ajustes" ) {
      selected.set(null);
    }
    else {
      const item = settings?.flatMap(section => section?.items)?.find(item => item?.to === pathname);
      selected.set(item?.id);
    }
  }, [pathname]);

  const handleClick = (item) => {
    selected?.set(item?.id);
    navigate(item?.to);
  }

  return (
    <Container sx={style.container}>
      <HelmetMeta page="settings" />
      <Box className={"w-full h-full"}>
        {
          !selected?.value && (
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {settings?.map((item, index) => (
                <li key={`section-${index}`}>
                  <ul>
                    <ListSubheader>{item?.title}</ListSubheader>
                    {item?.items?.map((subitem, indexSubitem) => (
                      <ListItemButton key={`item-${indexSubitem}`}
                                      onClick={() => handleClick(subitem)}
                                      disabled={!subitem?.isActive}
                      >
                        <ListItemText primary={subitem?.name} />
                      </ListItemButton>
                    ))}
                  </ul>
                </li>
              ))}
            </List>
          )
        }
      </Box>
    </Container>
  );
}


const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    height: '100%'
  },
};

export default SettingsPage;