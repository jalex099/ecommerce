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

const CategoriesPage = () => (
  <DynamicImport load={() => import("#/pages/CategoriesPage.jsx")}>
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

const RoutesApp = () => {
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/menu" element={<CategoriesPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/add-address" element={<AddAddressPage />} />
      </Route>
    </Routes>
  );
};
