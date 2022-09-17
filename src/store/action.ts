import { ActionData } from '../interface'

const MOCK_HOME_VALUE = [
  {
    id: '1',
    word: 'accordion',
  },
  {
    id: '2',
    word: 'agile',
  },
  {
    id: '3',
    word: 'arbitrary',
  },
]

const TYPE = 'state/setStoreProp'

export function getHomeData(): ActionData {
  return {
    payload: {
      key: 'home',
      value: MOCK_HOME_VALUE,
    },
    type: TYPE,
  }
}

const MOACK_ABOUT_DATA = {
  name: 'wuyi',
  slogan: "People's dreams never end!",
}

export function getAboutData(): ActionData {
  return {
    payload: {
      key: 'about',
      value: MOACK_ABOUT_DATA,
    },
    type: TYPE,
  }
}
