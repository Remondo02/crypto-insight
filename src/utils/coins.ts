import { type EventCoinsApiResponse } from "@/apis"

export default function getCoins(cryptoCoins: EventCoinsApiResponse[]) {
  const coins = []

  for (let i = 0; i < 100; i++) {
    coins.push({ id: cryptoCoins[i]?.id, name: cryptoCoins[i]?.name })
  }
  return coins
}
