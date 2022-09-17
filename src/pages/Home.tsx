import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getHomeData } from '../store/action'
import { StoreRecord, Dispatch } from '../interface'

function Home({ getData, data }: { getData: () => void; data?: any[] }) {
  useEffect(() => {
    if (!data) {
      getData()
    }
  }, [])
  return (
    <div>
      <h2>Home</h2>
      <div>
        {data ? (
          <span>
            Word List:{' '}
            {data.map((item) => (
              <span key={item.id}>{item.word} </span>
            ))}
          </span>
        ) : null}
      </div>
    </div>
  )
}

Home.getInitialProps = () => {
  const data = getHomeData()
  console.log('[server] getHomeData:', data)
  return Promise.resolve(data)
}

const mapStateToProps = (state: StoreRecord) => {
  return {
    data: state.home,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData() {
    const data = getHomeData()
    console.log('[client] getHomeData:', data)
    dispatch(data)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
