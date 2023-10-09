import FontfabricIntroBlack from "/fonts/Fontfabric_-_IntroBlack.otf";
import FontfabricIntroBlackAlt from "/fonts/Fontfabric_-_IntroBlackAlt.otf";
import FontfabricIntroBlackInline from "/fonts/Fontfabric_-_IntroBlackInline.otf";
import FontfabricIntroBlackItalic from "/fonts/Fontfabric_-_IntroBlackItalic.otf";

import FontfabricIntroBold from "/fonts/Fontfabric_-_IntroBold.otf";
import FontfabricIntroBoldItalic from "/fonts/Fontfabric_-_IntroBoldItalic.otf";

import FontfabricIntroCondBlack from "/fonts/Fontfabric_-_IntroCondBlack.otf";
import FontfabricIntroCondBoldAlt from "/fonts/Fontfabric_-_IntroCondBoldAlt.otf";
import FontfabricIntroCondBoldItalic from "/fonts/Fontfabric_-_IntroCondBoldItalic.otf";
import FontfabricIntroCondRegularItalic from "/fonts/Fontfabric_-_IntroCondRegularItalic.otf";
import FontfabricIntroCondSemiBold from "/fonts/Fontfabric_-_IntroCondSemiBold.otf";
import FontfabricIntroCondSemiBold_1 from "/fonts/Fontfabric_-_IntroCondSemiBold_(1).otf";
import FontfabricIntroLight from "/fonts/Fontfabric_-_IntroLight.otf";
import FontfabricIntroLightItalic from "/fonts/Fontfabric_-_IntroLightItalic.otf";
import FontfabricIntroRegular from "/fonts/Fontfabric_-_IntroRegular.otf";
import FontfabricIntroRegularItalic from "/fonts/Fontfabric_-_IntroRegularItalic.otf";
import FontfabricIntroSemiBold from "/fonts/Fontfabric_-_IntroSemiBold.otf";
import FontfabricIntroSemiBoldItalic from "/fonts/Fontfabric_-_IntroSemiBoldItalic.otf";
import FontfabricIntroThin from "/fonts/Fontfabric_-_IntroThin.otf";
// import FontfabricIntroCondBoldCaps from "/fonts/Fontfabric_-_IntroCondBoldCaps.otf";
// import FontfabricIntroCondRegular from "/fonts/Fontfabric_-_IntroCondRegular.otf";
// import FontfabricIntroSemiBoldCaps from "/fonts/Fontfabric_-_IntroSemiBoldCaps.otf";
// import FontfabricIntroSemiBoldCaps_1 from "/fonts/Fontfabric_-_IntroSemiBoldCaps_(1).otf";
// import FontfabricIntroRegularCaps from "/fonts/Fontfabric_-_IntroRegularCaps.otf";
// import FontfabricIntroRegularCaps_1 from "/fonts/Fontfabric_-_IntroRegularCaps_(1).otf";
// import FontfabricIntroBlackInlineCaps from "/fonts/Fontfabric_-_IntroBlackInlineCaps.otf";
// import FontfabricIntroBlackCaps from "/fonts/Fontfabric_-_IntroBlackCaps.otf";
// import FontfabricIntroBoldCaps from "/fonts/Fontfabric_-_IntroBoldCaps.otf";

