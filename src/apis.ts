// declare module "*.jpg"

interface NewsValue {
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

export interface TNewsApiResponse {
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
  value: NewsValue[]
  author: string
}


export type NewsCategory = string
export type Count = number
