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
    path: "/:device",
    element: <Alimentador />,
  }
]);

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App