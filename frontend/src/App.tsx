import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <main className="font-[Nunito] min-h-screen">
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </main>
  );
};

export default App;
