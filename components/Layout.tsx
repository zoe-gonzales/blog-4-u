import React, { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const StyledLayout = styled.div`
  padding: 0 2rem;
`;

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <StyledLayout>{props.children}</StyledLayout>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: #e9eaec;
      }
    `}</style>
  </div>
);

export default Layout;
