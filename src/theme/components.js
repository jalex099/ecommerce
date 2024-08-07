const components = {
  MuiButton: {
    variants: [
      {
        props: { variant: "contained", color: "primary" },
        style: {
          backgroundColor: "#283a4f",
          fontWeight: "600",
          color: "#FFFFFF",
          padding: "12px 32px",
          boxShadow: "none",
          borderRadius: "12px",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#283a4f",
          },
        },
      },
      {
        props: { variant: "outlined", color: "primary" },
        style: {
          boxShadow: "none",
          border: "1px solid #E7E7E8",
          backgroundColor: "#FFFFFF",
          color: "#0E0E10",
          textTransform: "none",
          padding: "12px 32px",
          borderRadius: "12px",
          "&:hover": {
            boxShadow: "none",
            border: "1px solid #E7E7E8",
          },
        },
      },
      {
        props: { variant: "contained", color: "secondary" },
        style: {
          backgroundColor: "#FF7C5A",
          fontWeight: "600",
          color: "#FFFFFF",
          padding: "12px 32px",
          boxShadow: "none",
          borderRadius: "12px",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#FF7C5A",
          },
        },
      },
    ],
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        textTransform: "none !important",
        // disabled
        "&.Mui-disabled": {
          backgroundColor: "#E7E7E8 !important",
          color: "#868687 !important",
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        display: "grid",
        gridTemplateColumns: "32px 1fr 32px",
        gridGap: "24px",
        padding: "0 24px",
        height: "70px",
        alignItems: "center",
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: "24px",
        width: "24px",
        height: "24px",
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: "16px",
          backgroundColor: "#F3F3F3",
          border: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          fontSize: "14px",
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        backgroundColor: "#F3F3F3", // Cambia el color de fondo
        borderRadius: "16px", // Cambia el radio del borde
        border: "none", // Elimina el borde
        fontSize: "14px", // Cambia el tamaño de la fuente
        input: {
          padding: "8px 12px",
        },
        // Agrega aquí los estilos adicionales que desees
      },
      underline: {
        "&:before": {
          borderBottom: "none !important", // Elimina la línea inferior en el estado normal
        },
        "&:after": {
          borderBottom: "none", // Elimina la línea inferior en el estado de foco
        },
        "&:hover:before": {
          borderBottom: "none", // Elimina la línea inferior en el estado de hover
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        // backgroundColor: "#F3F3F3",
        // borderRadius: "16px",
        padding: "8px 12px",
        border: "none",
        fontSize: "14px",
        margin: "0px",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "16px",
      },
    },
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        color: "#9F9F9F",
        "&.Mui-selected": {
          color: "#283a4f",
        },
        "& .MuiBottomNavigationAction-label": {
          fontSize: "12px",
          "&.Mui-selected": {
            fontSize: "12px",
          },
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        maxWidth: "1000px !important",
        padding: "8px 24px",
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        textTransform: "none",
        minHeight: "24px",
        "& .MuiTabs-indicator": {
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
          "& > div": {
            maxWidth: "4px",
            width: "100%",
            backgroundColor: "#283a4f",
          },
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
        padding: "16px",
        color: "#9F9F9F",
        minHeight: "24px",
        maxHeight: "24px",
        "&.Mui-selected": {
          color: "#0E0E10",
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: { xs: "24px 24px 0px 0px ", lg: "24px" },
        position: { xs: "absolute", lg: "relative" },
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        minHeight: "200px",
        padding: "8px 24px",
        "& .MuiDialogTitle-root": {
          minHeight: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: "regular",
          textAlign: "center",
        },
        "& .MuiDialogContent-root": {
          padding: "0px",
        },
        "& .MuiDialogActions-root": {
          padding: "24px 0px",
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        minWidth: "48px",
        minHeight: "48px",
        padding: "8px 16px",
        fontSize: "14px",
        "& .MuiChip-label": {
          padding: "0px",
          // fontWeight: "bold",
        },
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: "14px",
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        padding: "24px 0px",
        margin: 0,
        "& .MuiAccordionSummary-root": {
          padding: "0px",
          minHeight: "0px",
          "& .MuiAccordionSummary-content": {
            margin: "0px",
          },
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: "0px",
        color: "#0E0E10",
        "&.Mui-disabled": {
          backgroundColor: "transparent !important",
          opacity: "0.2",
        },
      },
    },
  },
  MuiImageListItem: {
    styleOverrides: {
      root: {
        borderRadius: "50%",
        aspectRatio: "1",
        filter: "brightness(100%)",
        "-webkit-filter": "brightness(100%)",
        border: "2px solid #FFFFFF",
        "& .MuiImageListItem-img": {
          borderRadius: "50%",
          aspectRatio: "1",
        },
      },
    },
  },
  MuiStep: {
    styleOverrides: {
      root: {
        padding: "0px",
        "& .MuiStepLabel-iconContainer": {
          padding: "0px",
        },
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        "& .MuiTypography-root": {
          fontSize: "14px",
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        //   disabled
        "&.Mui-disabled": {
          backgroundColor: "transparent !important",
          opacity: "0.3",
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
    },
  },
};

export default components;
