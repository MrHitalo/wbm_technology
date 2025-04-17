import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { DataProvider } from "./Context/DataContext";

const Painel = lazy(() => import("./pages/painelPage"));
const Alimentador = lazy(() => import("./pages/alimentadorPage"));
const Ar = lazy(() => import("./pages/Ar"));
const ValvulaGaveta = lazy(() => import("./pages/valvulaGavetaPage"));
const ValvulaEsfera = lazy(() => import("./pages/valvulaEsfera"));
const MonitorDeTemperatura = lazy(() => import("./pages/monitorDeTemperatura"));

const router = createBrowserRouter([
  { path: "/", element: <Painel /> },
  { path: "/alimentador", element: <Alimentador /> },
  { path: "/ar", element: <Ar /> },
  { path: "/Gaveta", element: <ValvulaGaveta /> },
  { path: "/Esfera", element: <ValvulaEsfera /> },
  { path: "/monitorTemperatura", element: <MonitorDeTemperatura /> },
]);

function App() {
  return (
    <ErrorBoundary>
      <DataProvider>
        <Suspense fallback={<div>Carregando...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
