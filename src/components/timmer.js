import React, {Component} from 'react'
import { useSelector, useDispatch } from 'react-redux'
export default class Loading extends Component {
    constructor(props){
        super(props)
        this.state={
            timer: null,
            counter: 5,
            
        }
    }
    componentDidMount() {
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
      }
    componentWillUnmount() {
        this.clearInterval(this.state.timer);
      }

    tick = ()=> {
        this.setState({
          counter: this.state.counter--
        },()=>{
            var {counter} = this.state
            if(counter === 0){
                const {timeOut} = this.props
                timeOut && timeOut()
            }
        });
      }
    render() {
        var counter = this.state.counter
        
        return(

      <div>Loading{"...".substr(0, counter % 3 + 1)}</div>

        )
    }
  }
  