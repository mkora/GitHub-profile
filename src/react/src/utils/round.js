/**
 * To avoid problems like,
 *   * Number((1.005).toFixed(2)) returns 1 instead of 1.01
 *   * Math.round(1.005*100)/100; returns 1 instead of 1.01
 */
export default (value, decimals = 2) =>
  Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
