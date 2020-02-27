
import React , {useEffect, Fragment} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clickCard, selectLevel, compareCard, timeOut } from '../redux/card/cardActions'
import '../index.css'
import TimeMer from './timmer'

function ChoseLevel () {
  const dispatch = useDispatch()
  return(
    <div>
      <div>Chọn level</div>
      <div onClick={()=>dispatch(selectLevel('easy'))}>de</div>
      <div>kho</div>
    </div>
  )
}

function MainCard () {
  const state = useSelector(state => state)
  const cards = state.cardState.cards
  const dispatch = useDispatch()
  const itemOpen = state.cardState.itemOpen
  return (
    <div id="wraper-game">
      {
        cards && cards.length>0 && cards.map((el, index)=>{
          var image = "../image/1.jpg"
          return(
            <Fragment>
              {
                el.hide ? 
                <div className= 'flip-box'>
                  ok
                </div>
                :
                <div className= {el.open ? 'flip-box flip-box-open' : 'flip-box'} onClick={()=>{
                  if(!el.open && itemOpen < 2){
                    dispatch(clickCard(el))
                    if(itemOpen == 1){
                      setTimeout(() => {
                        dispatch(compareCard(el))
                      }, 1000);
                    }
                  }
                }}>
                  <div className="flip-box-inner">
                    <div className="flip-box-front">
                      
                      {el.name}
                    </div>
                    <div className="flip-box-back">
                    <img src="../image/1.jpg" ></img>
                    </div>
                  </div>
                </div>
              }
            </Fragment>

            
          )
        })
      }
    </div>
  )
}



function Hook () {
  const state = useSelector(state => state)
  const level = state.cardState.level
  const time = state.cardState.time
  const dispatch = useDispatch()
  if(level=='easy'){
    return (
      <Fragment>
        <TimeMer time={time} timeOut={()=>dispatch(timeOut())}/>
        <MainCard />
      </Fragment>
      
    )
  }
  return(
    <ChoseLevel />
  )

}



export default Hook

