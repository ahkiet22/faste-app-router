'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Avatar, Box, Chip, ChipProps, Grid, Typography, styled, useTheme } from '@mui/material'
import { GridColDef, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/product'
import { deleteMultipleProductAsync, deleteProductAsync, getAllProductsAsync } from 'src/stores/product/actions'

// ** Components
import GridDelete from 'src/components/grid-delete'
import GridEdit from 'src/components/grid-edit'
import InputSearch from 'src/components/input-search'
import CustomDataGrid from 'src/components/custom-data-grid'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import CustomPagination from 'src/components/custom-pagination'
import TableHeader from 'src/components/table-header'
import CustomSelect from 'src/components/custom-select'

// ** Others
import toast from 'react-hot-toast'

// import { OBJECT_TYPE_ERROR_PRODUCT } from 'src/configs/error'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** Hooks
import { usePermission } from 'src/hooks/usePermission'

// ** Config
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'
import { OBJECT_STATUS_PRODUCT } from 'src/configs/product'

// ** Services
import { getAllProductTypes } from 'src/services/product-type'

// ** Utils
import { formatNumberToLocal, formatFilter } from 'src/utils'
import { formatDate } from 'src/utils/date'

// import { getCountProductStatus } from 'src/services/report'
import GridCreate from 'src/components/gird-create'
import CreateEditProduct from './components/CreateEditProduct'
import { OBJECT_TYPE_ERROR_PRODUCT } from 'src/configs/error'
import Icon from 'src/components/Icon'

// import CardCountProduct from 'src/views/pages/manage-product/product/component/CardCountProduct'

type TProps = {}

const ActiveUserStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: '#28c76f29',
  color: '#3a843f',
  fontSize: '14px',
  padding: '8px 4px',
  fontWeight: 400
}))

const DeactivateUserStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: '#da251d29',
  color: '#da251d',
  fontSize: '14px',
  padding: '8px 4px',
  fontWeight: 400
}))

const ProductListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t, i18n } = useTranslation()

  // State

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteProduct, setOpenDeleteProduct] = useState({
    open: false,
    id: ''
  })
  const [openDeleteMultipleProduct, setOpenDeleteMultipleProduct] = useState(false)
  const [sortBy, setSortBy] = useState('createdAt desc')
  const [searchBy, setSearchBy] = useState('')

  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0])
  const [page, setPage] = useState(1)
  const [selectedRow, setSelectedRow] = useState<string[]>([])
  const [optionTypes, setOptionTypes] = useState<{ label: string; value: string }[]>([])
  const [typeSelected, setTypeSelected] = useState<string[]>([])
  const [statusSelected, setStatusSelected] = useState<string[]>([])
  const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({})
  const [loading, setLoading] = useState(false)

  // const [countProductStatus, setCountProductStatus] = useState<{
  //   data: Record<number, number>
  //   total: number
  // }>({} as any)

  const CONSTANT_STATUS_PRODUCT = OBJECT_STATUS_PRODUCT()

  const isRendered = useRef<boolean>(false)

  // ** Hooks
  const { VIEW, UPDATE, DELETE, CREATE } = usePermission('MANAGE_PRODUCT.PRODUCT', [
    'CREATE',
    'VIEW',
    'UPDATE',
    'DELETE'
  ])

  /// ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    products,
    isSuccessCreateEdit,
    isErrorCreateEdit,
    isLoading,
    messageErrorCreateEdit,
    isErrorDelete,
    isSuccessDelete,
    messageErrorDelete,
    typeError,
    isSuccessMultipleDelete,
    isErrorMultipleDelete,
    messageErrorMultipleDelete
  } = useSelector((state: RootState) => state.product)

  // ** theme
  const theme = useTheme()

  // fetch api
  const handleGetListProducts = () => {
    const query = {
      params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
    }
    dispatch(getAllProductsAsync(query))
  }

  // handle
  const handleCloseConfirmDeleteProduct = useCallback(() => {
    setOpenDeleteProduct({
      open: false,
      id: ''
    })
  }, [])

  const handleCloseConfirmDeleteMultipleProduct = useCallback(() => {
    setOpenDeleteMultipleProduct(false)
  }, [])

  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0]
    if (sortOption) {
      setSortBy(`${sortOption.field} ${sortOption.sort}`)
    } else {
      setSortBy('createdAt desc')
    }
  }

  const handleCloseCreateEdit = useCallback(() => {
    setOpenCreateEdit({
      open: false,
      id: ''
    })
  }, [])

  const handleDeleteProduct = useCallback(() => {
    dispatch(deleteProductAsync(openDeleteProduct.id))
  }, [openDeleteProduct.id])

  const handleDeleteMultipleProduct = () => {
    dispatch(
      deleteMultipleProductAsync({
        productIds: selectedRow
      })
    )
  }

  const handleAction = useCallback((action: string) => {
    switch (action) {
      case 'delete': {
        setOpenDeleteMultipleProduct(true)
        break
      }
    }
  }, [])

  const handleOnchangePagination = useCallback((page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }, [])

  // ** fetch api
  const fetchAllTypes = async () => {
    setLoading(true)
    await getAllProductTypes({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data.productTypes
        if (data) {
          setOptionTypes(data?.map((item: { name: string; _id: string }) => ({ label: item.name, value: item._id })))
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  // const fetchAllCountProductStatus = async () => {
  //   setLoading(true)
  //   await getCountProductStatus()
  //     .then((res: any) => {
  //       const data = res?.data
  //       setLoading(false)
  //       setCountProductStatus({
  //         data: data?.data,
  //         total: data?.total
  //       })
  //     })
  //     .catch(e => {
  //       setLoading(false)
  //     })
  // }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params

        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            {row.image ? (
              <Avatar src={row.image} sx={{ width: 40, height: 40 }} variant='rounded' />
            ) : (
              <Avatar sx={{ width: 40, height: 40, backgroundColor: 'transparent' }} variant='rounded'>
                <Icon icon='flat-color-icons:image-file' fontSize={50} />
              </Avatar>
            )}
            <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
              {row?.name}
            </Typography>
          </Box>
        )
      }
    },
    {
      field: 'type',
      headerName: t('type'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.type.name}</Typography>
      }
    },
    {
      field: 'price',
      headerName: t('Price'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{formatNumberToLocal(row?.price, { language: i18n.language as 'vi' | 'en' })}</Typography>
      }
    },
    {
      field: 'countInStock',
      headerName: t('Count_in_stock'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.countInStock}</Typography>
      }
    },
    {
      field: 'createdAt',
      headerName: t('Created_date'),
      minWidth: 180,
      maxWidth: 180,
      renderCell: params => {
        const { row } = params

        return <Typography>{formatDate(row?.createdAt, { dateStyle: 'short' })}</Typography>
      }
    },
    {
      field: 'status',
      headerName: t('Status'),
      minWidth: 180,
      maxWidth: 180,
      renderCell: params => {
        const { row } = params

        return (
          <>{row.status ? <ActiveUserStyled label={t('Public')} /> : <DeactivateUserStyled label={t('Private')} />}</>
        )
      }
    },
    {
      field: 'action',
      headerName: t('Actions'),
      minWidth: 150,
      sortable: false,
      align: 'left',
      renderCell: params => {
        return (
          <>
            <GridEdit
              disabled={!UPDATE}
              onClick={() =>
                setOpenCreateEdit({
                  open: true,
                  id: String(params.id)
                })
              }
            />
            <GridDelete
              disabled={!DELETE}
              onClick={() =>
                setOpenDeleteProduct({
                  open: true,
                  id: String(params.id)
                })
              }
            />
          </>
        )
      }
    }
  ]
  const PaginationComponent = memo(() => {
    return (
      <CustomPagination
        onChangePagination={handleOnchangePagination}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        pageSize={pageSize}
        page={page}
        rowLength={products.total}
      />
    )
  })

  useEffect(() => {
    if (isRendered.current) {
      setFilterBy({ productType: typeSelected, status: statusSelected })
    }
  }, [typeSelected, statusSelected])

  useEffect(() => {
    fetchAllTypes()

    // fetchAllCountProductStatus()
    isRendered.current = true
  }, [])

  useEffect(() => {
    if (isRendered.current) {
      handleGetListProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize, filterBy])

  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (!openCreateEdit.id) {
        toast.success(t('Create_product_success'))
      } else {
        toast.success(t('Update_product_success'))
      }
      handleGetListProducts()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_PRODUCT[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        if (openCreateEdit.id) {
          toast.error(t('Update_product_error'))
        } else {
          toast.error(t('Create_product_error'))
        }
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit, typeError])

  useEffect(() => {
    if (isSuccessMultipleDelete) {
      toast.success(t('Delete_multiple_product_success'))
      handleGetListProducts()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteMultipleProduct()
      setSelectedRow([])
    } else if (isErrorMultipleDelete && messageErrorMultipleDelete) {
      toast.error(t('Delete_multiple_product_error'))
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMultipleDelete, isErrorMultipleDelete, messageErrorMultipleDelete])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('Delete_product_success'))
      handleGetListProducts()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteProduct()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t('Delete_product_error'))
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  const dataListProductStatus = [
    {
      icon: 'la:product-hunt',
      status: '2'
    },
    {
      icon: 'material-symbols-light:public-off',
      status: '0'
    },
    {
      status: '1',
      icon: 'material-symbols-light:public'
    }
  ]

  return (
    <>
      {loading && <Spinner />}
      <ConfirmationDialog
        open={openDeleteProduct.open}
        handleClose={handleCloseConfirmDeleteProduct}
        handleCancel={handleCloseConfirmDeleteProduct}
        handleConfirm={handleDeleteProduct}
        title={t('Title_delete_product')}
        description={t('Confirm_delete_product')}
      />
      <ConfirmationDialog
        open={openDeleteMultipleProduct}
        handleClose={handleCloseConfirmDeleteMultipleProduct}
        handleCancel={handleCloseConfirmDeleteMultipleProduct}
        handleConfirm={handleDeleteMultipleProduct}
        title={t('Title_delete_multiple_product')}
        description={t('Confirm_delete_multiple_product')}
      />
      <CreateEditProduct
        open={openCreateEdit.open}
        onClose={handleCloseCreateEdit}
        idProduct={openCreateEdit.id}
        optionTypes={optionTypes}
      />
      {isLoading && <Spinner />}

      {/* <Box sx={{ backgroundColor: 'inherit', width: '100%', mb: 4 }}>
        <Grid container spacing={6} sx={{ height: '100%' }}>
          {dataListProductStatus?.map((item: any, index: number) => {
            return (
              <Grid item xs={12} md={4} sm={6} key={index}>
                <CardCountProduct {...item} countProductStatus={countProductStatus} />
              </Grid>
            )
          })}
        </Grid>
      </Box> */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          {!selectedRow?.length && (
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, mb: 4, width: '100%' }}
            >
              <Box sx={{ width: '200px' }}>
                <CustomSelect
                  fullWidth
                  onChange={e => {
                    setTypeSelected(e.target.value as string[])
                  }}
                  multiple
                  options={optionTypes}
                  value={typeSelected}
                  placeholder={t('Type_product')}
                />
              </Box>
              <Box sx={{ width: '200px' }}>
                <CustomSelect
                  fullWidth
                  onChange={e => {
                    setStatusSelected(e.target.value as string[])
                  }}
                  multiple
                  options={Object.values(CONSTANT_STATUS_PRODUCT)}
                  value={statusSelected}
                  placeholder={t('Status')}
                />
              </Box>
              <Box sx={{ width: '200px' }}>
                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
              </Box>
              <GridCreate
                disabled={!CREATE}
                onClick={() => {
                  setOpenCreateEdit({
                    open: true,
                    id: ''
                  })
                }}
              />
            </Box>
          )}
          {selectedRow?.length > 0 && (
            <TableHeader
              numRow={selectedRow?.length}
              onClear={() => setSelectedRow([])}
              handleAction={handleAction}
              actions={[{ label: t('Xóa'), value: 'delete', disabled: !DELETE }]}
            />
          )}
          <CustomDataGrid
            rows={products.data}
            columns={columns}
            autoHeight
            sx={{
              '.row-selected': {
                backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                color: `${theme.palette.primary.main} !important`
              }
            }}
            checkboxSelection
            sortingOrder={['desc', 'asc']}
            sortingMode='server'
            onSortModelChange={handleSort}
            getRowId={row => row._id}
            disableRowSelectionOnClick
            slots={{
              pagination: PaginationComponent
            }}
            rowSelectionModel={selectedRow}
            onRowSelectionModelChange={(row: GridRowSelectionModel) => {
              setSelectedRow(row as string[])
            }}
            disableColumnFilter
          />
        </Grid>
      </Box>
    </>
  )
}

export default ProductListPage
