'use client'

import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'
import { i18nConfig } from '../i18n-config'
import AuthLayoutWrapper from 'src/hocs/AuthLayoutWrapper'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import FallbackSpinner from 'src/components/fall-back'

export default function Home() {
  return (
    <AuthLayoutWrapper
      authGuard={false}
      guestGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <FallbackSpinner />
    </AuthLayoutWrapper>
  )
}
