import {
  CLICK_CARD, SELECT_LEVEL, COMPARE_CARD, TIME_OUT
} from './cardTypes'

const initialState = {
  currentCard: null,
  cardCompare: null,
  itemOpen: 0,
  isTimeOut: false,
  time: 120,
  cards: [
    {name: '1', id: 0, src: '../../image/1.jpg'},
    {name: '1', id: 1, src: '../image/1 - Copy.jpg'},
    {name: '2', id: 2, src: '../image/2.jpg'},
    {name: '2', id: 3, src: '../image/2 - Copy.jpg'},
    {name: '3', id: 4, src: '../image/3.jpg'},
    {name: '3', id: 5, src: '../image/3 - Copy.jpg'},
    {name: '4', id: 6, src: '../image/4.jpg'},
    {name: '4', id: 7, src: '../image/4 - Copy.jpg'},
    {name: '5', id: 8, src: '../image/5.jpg'},
    {name: '5', id: 9, src: '../image/5 - Copy.jpg'},
    {name: '6', id: 10, src: '../image/6.jpg'},
    {name: '6', id: 11, src: '../image/6 - Copy.jpg'},
    {name: '7', id: 12, src: '../image/7.jpg'},
    {name: '7', id: 13, src: '../image/7 - Copy.jpg'},
    {name: '8', id: 14, src: '../image/8.jpg'},
    {name: '8', id: 15, src: '../image/8 - Copy.jpg'}
  ],
  level: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_CARD:
      var cards = state.cards
      var currentCard = !state.currentCard ?  action.card : state.currentCard
      var itemOpen = 0

      cards.forEach(el=>{
        if(el.id === action.card.id){
          el.open = true
        }
      })
      cards.forEach(el=>{
        if(el.open == true){
          itemOpen ++
        }
      })
      return {
        ...state,
        cards,
        currentCard,
        itemOpen
      }
      
    case SELECT_LEVEL:
      var time = state.time
      if(action.level === 'normal'){
        time = 60
      }
        return{
          ...state,
          level: action.level,
          time
        }
      case COMPARE_CARD:
        var cards = state.cards

        if( state.itemOpen == 2 && state.currentCard &&  action.cardCompare &&  action.cardCompare.name !== state.currentCard.name){
          
          var currentCard = null
          currentCard = null
          cards.forEach(el=>{
            delete el.open
          })
          return{
            ...state,
            cards,
            currentCard,
            itemOpen: 0
          }
        }else  if(state.itemOpen == 2 && state.currentCard && action.cardCompare && action.cardCompare.name==state.currentCard.name){
          //phần này là match
          // cards = state.cards.filter(el=>{
          //   return el.name !== action.cardCompare.name
          // })
          cards.forEach(el=>{
            if(el.name == action.cardCompare.name){
              el.hide = true
              el.open = false
            }
          })

          currentCard = null
          itemOpen = 0
          return{
            ...state,
            cards,
            currentCard,
            itemOpen
          }
        }
        case TIME_OUT:
          return{
            ...state,
            isTimeOut: true
          }


    default: return state
  }
}



export default reducer
