'use client'

// ** React
import { useEffect, useState } from 'react'

// ** Components
import Spinner from 'src/components/spinner'

// ** Mui
import { Box, Grid } from '@mui/material'

// ** Services
import {
  getCountAllRecords,
  getCountOrderStatus,
  getCountProductTypes,
  getCountRevenueYear,
  getCountUserType
} from 'src/services/report'
import { getAllProducts } from 'src/services/product'
import CardCountRecords from './components/CardCountRecords'
import CardProductPopular from './components/CardProductPopular'
import CardProductType from './components/CardProductType'
import CardCountRevenue from './components/CardCountRevenue'
import CardCountOrderStatus from './components/CardCountStatusOrder'
import CardCountUserType from './components/CardCountUserType'
import CardSkeletonCountRecords from './components/CardSkeletonCountRecords'

import 'chart.js/auto'

export interface TCountProductType {
  typeName: string
  total: number
}

export interface TCountRevenue {
  year: string
  month: string
  total: number
}

export interface TProductPopular {
  name: string
  price: string
  image: string
  slug: string
  _id: string
  type: {
    name: string
  }
}

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [countRecords, setCountRecords] = useState<Record<string, number>>({})
  const [countProductTypes, setCountProductTypes] = useState<TCountProductType[]>([])
  const [countRevenues, setCountRevenues] = useState<TCountRevenue[]>([])
  const [countUserType, setCountUserType] = useState<Record<number, number>>({} as any)
  const [countOrderStatus, setCountOrderStatus] = useState<Record<number, number>>({} as any)
  const [listProductPopular, setListProductPopular] = useState<TProductPopular[]>([])

  // ** Fetch API
  const fetchAllCountRecords = async () => {
    setLoading(true)
    await getCountAllRecords()
      .then(res => {
        const data = res?.data
        setLoading(false)
        setCountRecords(data)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const fetchAllProductTypes = async () => {
    setLoading(true)
    await getCountProductTypes()
      .then(res => {
        const data = res?.data
        setLoading(false)
        setCountProductTypes(data)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const fetchAllTotalRevenues = async () => {
    setLoading(true)
    await getCountRevenueYear()
      .then(res => {
        const data = res?.data
        setLoading(false)
        setCountRevenues(data)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const fetchAllCountUserType = async () => {
    setLoading(true)
    await getCountUserType()
      .then(res => {
        const data = res?.data
        setLoading(false)
        setCountUserType(data?.data)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const fetchAllCountStatusOrder = async () => {
    setLoading(true)
    await getCountOrderStatus()
      .then(res => {
        const data = res?.data
        setLoading(false)
        setCountOrderStatus(data?.data)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const fetchListProductPopular = async () => {
    setLoading(true)
    await getAllProducts({ params: { limit: 5, page: 1, order: 'sold desc' } })
      .then(res => {
        const data = res?.data
        setLoading(false)
        setListProductPopular(data?.products)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchAllCountRecords()
    fetchAllProductTypes()
    fetchAllTotalRevenues()
    fetchAllCountUserType()
    fetchAllCountStatusOrder()
    fetchListProductPopular()
  }, [])

  return (
    <Box>
      {loading && <Spinner />}
      {Object.keys(countRecords).length > 0 ? <CardCountRecords data={countRecords} /> : <CardSkeletonCountRecords />}
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <CardProductType data={countProductTypes} />
        </Grid>
        <Grid item md={6} xs={12}>
          <CardCountRevenue data={countRevenues} />
        </Grid>
        <Grid item md={4} xs={12}>
          <CardProductPopular data={listProductPopular} />
        </Grid>
        <Grid item md={4} xs={12}>
          <CardCountOrderStatus data={countOrderStatus} />
        </Grid>
        <Grid item md={4} xs={12}>
          <CardCountUserType data={countUserType} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
