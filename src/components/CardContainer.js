
import React , {Fragment} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clickCard, selectLevel, compareCard, timeOut, playAgain } from '../redux/card/cardActions'
import '../index.css'
import TimeMer from './timmer'

function ChoseLevel () {
  const dispatch = useDispatch()
  return(
    <div className="wapper-choose-level">
        <img alt="img" src={require('../image/chose-level.jpg')}></img>
        <div className="choose-level">
          <div className="label"> <span>Chọn</span> level</div>
          <button onClick={()=>dispatch(selectLevel('easy'))}>Dễ</button>
          <button onClick={()=>dispatch(selectLevel('normal'))}>Trung bình</button>
          <button onClick={()=>dispatch(selectLevel('hard'))}>Khó</button>
        </div>
      
    </div>
  )
}

function MainCard () {
  const state = useSelector(state => state)
  const cards = state.cardState.cards
  const dispatch = useDispatch()
  const itemOpen = state.cardState.itemOpen
  const level = state.cardState.level
  const isTimeOut = state.cardState.isTimeOut
  var opacityClass = isTimeOut ? 'time-out-gr' : ''
  var classHard = level === 'hard' ? 'level-hard' : ''
  return (
    <div id="wraper-game" className={opacityClass}>
      {
        cards && cards.length>0 && cards.map((el, index)=>{
          var image = require('../image/'+el.name)
          return(
            <div key={index}>
              {
                el.hide ? 
                <div className= {'flip-box ' + classHard} >
                  <img alt="img" src={image} ></img>
                </div>
                :
                <div className= {el.open ? 'flip-box flip-box-open ' + classHard : 'flip-box ' + classHard} onClick={()=>{
                  if(!el.open && itemOpen < 2){
                    dispatch(clickCard(el))
                    if(itemOpen === 1){
                      setTimeout(() => {
                        dispatch(compareCard(el))
                      }, 1000);
                    }
                  }
                }}>
                  <div className="flip-box-inner">
                    <div className="flip-box-front">
                      
                    <img alt="img" src={require('../image/vAdEN_1566642048.png')} ></img>
                    </div>
                    <div className="flip-box-back">
                    <img alt="img" src={image} ></img>
                    </div>
                  </div>
                </div>
              }
            </div>

            
          )
        })
      }
    </div>
  )
}



function Hook () {
  const state = useSelector(state => state)
  const isTimeOut = state.cardState.isTimeOut
  const count = state.cardState.count
  const allPairs = state.cardState.allPairs
  const time = state.cardState.time
  const isStart = state.cardState.isStart
  const dispatch = useDispatch()
  if(isStart){
    return (
      <Fragment>
        <TimeMer count={count} allPairs={allPairs} time={time} timeOut={()=>dispatch(timeOut())} />
        {
          isTimeOut &&
          <div className="time-out">
            <div className="content">
              <img alt="img" src={require('../image/unnamed.jpg')}></img>
              <button onClick={()=>dispatch(playAgain())} className="play-again">Play again</button>
            </div>
          </div>
        }
        {
          count === allPairs &&
          <div className="time-out">
            <div className="content">
              <img alt="img" src={require('../image/05895f2cc32d4af1a14e51e94e5d0730.jpg')}></img>
              <button onClick={()=>dispatch(playAgain())} className="play-again">Play again</button>
            </div>
          </div>
        }
        <MainCard />
      </Fragment>
      
    )
  }
  return(
    <ChoseLevel />
  )

}



export default Hook

