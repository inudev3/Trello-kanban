import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {};
export const lightTheme: DefaultTheme = {};
export const breakpoints = {
  xs: "480px",
  sm: "600px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};
export const device = {
  xs: `@media screen and (max-width: ${breakpoints.sm})`,
  sm: `@media screen and (min-width: ${breakpoints.sm})`,
  md: `@media screen and (min-width: ${breakpoints.md})`,
  lg: `@media screen and (min-width: ${breakpoints.lg})`,
  xl: `@media screen and (min-width: ${breakpoints.xl})`,
};
