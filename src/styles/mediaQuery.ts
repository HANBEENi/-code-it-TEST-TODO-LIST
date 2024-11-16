const tabletQuery = () => `@media all and (max-width: 744px)`;
const mobileQuery = () => `@media all and (max-width: 375px)`;

export const media = {
  tablet: tabletQuery,
  mobile: mobileQuery,
};
