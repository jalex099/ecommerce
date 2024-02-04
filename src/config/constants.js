// export const API_URL = "http://localhost:3001/apitest";
export const API_URL = "https://ws-ecommerce.onrender.com/apitest";

export const OAUTH_API_CLIENT_ID =
  "394101880841-slcv06f3d8s3v9fspicvdnqnp26hs95r.apps.googleusercontent.com";

export const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoianZycm1ybHMiLCJhIjoiY2xucnpyOHhmMDNkaDJyazR1c2lteXdiNCJ9.1ilke9VVwHOQX15P3OzuVg";
export const MAPBOX_ZOOM = 16;

export const THEMES = {
  LIGHT: "viva-light",
  DARK: "viva-dark",
};

export const ENCRYPT_KEY = "aLeART";

export const DEFAULT_THEME = "LIGHT";

export const IMAGES_TYPES = {
  BANNER: "BNR",
  PRODUCT: "PRD",
};

export const SUPPORT_EMAIL = "javiermoralesmelara@gmail.com";

export const FADE_ANIMATION = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
  exit: { opacity: 0, scale: 0.85 },
};

export const SLIDE_UP_ANIMATION = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
};

export const CURRENCY = "USD";
export const LANGUAGE = "es-SV";

export const SEARCH_PLACEHOLDER = "Buscar...";

export const COMPANY = "Ale Art";

export const PHONE_REGEX = /^\([0-9]{3}\)\s[0-9]{4}-[0-9]{4}$/;

export const DEFAULT_DAYS_TO_DELIVER = 5;
export const MIN_TIME_HOUR = "08:00";
export const MAX_TIME_HOUR = "18:00";

export const BOTTOM_BAR_HIDDEN_PATHS = [
  "/perfil/agregar-direccion",
  "/producto/",
  "/carrito",
  "/pago",
  "/metodo-de-entrega",
  "/fecha-y-hora",
  "/confirmacion-de-orden",
];

export const CHECKOUT_STEPS = {
  ADDRESS: 0,
  PAYMENT: 1,
  REVIEW: 2,
};

export const DELIVERY_METHODS = [
  {
    label: "Delivery",
    value: 0,
    description: "Recibe tu pedido en la puerta de tu casa",
  },
  {
    label: "Pickup",
    value: 1,
    description: "Recoge tu pedido en la tienda",
  },
  {
    label: "Meetup",
    value: 2,
    description: "Encuentro en un lugar público",
  },
];

export const PAYMENT_METHODS = [
  { label: "Efectivo", value: 0, code: "CASH" },
  // { label: "Tarjeta", value: 1, code: "CARD" },
  { label: "Transferencia Bancaria", value: 2, code: "TRANSFER" },
];

export const PAGES = {
  feed: {
    title: "Feed",
    desc: `Pagina de inicio en ${COMPANY}`,
  },
  menu: {
    title: "Menú",
    desc: `Pagina de menú en ${COMPANY}`,
  },
  profile: {
    title: "Perfil",
    desc: `Pagina de perfil en ${COMPANY}`,
  },
  login: {
    title: "Iniciar Sesión",
    desc: `Pagina de inicio de sesión en ${COMPANY}`,
  },
  addAddress: {
    title: "Agregar Dirección",
    desc: `Pagina de agregar dirección en ${COMPANY}`,
  },
  ordersAndMessages: {
    title: "Pedidos y Mensajes",
    desc: `Pagina de pedidos y mensajes en ${COMPANY}`,
  },
  register: {
    title: "Registro",
    desc: `Pagina de registro en ${COMPANY}`,
  },
  dateAndTime: {
    title: "Fecha y Hora",
    desc: `Pagina de fecha y hora en ${COMPANY}`,
  },
  orderConfirmation: {
    title: "Confirmación de Orden",
    desc: `Pagina de confirmación de orden en ${COMPANY}`,
  },
  cart: {
    title: "Carrito",
    desc: `Pagina de carrito en ${COMPANY}`,
  },
  products: {
    title: "Productos",
    desc: `Pagina de productos de ${COMPANY}`,
  },
  product: {
    title: "Producto",
    desc: `Pagina de producto de ${COMPANY}`,
  },
  loading: {
    title: "Cargando",
    desc: `Pagina de carga de ${COMPANY}`,
  },
  checkout: {
    title: "Pago",
    desc: `Pagina de pago de ${COMPANY}`,
  },
  delivery: {
    title: "Método de Entrega",
    desc: `Pagina de método de entrega de ${COMPANY}`,
  },
  signup: {
    title: "Registro",
    desc: `Pagina de registro de ${COMPANY}`,
  },
  signup_checkout: {
    title: "Registro",
    desc: `Pagina de registro en compra de ${COMPANY}`,
  },
  coupons: {
    title: "Cupones y Gift Cards",
    desc: `Pagina de cupones de ${COMPANY}`,
  },
  favorites: {
    title: "Favoritos",
    desc: `Pagina de favoritos de ${COMPANY}`,
  },
  password_recovery: {
    title: "Recuperar Contraseña",
    desc: `Pagina de recuperación de contraseña de ${COMPANY}`,
  },
  fullscreen_tracking: {
    title: "Rastreo",
    desc: `Pagina de rastreo en pantalla completa de ${COMPANY}`,
  },
  last_order_tracking: {
    title: "Rastreo Última Orden",
    desc: `Pagina de rastreo de última orden de ${COMPANY}`,
  },
  activate_certificate: {
    title: "Activar Certificado",
    desc: `Pagina de activación de certificado de ${COMPANY}`,
  },
  certificate_detail: {
    title: "Detalle Certificado",
    desc: `Pagina de detalle de certificado de ${COMPANY}`,
  },
  certificate_cart: {
    title: "Carrito Certificado",
    desc: `Pagina de carrito de certificado de ${COMPANY}`,
  },
  certificates_checkout: {
    title: "Checkout Certificado",
    desc: `Pagina de checkout de certificado de ${COMPANY}`,
  },
  orders: {
    title: "Pedidos recientes",
    desc: `Pagina de pedidos recientes de ${COMPANY}`,
  },
  locations: {
    title: "Direcciones",
    desc: `Pagina de direcciones de usuario de ${COMPANY}`,
  },
  personal: {
    title: "Datos Personales",
    desc: `Pagina de datos personales de usuario de ${COMPANY}`,
  },
  change_password: {
    title: "Cambiar Contraseña",
    desc: `Pagina de cambio de contraseña de usuario de ${COMPANY}`,
  },
  delete_account: {
    title: "Eliminar Cuenta",
    desc: `Pagina de eliminación de cuenta de usuario de ${COMPANY}`,
  },
};
