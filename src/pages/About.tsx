import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAboutData } from '../store/action'
import { StoreRecord, Dispatch } from '../interface'

function About({
  getData,
  data,
}: {
  getData: () => void
  data?: { [key: string]: any }
}) {
  useEffect(() => {
    if (!data) {
      getData()
    }
  }, [])
  return (
    <div>
      <h2>About</h2>
      <div>
        {data ? (
          <span>
            Name: {data.name} <br /> Slogan: {data.slogan}
          </span>
        ) : null}
      </div>
    </div>
  )
}

About.getInitialProps = () => {
  const data = getAboutData()
  console.log('[server] getAboutData:', data)
  return Promise.resolve(data)
}

const mapStateToProps = (state: StoreRecord) => ({
  data: state.about,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData() {
    const data = getAboutData()
    console.log('[client] getAboutData:', data)
    dispatch(data)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
