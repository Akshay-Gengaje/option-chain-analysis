export function getATMStrikePrice(lastTradedPrice, selectedIndex) {
  if (selectedIndex.instrument_key == "Nifty 50") {
    return Math.round(lastTradedPrice / 50) * 50;
  } else if (selectedIndex.instrument_key == "Nifty Bank") {
    return Math.round(lastTradedPrice / 100) * 100;
  }
}
