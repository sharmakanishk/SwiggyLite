import React from 'react'

class About extends React.Component {
  constructor(props){
    super(props)
    this.state = null;
  }
  async componentDidMount(){
    const data = await fetch(" https://api.github.com/users/sharmakanishk")
    const JSONdata = await data.json();
    this.setState(JSONdata)
  }
  componentDidUpdate(){
    console.log("component updated")
  }
  render(){
    if(this.state===null){
      return (
        <h1>Loading...</h1>
      )
    }
      const {name} = this?.state;
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
}

export default About;
