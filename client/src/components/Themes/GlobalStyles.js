import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  & .ui.segment.menu {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  & .ui.large.header.menu-title {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  & .ui.medium.header.course-title {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & .ui.card {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }


  & .ui.sticky {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  `
