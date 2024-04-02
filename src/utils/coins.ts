export default function getCoins({ cryptoCoins }) {
  const coins = []

  for (let i = 0; i < 100; i++) {
    coins.push({ id: cryptoCoins[i]?.id, name: cryptoCoins[i]?.name })
  }
  console.log(coins)
  return coins
}
