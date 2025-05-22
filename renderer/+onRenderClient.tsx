//renderer/+onRenderClient.tsx
// https://vike.dev/onRenderClient
export { onRenderClient }
import ReactDOM from 'react-dom/client'
import { Layout } from './Layout'
import { getPageTitle } from './getPageTitle'
import type { OnRenderClientAsync } from 'vike/types'

let root: ReactDOM.Root
const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  const { Page } = pageContext

  // This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
  // to support 
  const { urlParsed ,baseUrl,apiUrl,serverUrl} = pageContext

  if (!Page) throw new Error('My onRenderClient() hook expects pageContext.Page to be defined')

  const container = document.getElementById('root')
  if (!container) throw new Error('DOM element #root not found')

  //  console.log(' pageContext.apiUrl',  pageContext.apiUrl);
  //  console.log(' pageContext.serverUrl',  pageContext.serverUrl);
   console.log(' pageContext.baseUrl',  pageContext.baseUrl);
   
  const page = (
        <Layout pageContext={pageContext}>
          <Page />
        </Layout>
  )
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  }
  document.title = getPageTitle(pageContext)
}