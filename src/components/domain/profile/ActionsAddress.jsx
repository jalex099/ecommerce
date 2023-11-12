import IconButton from "@mui/material/IconButton";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useHookstate } from "@hookstate/core";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Regular14 from "#/components/shared/fonts/Regular14";

function ActionAddress({
  id,
  isPrimary,
  handleMarkAsMain,
  handleEditAddress,
  handleDeleteAddress,
}) {
  const anchorEl = useHookstate(null);
  const open = Boolean(anchorEl.get());
  const handleClick = (event) => {
    anchorEl.set(event.currentTarget);
  };
  const handleClose = () => {
    anchorEl.set(null);
  };
  return (
    <>
      <IconButton
        variant="solid"
        sx={style.button}
        onClick={handleClick}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl.get()}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={style.menu}
      >
        {!isPrimary && (
          <MenuItem
            onClick={() => {
              handleMarkAsMain(id);
              handleClose();
            }}
          >
            <ListItemIcon>
              <ListItemIcon>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText>
              <Regular14>Marcar como principal</Regular14>
            </ListItemText>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            handleEditAddress(id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Regular14>Editar</Regular14>
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteAddress(id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Regular14>Eliminar</Regular14>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

const style = {
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    maxWidth: "64px",
  },
  address: {
    flex: 1,
  },
  textMuted: {
    color: (theme) => theme.palette.neutral60.main,
  },
  menu: {
    // backgroundColor: (theme) => theme.palette.neutral10.main,
  },
};

export default ActionAddress;
