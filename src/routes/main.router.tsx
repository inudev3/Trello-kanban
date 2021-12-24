import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MainPage from "./main.page";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default MainRouter;
