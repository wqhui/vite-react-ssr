import { useRoutes } from 'react-router-dom'

import { routes } from './routerConfig'

export default function RoutesContent() {
  return useRoutes(routes)
}
