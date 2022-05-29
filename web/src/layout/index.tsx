import { Header } from "components";
import React from "react";
import { ILayout } from "./types";

const Layout: React.FC<ILayout> = ({ children, header, footer }) => {
  return (
    <>
      {header && <Header />}
      {children}
    </>
  );
}

export default Layout;