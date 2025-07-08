"use client";

// ** React Imports
import { createContext, useState, ReactNode, useEffect } from "react";

// ** Next Import
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// ** Helpers
import instanceAxios from "src/helpers/axios";

// ** Config
import authConfig, { LIST_PAGE_PUBLIC } from "src/configs/auth";
import { API_ENDPOINT } from "src/configs/api";

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  LoginGoogleParams,
  LoginFacebookParams,
} from "./types";

// ** services
import {
  loginAuth,
  loginAuthFacebook,
  loginAuthGoogle,
  logoutAuth,
} from "src/services/auth";

// ** Helper
import {
  clearLocalUserData,
  setLocalUserData,
  setTemporaryToken,
} from "src/helpers/storage/index";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ROUTE_CONFIG } from "src/configs/route";
import { updateProductToCart } from "src/stores/order-product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/stores";
import { createUrlQuery } from "src/utils";
import { i18nConfig } from "src/app/i18n-config";
import { signOut } from "next-auth/react";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  loginGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loginFacebook: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Translate
  const { t, i18n } = useTranslation();

  // ** Hooks
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentLang = i18n.language;

  // ** Redux
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName,
      );
      if (storedToken) {
        setLoading(true);
        await instanceAxios
          .get(API_ENDPOINT.AUTH.AUTH_ME)
          .then(async (response) => {
            setLoading(false);
            setUser({ ...response.data.data });
          })
          .catch(() => {
            clearLocalUserData();
            setUser(null);
            setLoading(false);
            if (!pathName.includes("login")) {
              router.replace("/login");
            }
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType,
  ) => {
    loginAuth({
      email: params.email,
      password: params.password,
      deviceToken: params?.deviceToken,
    })
      .then(async (response) => {
        if (params.rememberMe) {
          setLocalUserData(
            JSON.stringify(response.data.user),
            response.data.access_token,
            response.data.refresh_token,
          );
        } else {
          setTemporaryToken(response.data.access_token);
        }
        toast.success(t("Login_success"));
        const returnUrl = searchParams.get("returnUrl");
        setUser({ ...response.data.user });
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL as string);
      })

      .catch((err: any) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLoginGoogle = (
    params: LoginGoogleParams,
    errorCallback?: ErrCallbackType,
  ) => {
    loginAuthGoogle({
      idToken: params.idToken,
      deviceToken: params.deviceToken,
    })
      .then(async (response) => {
        if (params.rememberMe) {
          setLocalUserData(
            JSON.stringify(response.data.user),
            response.data.access_token,
            response.data.refresh_token,
          );
        } else {
          setTemporaryToken(response.data.access_token);
        }

        toast.success(t("Login_success"));

        const returnUrl = searchParams.get("returnUrl");
        setUser({ ...response.data.user });
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL as string);
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLoginFacebook = (
    params: LoginFacebookParams,
    errorCallback?: ErrCallbackType,
  ) => {
    loginAuthFacebook({
      idToken: params.idToken,
      deviceToken: params.deviceToken,
    })
      .then(async (response) => {
        if (params.rememberMe) {
          setLocalUserData(
            JSON.stringify(response.data.user),
            response.data.access_token,
            response.data.refresh_token,
          );
        } else {
          setTemporaryToken(response.data.access_token);
        }

        toast.success(t("Login_success"));

        const returnUrl = searchParams.get("returnUrl");
        setUser({ ...response.data.user });
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

        router.replace(redirectURL as string);
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    logoutAuth().then((res) => {
      setUser(null);
      clearLocalUserData();
      signOut()

      if (
        !LIST_PAGE_PUBLIC?.some((item) =>
          pathName?.startsWith(
            currentLang === i18nConfig.defaultLocale
              ? item
              : `/${currentLang}/${item}`,
          ),
        )
      ) {
        if (pathName !== "/") {
          router.replace(
            ROUTE_CONFIG.LOGIN + "?" + createUrlQuery("returnUrl", pathName),
          );
        } else {
          router.replace(ROUTE_CONFIG.LOGIN);
        }
      }
      dispatch(
        updateProductToCart({
          orderItems: [],
        }),
      );
    });
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    loginGoogle: handleLoginGoogle,
    loginFacebook: handleLoginFacebook,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
