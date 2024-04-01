// declare module "*.jpg"

interface INewsValue {
  value: {
    about: {
      name: string
      readLink: string
    }[]
    category: "Business"
    datePublished: Date
    description: string
    image?: {
      contentUrl: string
      thumbnail: {
        contentUrl: string
        width: number
        height: number
      }
    }
    name: string
    provider: {
      _type: string
      name: string
      image?: {
        thumbnail: {
          contentUrl: string
        }
      }
    }[]
    url: string
  }
}

export interface INewsApiResponse {
  _type: string
  queryContext: {
    originalQuery: string
    aduldtIntend: boolean
  }
  readLink: string
  sort: {
    name: string
    id: string
    isSelected: boolean
    url: string
  }[]
  totalEstimatedMatches: number
  value: INewsValue[]
  author: string
}

export interface IExchangesApiResponse {
  country?: string
  description?: string
  has_trading_incentive: boolean
  id: string
  image: string
  name: string
  trade_volume_24h_btc: number
  trade_volume_24h_btc_normalized: number
  trust_score: number
  trust_score_rank: number
  url: string
  years_established?: number
}

export interface IEventsApiResponse {
  date: Date
  date_to?: Date
  description: string
  id: string
  is_conference: boolean
  link: string
  name: string
  proof_image_link?: string
}

export interface IEventCoinsApiResponse {
  id: string
  is_active: boolean
  is_new: boolean
  name: string
  rank: number
  symbol: string
  type: string
}

export interface ICryptosApiResponse {
  "24hVolume": string
  btcPrice: string
  change: string
  coinrankingUrl: string
  color: string
  contractAddresses: string[]
  iconUrl: string
  listedAt: number
  lowVolume: boolean
  marketCap: string
  name: string
  price: string
  rank: number
  sparkline: string[]
  symbol: string
  tier: number
  uuid: string
}

export interface ICryptoDetailsApiResponse {
  "24hVolume": string
  allTimeHight: {
    price: string
    timestamp: number
  }
  btcPrice: string
  change: string
  coinrankingUrl: string
  color: string
  contractAddresses: string[]
  description: string
  fullyDilutedMarketCap: string
  hasContent: boolean
  iconUrl: string
  links: {
    name: string
    url: string
    type: string
  }[]
  listedAt: number
  lowVolume: boolean
  marketCap: string
  name: string
  notices: null
  numberOfExchanges: number
  numberOfMarkets: number
  price: string
  priceAt: number
  rank: number
  sparkline: string[]
  supply: {
    circulating: string
    confirmed: boolean
    max: string
    supplyAt: number
    total: string
  }
  symbol: string
  tags: string[]
  tier: number
  uuid: string
  websiteUrl: string
}

export interface ICryptoHistoryApiResponse {
  status: string
  data: {
    change: string
    history: {
      price: string
      timestamps: number
    }[]
  }
}

export interface ICryptoGlobalStatsApiResponse {
  total: number
  total24hVolume: number
  totalCoins: number
  totalExchanges: number
  totalMarketCap: number
  totalMarkets: number
}

export interface ICryptosFullApiResponse {
  status: string
  data: {
    coins: ICryptosApiResponse[]
    stats: ICryptoGlobalStatsApiResponse
  }
}
