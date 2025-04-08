import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Painel from "./pages/painelPage";
import Alimentador from "./pages/alimentadorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Painel/>,
  },
  {
<<<<<<< HEAD
    path: "/equipamento/alimentador",
    element: <Alimentador/>,
  },
=======
    path: "/:device",
    element: <Alimentador />,
  }
>>>>>>> 9e17e6772ba09b477bda390de1f122a5a8a2fd8f
]);

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App