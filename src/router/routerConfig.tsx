import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import Home from '../pages/Home'
import About from '../pages/About'
import NoMatch from '../pages/NoMatch'

export const routes = [
  {
    path: '/',
    element: <RouteNav />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]

function RouteNav() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
