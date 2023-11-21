import { BrowserRouter, Route, Routes } from "react-router-dom";
import DynamicImport from "#/utils/DynamicImport.jsx";

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

const RoutesApp = () => {
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/category/:cat" element={<MenuPage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* PROFILE */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/add-address" element={<AddAddressPage />} />
        <Route
          path="/profile/orders-and-messages"
          element={<OrdersAndMessagesPage />}
        />
        <Route path="/profile/register" element={<RegisterPage />} />

        {/* CART */}
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
};
