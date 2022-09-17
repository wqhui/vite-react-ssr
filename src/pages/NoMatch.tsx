import React from 'react'
import { Link } from 'react-router-dom'

export default function NoMatch() {
  return (
    <div>
      <h2>404 not found</h2>
      <p>
        <Link to="/">Back Home</Link>
      </p>
    </div>
  )
}
