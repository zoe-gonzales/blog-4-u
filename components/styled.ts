import { css } from "styled-components";

// theme colors
const textColor = "#333652";
const accentColor = "#FAD02C";
const backgroundColor = "#E9EAEC";
const accentColorTwo = "#90ADC6";

const buttonStyles = css`
  background: ${accentColor};
  color: ${textColor};
  border: 0;
  border-radius: 40px;
  padding: 1rem 2rem;

  :hover {
    cursor: pointer;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const textAreaStyles = css`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  border: 0.125rem solid rgba(0, 0, 0, 0.2);
`;

const linkStyles = css`
  color: ${textColor};
  text-decoration: underline;
`;

const postStyles = css`
  color: ${textColor};
  background: ${backgroundColor};
  transition: box-shadow 0.1s ease-in;

  :hover {
    background: ${textColor};
    color: ${backgroundColor};
    box-shadow: 1px 1px 3px #aaa;
  }

  & + & {
    margin-top: 2rem;
  }
`;

const pageStyles = css`
  background: ${backgroundColor};
  padding: 2rem;
`;

export {
  buttonStyles,
  textAreaStyles,
  linkStyles,
  postStyles,
  pageStyles,
  textColor,
  backgroundColor,
  accentColorTwo,
};
