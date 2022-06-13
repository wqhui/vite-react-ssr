const MOCK_HOME_VALUE = [
  {
    id:'1',
    word: 'accordion'
  },
  {
    id:'2',
    word:'agile'
  },
  {
    id:'3',
    word:'arbitrary'
  }
]

const TYPE = 'state/setStoreProp'

export function getHomeData(){
  return {
    payload: {
      key: 'home',
      value: MOCK_HOME_VALUE,  
    },
    type: TYPE
  }
}

const MOACK_ABOUT_DATA  = {
  name:'无一',
  slogan: '人的梦想是不会终结的！'
}

export function getAboutData(){
  return {
    payload:{
      key: 'about',
      value: MOACK_ABOUT_DATA,
    },
    type: TYPE
  }
}