// GT Walsheim
import GTWalsheimBlack from "/fonts/GT-Walsheim-Black.otf";
import GTWalsheimBlackOblique from "/fonts/GT-Walsheim-Black-Oblique.otf";
import GTWalsheimBold from "/fonts/GT-Walsheim-Bold.otf";
import GTWalsheimBoldOblique from "/fonts/GT-Walsheim-Bold-Oblique.otf";
import GTWalsheimLight from "/fonts/GT-Walsheim-Light.otf";
import GTWalsheimLightOblique from "/fonts/GT-Walsheim-Light-Oblique.otf";
import GTWalsheimMedium from "/fonts/GT-Walsheim-Medium.otf";
import GTWalsheimMediumOblique from "/fonts/GT-Walsheim-Medium-Oblique.otf";
import GTWalsheimRegular from "/fonts/GT-Walsheim-Regular.otf";
import GTWalsheimRegularOblique from "/fonts/GT-Walsheim-Regular-Oblique.otf";
import GTWalsheimThin from "/fonts/GT-Walsheim-Thin.otf";
import GTWalsheimThinOblique from "/fonts/GT-Walsheim-Thin-Oblique.otf";
import GTWalsheimUltraBold from "/fonts/GT-Walsheim-Ultra-Bold.otf";
import GTWalsheimUltraBoldOblique from "/fonts/GT-Walsheim-Ultra-Bold-Oblique.otf";
import GTWalsheimUltraLight from "/fonts/GT-Walsheim-Ultra-Light.otf";
import GTWalsheimUltraLightOblique from "/fonts/GT-Walsheim-Ultra-Light-Oblique.otf";

import IntroBoldCaps from "/fonts/Intro-Bold-Caps.otf";
import IntroBook from "/fonts/Intro-Book.otf";

