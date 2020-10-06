import { stat } from 'fs';
// import React, { Component } from 'react'

// export  const Timer = (props: any) =>  {
//     const [seconds, setSeconds] = React.useState(20);
//     let interval: any ;
//     React.useEffect(() => {
//         clearInterval(interval);
//         setSeconds(20);
//     },[props.id]);
//     React.useEffect(() => {
//         if (seconds == 20) {
//             clearInterval(interval);
//             interval = setTimeout(() => setSeconds(seconds - 1), 1000);
//           } else if (seconds > 0) {
//           interval = setTimeout(() => setSeconds(seconds - 1), 1000);
//         } else if (seconds == 0) {
//           props.clickHandler();
//           clearInterval(interval);
//         }
//       },[seconds]);
//     return (
//         <div>
//           {seconds}
//       </div>
//     );
//   }

import React from 'react';

export default class Timer extends React.Component<any,any> {
interval: any;
  constructor(props: any) {
    super(props);
    this.state = {
      seconds: 0,
      currentId: 0
    };
  }

  tick() {
    const { duration, clickHandler } = this.props;
    if (this.state.seconds === parseInt(duration)) {
        clickHandler();
        this.setState(() => ({
            seconds: 0
          }));
    } else {
      this.setState((prevState: any) => ({
        seconds: prevState.seconds + 1
      }));
    }
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if(props.id != state.currentId)  {
      return {currentId: props.id,seconds:0};
    }
    return null;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { duration } = this.props;
    let timeLeft = duration - this.state.seconds;
    return <span>Time Left: {timeLeft}</span>;
  }
}