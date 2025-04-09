import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Painel from "./pages/painelPage";
import Alimentador from "./pages/alimentadorPage";
import Ar from "./pages/Ar";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