const MuiCssBaseline = {
  styleOverrides: {
    fallbacks: [
      // Intro
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroThin}) format("opentype")`,
          fontWeight: 200,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroLight}) format("opentype")`,
          fontWeight: 300,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },

      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroRegular}) format("opentype")`,
          fontWeight: 400,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },
      // {
      //   "@font-face": {
      //     fontFamily: "Intro",
      //     src: `url(${FontfabricIntroRegularCaps}) format("opentype")`,
      //     fontWeight: 400,
      //     fontStyle: "normal",
      //     fontStretch: "normal",
      //   },
      // },
      // {
      //   "@font-face": {
      //     fontFamily: "Intro",
      //     src: `url(${FontfabricIntroRegularCaps_1}) format("opentype")`,
      //     fontWeight: 400,
      //     fontStyle: "normal",
      //     testTransform: "uppercase",
      //     fontStretch: "normal",
      //   },
      // },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroRegularItalic}) format("opentype")`,
          fontWeight: 400,
          fontStyle: "italic",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },

      // {
      //   "@font-face": {
      //     fontFamily: "Intror",
      //     src: `url(${FontfabricIntroCondRegular}) format("opentype")`,
      //     fontWeight: 400,
      //     fontStyle: "normal",
      //     fontStretch: "condensed",
      //   },
      // },

      {
        "@font-face": {
          fontFamily: "Intro",
          fontWeight: 600,
          fontStyle: "normal",
          fontStretch: "normal",
          fontDisplay: "swap",
          src: `url(${FontfabricIntroSemiBold}) format("opentype")`,
        },
      },
      // {
      //   "@font-face": {
      //     fontFamily: "Intro",
      //     fontWeight: 600,
      //     fontStyle: "normal",
      //     fontStretch: "normal",
      //     src: `url(${FontfabricIntroSemiBoldCaps}) format("opentype")`,
      //   },
      // },
      // {
      //   "@font-face": {
      //     fontFamily: "Intro",
      //     src: `url(${FontfabricIntroSemiBoldCaps_1}) format("opentype")`,
      //     fontWeight: 600,
      //     fontStyle: "normal",
      //     fontStretch: "normal",
      //   },
      // },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroCondSemiBold}) format("opentype")`,
          fontWeight: 600,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "condensed",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroCondSemiBold_1}) format("opentype")`,
          fontWeight: 600,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "condensed",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroBold}) format("opentype")`,
          fontWeight: 700,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },
      // {
      //   "@font-face": {
      //     fontFamily: "Intro",
      //     src: `url(${FontfabricIntroBoldCaps}) format("opentype")`,
      //     fontWeight: 700,
      //     fontStyle: "normal",
      //     fontStretch: "normal",
      //   },
      // },
      // {
      //   "@font-face": {
      //     fontFamily: "Intro",
      //     src: `url(${FontfabricIntroCondBoldCaps}) format("opentype")`,
      //     fontWeight: 700,
      //     fontStyle: "normal",
      //     fontStretch: "condensed",
      //   },
      // },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroCondBoldAlt}) format("opentype")`,
          fontWeight: 700,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "condensed",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroBlack}) format("opentype")`,
          fontWeight: 900,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroBlackAlt}) format("opentype")`,
          fontWeight: 900,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },
      // {
      //   "@font-face": {
      //     fontFamily: "Intro",
      //     src: `url(${FontfabricIntroBlackCaps}) format("opentype")`,
      //     fontWeight: 900,
      //     fontStyle: "normal",
      //     fontStretch: "normal",
      //   },
      // },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroBlackInline}) format("opentype")`,
          fontWeight: 900,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },
      // {
      //   "@font-face": {
      //     fontFamily: "Intro",
      //     src: `url(${FontfabricIntroBlackInlineCaps}) format("opentype")`,
      //     fontWeight: 900,
      //     fontStyle: "normal",
      //     fontStretch: "normal",
      //   },
      // },

      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroCondBlack}) format("opentype")`,
          fontWeight: 900,
          fontStyle: "normal",
          fontDisplay: "swap",
          fontStretch: "condensed",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroLightItalic}) format("opentype")`,
          fontWeight: 300,
          fontStyle: "italic",
          fontDisplay: "swap",

          fontStretch: "normal",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroCondRegularItalic}) format("opentype")`,
          fontWeight: 400,
          fontStyle: "italic",
          fontDisplay: "swap",
          fontStretch: "condensed",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroSemiBoldItalic}) format("opentype")`,
          fontWeight: 500,
          fontStyle: "italic",
          fontDisplay: "swap",
          fontStretch: "normal",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroBoldItalic}) format("opentype")`,
          fontWeight: 700,
          fontStyle: "italic",
          fontDisplay: "swap",

          fontStretch: "normal",
        },
      },
      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroBlackItalic}) format("opentype")`,
          fontWeight: 900,
          fontStyle: "italic",
          fontDisplay: "swap",

          fontStretch: "normal",
        },
      },

      {
        "@font-face": {
          fontFamily: "Intro",
          src: `url(${FontfabricIntroCondBoldItalic}) format("opentype")`,
          fontWeight: 700,
          fontStyle: "italic",
          fontDisplay: "swap",
          fontStretch: "condensed",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimUltraLight}) format("opentype")`,
          fontWeight: 100,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimUltraLightOblique}) format("opentype")`,
          fontWeight: 100,
          fontStyle: "oblique",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimThin}) format("opentype")`,
          fontWeight: 200,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimThinOblique}) format("opentype")`,
          fontWeight: 200,
          fontStyle: "oblique",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimLight}) format("opentype")`,
          fontWeight: 300,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimLightOblique}) format("opentype")`,
          fontWeight: 300,
          fontStyle: "oblique",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimRegular}) format("opentype")`,
          fontWeight: 400,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimRegularOblique}) format("opentype")`,
          fontWeight: 400,
          fontStyle: "oblique",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimMedium}) format("opentype")`,
          fontWeight: 500,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimMediumOblique}) format("opentype")`,
          fontWeight: 500,
          fontStyle: "oblique",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimBold}) format("opentype")`,
          fontWeight: 700,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimBoldOblique}) format("opentype")`,
          fontWeight: 700,
          fontStyle: "oblique",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimUltraBold}) format("opentype")`,
          fontWeight: 800,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimUltraBoldOblique}) format("opentype")`,
          fontWeight: 800,
          fontStyle: "oblique",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimBlack}) format("opentype")`,
          fontWeight: 900,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "GTWalsheim",
          src: `url(${GTWalsheimBlackOblique}) format("opentype")`,
          fontWeight: 900,
          fontStyle: "oblique",
          fontDisplay: "swap",
        },
      },

      {
        "@font-face": {
          fontFamily: "IntroBoldCaps",
          src: `url(${IntroBoldCaps}) format("opentype")`,
          fontWeight: 600,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
      {
        "@font-face": {
          fontFamily: "IntroBook",
          src: `url(${IntroBook}) format("opentype")`,
          fontWeight: 400,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
    ],
  },
};

export default MuiCssBaseline;
