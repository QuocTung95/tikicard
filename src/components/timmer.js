import React, {Component} from 'react'
export default class Loading extends Component {
    constructor(props){
        super(props)
        this.state={
            timer: null,
            counter: this.props.time,
            totaltime: this.props.time
            
        }
    }
    componentDidMount() {
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
      }
    clearTime = () =>{
      clearInterval(this.state.timer)
    }
    tick = ()=> {
        this.setState({
          counter: this.state.counter - 1
        },()=>{
            var {counter} = this.state
            var {count, allPairs} = this.props
            if(count === allPairs){
              this.clearTime()
            }else if(counter === 0){
                const {timeOut} = this.props
                timeOut && timeOut()
            }
        });
      }
    render() {
        var counter = this.state.counter
        var totaltime = this.state.totaltime
        var width = ((counter)/totaltime)*100 
        var color = width > 50 ? 'dodgerblue' :  'yellow' 
        if(width < 25){
            color = 'red'
        }
        return(

      <div className="timmer" style={{width: width + '%', backgroundColor: color}}></div>

        )
    }
  }
  