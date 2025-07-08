// ** Import Next
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hocs/AuthLayoutWrapper'
import { getDetailsProductPublicBySlug, getListRelatedProductBySlug } from 'src/services/product'
import { TProduct } from 'src/types/product'
import { getTextFromHTML } from 'src/utils'

// * views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import DetailsProductPage from 'src/views/pages/product/DetailsProduct'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; productId: string }> }) {
  const { productId } = await params
  const { productData } = await getDetailsProduct(productId)

  const description = getTextFromHTML(productData.description) || 'Mô tả mặc định'
  const keywords = [
    productData.name,
    productData.location,
    'mua bán thú cưng',
    'FastE shop',
    'thú cưng dễ thương',
    'chăm sóc thú cưng',
    'sản phẩm thú cưng'
  ]

  if (!productData || !productData.description) {
    return {
      title: 'FastE - Sản phẩm không tồn tại',
      description: 'Không tìm thấy thông tin sản phẩm'
    }
  }

  return {
    title: `FastE - ${productData.name}`,
    description: description,
    keywords: keywords,
    authors: [{ name: 'FastE-Developer' }],
    viewport: 'initial-scale=1, width=device-width',
    openGraph: {
      type: 'website',
      title: `FastE - ${productData.name}`,
      description: description,
      images: [productData.image],
      url: 'https://faste.vn'
    },
    twitter: {
      card: 'summary_large_image',
      title: `FastE - ${productData.name}`,
      description: description,
      images: [productData.image]
    },
    metadataBase: new URL('https://faste.vn')
  }
}

async function getDetailsProduct(slugId: string) {
  try {
    const [res, resRelated] = await Promise.all([
      getDetailsProductPublicBySlug(slugId, true),
      getListRelatedProductBySlug({ params: { slug: slugId } })
    ])

    const productData = res?.data
    const listRelatedProduct = resRelated?.data?.products

    // if (!productData?._id) {
    //   return {
    //     notFound: true
    //   }
    // }

    return { productData, listRelatedProduct }
  } catch (error) {
    return {
      productData: {},
      listRelatedProduct: []
    }
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string; productId: string }> }) {
  const { productId } = await params
  const { productData, listRelatedProduct } = await getDetailsProduct(productId)
  // const description = getTextFromHTML(productData.description);

  return (
    <AuthLayoutWrapper
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
      guestGuard={false}
      authGuard={false}
    >
      {/* <Head>
        <title>{`FastE - ${productData?.name}`}</title>

        <meta name="description" content={description} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='author' content='FastE-Developer' />
        <meta name='image' content={productData.image} /> */}
      {/* facebook */}
      {/* <meta property='og:type' content='website' />
        <meta property='og:title' content={`FastE - ${productData?.name}`} />

        <meta property="og:description" content={description} />
        <meta property='og:image' content={productData.image} /> */}
      {/* twitter */}
      {/* <meta property='twitter:card' content='website' />
        <meta property='twitter:title' content={`FastE - ${productData?.name}`} />
        <meta
          property="twitter:description"
          content={description}
        />
        <meta property='twitter:image' content={`FastE - ${productData?.name}`} />
      </Head> */}

      <DetailsProductPage productData={productData} productsRelated={listRelatedProduct} />
    </AuthLayoutWrapper>
  )
}

export const dynamic = 'force-dynamic'
export const maxDuration = 300
