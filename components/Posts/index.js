import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HomePost from '../HomePost'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Posts extends Component {
  state = {
    profileDetailsList: [],
    commentsList: [],
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getAllUserPosts()
  }

  /* loader */

  renderLoadingView = () => (
    <div className="home-loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="40" width="40" />
    </div>
  )

  /* home failure */

  renderFailurePage = () => (
    <div className="failure-main-div">
      <img
        src="https://res.cloudinary.com/dblt0lmvx/image/upload/v1680665432/Icon_syha73.png"
        className="home-error-image"
      />
      <p className="home-failure-message">
        Something went wrong.Please try again
      </p>
      <button type="button" className="home-retry-button">
        Try again
      </button>
    </div>
  )

  /* success page */

  renderSuccessPage = () => {
    const {profileDetailsList} = this.state
    const {userRequetsedPost} = this.props
    return (
      <ul>
        {profileDetailsList.map(EachPost => (
          <HomePost
            EachPost={EachPost}
            key={EachPost.postId}
            userRequetsedPost={userRequetsedPost}
          />
        ))}
      </ul>
    )
  }

  getAllUserPosts = async () => {
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const commented = data.posts.map(({comments}) => comments).flat()
      const convertedComments = commented.map(eachItem => ({
        comment: eachItem.comment,
        commentUserId: eachItem.user_id,
        commentUserName: eachItem.user_name,
      }))

      const convertedPostDetails = data.posts.map(eachItem => ({
        caption: eachItem.post_details.caption,
        imageUrl: eachItem.post_details.image_url,
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))

      const mergedArray = convertedPostDetails.map(post => {
        const matchingComment = convertedComments.find(
          ({commentUserId}) => commentUserId === post.userId,
        )

        if (matchingComment) {
          const {comment, commentUserId, commentUserName} = matchingComment

          return {
            ...post,
            comment,
            commentUserId,
            commentUserName,
          }
        }

        return post
      })

      this.setState({
        profileDetailsList: mergedArray,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderAllPosts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessPage()
      case apiStatusConstants.failure:
        return this.renderFailurePage()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllPosts()}</div>
  }
}
export default Posts
