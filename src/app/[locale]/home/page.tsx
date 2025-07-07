import Head from "next/head";
import { ReactNode } from "react";
import { getAllProductsPublic } from "src/services/product";
import { getAllProductTypes } from "src/services/product-type";
import { TProduct } from "src/types/product";

// ** Layouts
import LayoutNotApp from "src/views/layouts/LayoutNotApp";
import HomePage from "src/views/pages/home";

interface TOptions {
  label: string;
  value: string;
}

interface TProps {
  products: TProduct[];
  totalCount: number;
  productTypes: TOptions[];
  params: {
    limit: number;
    page: number;
    order: string;
    productType: string;
  };
}

export const dynamic = "force-dynamic";

async function getProductData(): Promise<TProps> {
  // CSR
  const limit = 10;
  const page = 1;

  const order = "createdAt desc";

  // SSR
  // const { page = 1, limit = 10 } = context.query
  try {
    const productTypes: TOptions[] = [];

    await getAllProductTypes({ params: { limit: -1, page: -1 } }).then(
      (res) => {
        const data = res?.data.productTypes;
        if (data) {
          data?.map((item: { name: string; _id: string }) => {
            productTypes.push({ label: item.name, value: item._id });
          });
        }
      },
    );
    const res = await getAllProductsPublic({
      params: { limit: limit, page: page, order, productType: "" },
    });

    const data = res?.data;

    return {
      products: data?.products ?? [],
      totalCount: data?.totalCount ?? 0,
      productTypes: productTypes,
      params: {
        limit,
        page,
        order,
        productType: productTypes?.[0]?.value || "",
      },
    };
  } catch (error) {
    return {
      products: [],
      totalCount: 0,
      productTypes: [],
      params: {
        limit,
        page,
        order,
        productType: "",
      },
    };
  }
}

export default async function Home(props: TProps) {
  const { products, totalCount, params, productTypes } = await getProductData();

  return (
    <>
      <Head>
        <title>FastE - Danh Sách Sản Phẩm</title>
        <meta
          name="description"
          content="Khám phá danh sách sản phẩm của FastE, từ thời trang đến điện tử, với nhiều lựa chọn và giá cả hợp lý, giao hàng nhanh chóng."
        />
        <meta
          name="keywords"
          content="sản phẩm, thời trang, điện tử, mua sắm online, FastE"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomePage
        products={products}
        totalCount={totalCount}
        paramsServer={params}
        productTypesServer={productTypes}
      />
    </>
  );
}

Home.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>;
Home.guesGuard = false;
Home.authGuard = false;
Home.title = "Danh sách sản phẩm của cửa hàng FastE";
