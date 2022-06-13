import React,{ useEffect, useState } from "react";
import { connect } from 'react-redux';

import { getAboutData } from '../store/action'
import { StoreRecord, Dispatch} from '../interface'


function About({
  getData, data
}:{
  getData: () => void
  data?: {[key:string]: any}
}) {
  useEffect(()=>{
    if(!data){
      getData()
    }
  },[])
  return (
    <div>
      <h2>关于</h2>
      <div>
        { data 
          ? <span>姓名: {data.name}  <br/> 一言: {data.slogan}</span>
          : null
        }
      </div>
    </div>
  );
}

About.getInitialProps = () => {
  const data = getAboutData()
  console.log('[server] getHomeData:', data)
  return Promise.resolve(data)
}

const mapStateToProps = (state: StoreRecord) => ({
  data: state.about
});

const mapDispatchToProps = (dispatch:Dispatch) => ({
  getData() {
    const data = getAboutData()
    console.log('[client] getHomeData:', data)
    dispatch(data);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(About);