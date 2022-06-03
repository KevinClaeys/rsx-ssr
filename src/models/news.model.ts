export interface News {
  items: NewsItem[]
}

export interface NewsItem {
  title: string,
  subTitle: string,
  date: string,
  content?: string
}
