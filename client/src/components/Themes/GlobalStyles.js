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
    box-shadow: 2px -2px
   
  }
  & .ui.large.header.menu-title {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  & .ui.medium.header.course-title {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & .ui.card>.content {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }


  & div.ui.segment.cart {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    box-shadow
  }

  & div.cart.body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & ol.ui.list li:before {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & div.ui.medium.dividing.header {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & div.ui.small.header {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & li::before {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
}
  `
