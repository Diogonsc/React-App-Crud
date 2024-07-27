import DrawerAppBar from "./components/DrawerAppBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <ToastContainer />
      <DrawerAppBar />
    </QueryClientProvider>
  );
}
export default App;
