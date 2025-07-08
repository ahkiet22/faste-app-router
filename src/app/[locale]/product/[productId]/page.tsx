// ** Import Next
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hocs/AuthLayoutWrapper'
import { getDetailsProductPublicBySlug, getListRelatedProductBySlug } from 'src/services/product'
import { getTextFromHTML } from 'src/utils'

// * views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import DetailsProductPage from 'src/views/pages/product/DetailsProduct'

type ProductPageProps = {
  params: {
    productId: string
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

    if (!productData?._id) {
      return {
        notFound: true
      }
    }

    return {
      productData: productData,
      listRelatedProduct
    }
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

export const dynamic = 'force-static'
export const revalidate = 10
