import { FunctionComponent, StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import { StoreProvider } from "./context/store";
import { Header } from "./header";
import { Menu } from "./menu";
import { Footer } from "./footer";
import { Home } from "./home";
import { About } from "./about";
import { NotFound } from "./not-found";
import "./app.scss";

export const App: FunctionComponent = () => {
  return (
    <StrictMode>
      <StoreProvider>
        <BrowserRouter>
          <Header />
          <div id="container">
            <Menu />
            <div id="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </StoreProvider>
    </StrictMode>
  );
};
