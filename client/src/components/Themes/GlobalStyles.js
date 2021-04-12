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
    border: 1px solid lightgrey
   
  }
  & .ui.large.header.menu-title {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  & .ui.medium.header.course-title {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  & div.ui.segment.cart {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid lightgrey
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

& label.login-email-label {
  color: ${({ theme }) => theme.text};
  transition all .50s linear;
}

& label.user-first-label {
  color: ${({ theme }) => theme.text};
  transition all .50s linear;
}
  `
