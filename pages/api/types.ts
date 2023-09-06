export type planDetails = {
  res: {
    updated_at: string
    states: {
      general: Array<{
        total: number
        description: string
        totalRaw: number
      }>
      top_10: Array<{
        total: number
        description: string
        totalRaw: number
      }>
    }
    cities: {
      general: any
      top_10: Array<{
        total: number
        description: string
        totalRaw: number
      }>
      top_15: Array<{
        total: number
        description: string
        totalRaw: number
      }>
    }
    districts: {
      general: any
      top_10: Array<{
        total: number
        description: string
        totalRaw: number
      }>
      top_15: Array<{
        total: number
        description: string
        totalRaw: number
      }>
    }
    plans: plansType[]
    ages: Array<{
      total: number
      description: string
      totalRaw: number
    }>
    payment_methods: Array<{
      total: number
      description: string
      totalRaw: number
    }>
    genders: Array<{
      total: number
      description: string
      totalRaw: number
    }>
  }
}

export type plansType =
  {
    total: any
    description: string
    ordem_plano: number
    totalRaw: number
  }
