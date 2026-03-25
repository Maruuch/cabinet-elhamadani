import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is a Promise in next-intl v3.17+
  const locale = await requestLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
