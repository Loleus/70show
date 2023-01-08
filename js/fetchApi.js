let fetchSVG = async () => {
  const resp1 = await fetch('../assets/svg/finger.svg');
  const resp2 = await fetch('../assets/svg/title.svg');
  const logo = await resp1.text()
  const title = await resp2.text()
  return [logo, title];
}
let SVGarr = await fetchSVG();
let logo = SVGarr[0]
let title = SVGarr[1]
export {logo, title}