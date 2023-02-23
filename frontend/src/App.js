import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/messenger/login" element={<Login />} />
        <Route path="/messenger/register" element={<Register />} />

        {/* <Route
            path="/"
            element={
              <ProtectRoute>
                {" "}
                <Messenger />{" "}
              </ProtectRoute>
            }
          /> */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
