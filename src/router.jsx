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

const RoutesApp = () => {
  const auth = useAuthState();
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/categorias/:cat" element={<MenuPage />} />
        <Route path="/producto/:id" element={<ProductPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        {/* AUTHENTICATION AND REGISTER */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
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
      </Route>
    </Routes>
  );
};

const ProtectedAuthRoute = ({ auth, children }) => {
  if (auth?.isVerified && auth?.isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
