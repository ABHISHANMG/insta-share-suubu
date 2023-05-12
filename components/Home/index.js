import {Component} from 'react'
import Header from '../Header'
import Posts from '../Posts'
import ReactSlick from '../ReactSlick'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <ReactSlick />
        <Posts />
      </>
    )
  }
}
export default Home
