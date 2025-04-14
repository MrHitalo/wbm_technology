import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar"; // ajuste o caminho se precisar

import Painel from "./pages/painelPage";
import Alimentador from "./pages/alimentadorPage";
import Ar from "./pages/Ar";
import ValvulaGaveta from "./pages/valvulaGavetaPage";
import ValvulaEsfera from "./pages/valvulaEsfera";
import MonitorDeTemperatura from "./pages/monitorDeTemperatura";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Painel />,
  },
  {
    path: "/alimentador",
    element: <Alimentador />,
  },
  {
    path: "/ar",
    element: <Ar />,
  },
  {
    path: "/Gaveta",
    element: <ValvulaGaveta />,
  },
  {
    path: "/Esfera",
    element: <ValvulaEsfera />,
  },
  {
    path: "/monitorTemperatura",
    element: <MonitorDeTemperatura />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
