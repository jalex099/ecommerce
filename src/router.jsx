import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DynamicImport from "#/utils/DynamicImport.jsx";
import { useAuthState } from "#/stores/AuthState";

export default function Router() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

const LayoutPage = () => (
  <DynamicImport load={() => import("#/pages/LayoutPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const FeedPage = () => (
  <DynamicImport load={() => import("#/pages/FeedPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const MenuPage = () => (
  <DynamicImport load={() => import("#/pages/MenuPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const ProductPage = () => (
  <DynamicImport load={() => import("#/pages/ProductPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const ProfilePage = () => (
  <DynamicImport load={() => import("#/pages/ProfilePage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const AddAddressPage = () => (
  <DynamicImport load={() => import("#/pages/AddAddressPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const OrdersAndMessagesPage = () => (
  <DynamicImport load={() => import("#/pages/OrdersAndMessagesPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const RegisterPage = () => (
  <DynamicImport load={() => import("#/pages/RegisterPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const ForgotPasswordPage = () => (
  <DynamicImport load={() => import("#/pages/ForgotPasswordPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const CartPage = () => (
  <DynamicImport load={() => import("#/pages/CartPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const LoginPage = () => (
  <DynamicImport load={() => import("#/pages/LoginPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const CheckoutPage = () => (
  <DynamicImport load={() => import("#/pages/CheckoutPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const DeliveryPage = () => (
  <DynamicImport load={() => import("#/pages/DeliveryPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const DateAndTimePage = () => (
  <DynamicImport load={() => import("#/pages/DateAndTimePage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const OrderTrackingPage = () => (
  <DynamicImport load={() => import("#/pages/OrderTrackingPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const SettingsPage = () => (
  <DynamicImport load={() => import("#/pages/SettingsPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const SettingsActionsPage = () => (
  <DynamicImport load={() => import("#/pages/SettingsActionsPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);

const NotFoundPage = () => (
  <DynamicImport load={() => import("#/pages/NotFoundPage.jsx")}>
    {(Component) => (Component === null ? <></> : <Component />)}
  </DynamicImport>
);


const RoutesApp = () => {
  const auth = useAuthState();
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/categorias/:cat" element={<MenuPage />} />
        <Route path="/producto/:id" element={<ProductPage />} />
        <Route path="/metodo-de-entrega" element={<DeliveryPage />} />
        <Route path="/fecha-y-hora" element={<DateAndTimePage />} />
        {/* AUTHENTICATION AND REGISTER */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/olvide-mi-contrasena" element={<ForgotPasswordPage />} />
        {/* PROFILE */}
        <Route
          path="/perfil"
          element={
            <ProtectedAuthRoute auth={auth}>
              <ProfilePage />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="/perfil/agregar-direccion"
          element={
            <ProtectedAuthRoute auth={auth}>
              <AddAddressPage />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="/perfil/ordenes-y-mensajes"
          element={
            <ProtectedAuthRoute auth={auth}>
              <OrdersAndMessagesPage />
            </ProtectedAuthRoute>
          }
        />

        {/* CART */}
        <Route path="/carrito" element={<CartPage />} />
        {/* CHECKOUT */}
        <Route path="/pago" element={<CheckoutPage />} />
        {/* ORDER CONFIRMATION */}
        <Route
          path="/rastreo-de-orden/:id"
          element={<OrderTrackingPage />}
        />
        {/* SETTINGS */}
        <Route path={"/ajustes/:section"} element={
          <ProtectedAuthRoute auth={auth}>
            <SettingsActionsPage />
          </ProtectedAuthRoute>}
        />
        <Route
          path="/ajustes"
          element={
            <ProtectedAuthRoute auth={auth}>
              <SettingsPage />
            </ProtectedAuthRoute>
          } />
      </Route>
      <Route path="/404" element={<NotFoundPage/>} />
      <Route path={"*"} element={<Navigate to="/404" />} />
    </Routes>
  );
};

const ProtectedAuthRoute = ({ auth, children }) => {
  if (auth?.isVerified && auth?.isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
