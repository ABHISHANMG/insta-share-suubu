import {Component} from 'react'
import './index.css'

class MyProfileDetailPost extends Component {
  render() {
    const {myProfileListData} = this.props
    const {
      followersCount,
      profileId,
      postsCount,
      profilePic,
      userBio,
      userName,
      userId,
      followingCount,
    } = myProfileListData

    return (
      <>
        <div className="trail-div">
          <div className="myprofile-details-large">
            <img
              src="https://res.cloudinary.com/dblt0lmvx/image/upload/v1680843676/photo1680843642_bedvk2.jpg"
              className="myprofile-profile-pic-large"
            />
            <div className="myprofile-top-details-large">
              <p className="myprofile-username-large">SubbarajuSMK</p>
              <div className="followers-following-posts-div-large">
                <p className="myprofile-posts-count-large">
                  {postsCount}
                  <span className="span">posts</span>
                </p>
                <p className="myprofile-followers-large">
                  {followersCount}
                  <span className="span">followers</span>
                </p>
                <p className="myprofile-following-large">
                  {followingCount} <span className="span">following</span>
                </p>
              </div>
              <p className="myprofile-userid-large">SubbarajuSMK</p>
              <p className="myprofile-userbio-large">
                Full Stack Developer (MERN)
              </p>
            </div>
          </div>
        </div>
        <div className="myprofile-details-small">
          <p className="myprofile-username-large">SubbarajuSMK</p>
          <div className="myprofile-top-details-small">
            <img
              src="https://res.cloudinary.com/dblt0lmvx/image/upload/v1680843676/photo1680843642_bedvk2.jpg"
              className="myprofile-profile-pic-large"
            />
            <div className="three-items">
              <div className="two-div-small">
                <p className="mp-postscount-small">{postsCount}</p>
                <p className="posts-small">posts</p>
              </div>
              <div className="two-div-small">
                <p className="mp-followers-small">{followersCount}</p>
                <p className="followers-small">followers</p>
              </div>
              <div className="two-div-small">
                <p className="mp-following-small">{followingCount}</p>
                <p className="following-small">following</p>
              </div>
            </div>
          </div>
          <p className="userid-small-mp">SubbarajuSMK</p>
          <p className="userbio-small-mp">Full Stack Developer (MERN)</p>
        </div>
      </>
    )
  }
}
export default MyProfileDetailPost
