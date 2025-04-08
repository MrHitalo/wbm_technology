import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Painel from "./pages/painelPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Painel/>,
  },
]);

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App