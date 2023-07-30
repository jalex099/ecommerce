import { BrowserRouter, Route, Routes } from "react-router-dom";
import DynamicImport from "#/utils/DynamicImport.jsx";
import HomePageSkeleton
  from "#/components/shared/skeletons/HomePageSkeleton.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

const LayoutPage = () => (
  <DynamicImport load={() => import("#/pages/LayoutPage.jsx")}>
    {(Component) => (Component === null ? <p>Loading</p> : <Component />)}
  </DynamicImport>
);

const HomePage = () => (
  <DynamicImport load={() => import("#/pages/HomePage.jsx")}>
    {(Component) => (Component === null ? <HomePageSkeleton/> : <Component />)}
  </DynamicImport>
);

const RoutesApp = () => {
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
