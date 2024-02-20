import React from "react";
import { StyledButton, VARIANTS } from "./ButtonStyles";

export default function Button({ children, clickHandler, display, variant }) {
  return (
    <StyledButton onClick={clickHandler} display={display} $variant={VARIANTS[variant]}>
      {children}
    </StyledButton>
  );
}
