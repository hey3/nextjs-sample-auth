import { Fragment, ReactElement } from 'react'
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { RenderPageResult } from 'next/dist/next-server/lib/utils'
import { ServerStyleSheet } from 'styled-components'

class CustomDocument extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
        originalRenderPage({
          enhanceApp: App => (
            props
          ): ReactElement<{
            sheet: ServerStyleSheet
          }> => styledComponentsSheet.collectStyles(<App {...props} />),
        })

      const initialProps = await NextDocument.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <Fragment key="styles">
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
          </Fragment>,
        ],
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }

  render(): ReactElement {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
