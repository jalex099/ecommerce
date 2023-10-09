const components = {
  MuiButton: {
    variants: [
      {
        props: { variant: "contained", color: "primary" },
        style: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    ],
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
        gridTemplateColumns: "24px 1fr 24px",
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
  MuiInputBase: {
    styleOverrides: {
      root: {
        backgroundColor: "#F3F3F3",
        borderRadius: "16px",
        border: "none",
        fontSize: "14px",
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
          color: "#614FE0",
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
};

export default components;
