"use client";

// ** Next
import { useRouter, useSearchParams } from "next/navigation";

// ** React
import { useEffect, useState } from "react";

// ** Mui
import { Box, Button, Card, Typography, useTheme } from "@mui/material";

// ** Components
import Icon from "src/components/Icon";
import Spinner from "src/components/spinner";

// ** Orther
import { ROUTE_CONFIG } from "src/configs/route";
import { getVNPayIpnPayment } from "src/services/payment";
import { useTranslation } from "react-i18next";
import { formatNumberToLocal } from "src/utils";

const PaymentVNPay = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const vnp_SecureHash = searchParams.get("vnp_SecureHash");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");

  const rests: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    if (
      key !== "vnp_SecureHash" &&
      key !== "vnp_ResponseCode" &&
      key !== "vnp_TxnRef"
    ) {
      rests[key] = value;
    }
  }

  // ** State
  const [dataPayment, setDataPayment] = useState({
    status: "",
    totalPrice: 0,
  });

  const fetchGetIpnVNPay = async (param: any) => {
    await getVNPayIpnPayment({
      params: {
        ...param,
      },
    }).then((res) => {
      const data = res?.data;
      if (data) {
        setDataPayment({
          status: data.RspCode,
          totalPrice: data.totalPrice,
        });
      }
    });
  };

  useEffect(() => {
    if (vnp_SecureHash && vnp_ResponseCode && vnp_TxnRef) {
      fetchGetIpnVNPay({
        vnp_ResponseCode,
        vnp_SecureHash,
        orderId: vnp_TxnRef,
        vnp_TxnRef,
        ...rests,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vnp_SecureHash, vnp_ResponseCode, vnp_TxnRef]);

  return (
    <>
      {!dataPayment.status && <Spinner />}
      <Card sx={{ padding: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: "26px",
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            {formatNumberToLocal(dataPayment?.totalPrice, {
              language: i18n.language as "vi" | "en",
            })}
          </Typography>
        </Box>
        {dataPayment.status && (
          <>
            {dataPayment.status === "00" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Icon
                    icon="ep:success-filled"
                    fontSize={80}
                    color={theme.palette.success.main}
                  />
                </Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
                  {t("Payment_success")}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Icon
                    icon="ep:warning"
                    fontSize={80}
                    color={theme.palette.warning.main}
                  />
                </Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
                  {t("Payment_error")}
                </Typography>
              </Box>
            )}
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            onClick={() => router.push(ROUTE_CONFIG.HOME)}
          >
            {t("Back_home")}
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default PaymentVNPay;
