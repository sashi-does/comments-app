import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const comments = []

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: comments,
  }

  onChangeNameInput = event => {
    this.setState({name: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({comment: event.target.value})
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, like: !eachComment.like}
        }
        return eachComment
      }),
    }))
  }

  addComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    let colorNumber = Math.floor(Math.random() * 10)
    if (colorNumber >= 7) colorNumber %= 7
    console.log(colorNumber)
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      like: false,
      profileColor: initialContainerBackgroundClassNames[colorNumber],
    }
    this.setState(prevState => ({
      name: '',
      comment: '',
      commentsList: [...prevState.commentsList, newComment],
    }))
  }

  deleteComment = id => {
    this.setState(prevState => {
      const newCommentsList = []
      prevState.commentsList.forEach(eachComment => {
        if (eachComment.id !== id) newCommentsList.push(eachComment)
      })
      return {commentsList: newCommentsList}
    })
  }

  render() {
    const {commentsList, profileColor, name, comment} = this.state
    return (
      <div className="main-section">
        <div className="comments-section">
          <div className="align-hero-section">
            <div>
              <h1 className="comments-heading">Comments</h1>
              <p>Say something about 4.0 Technologies</p>
              <form className="form-section">
                <input
                  placeholder="Your Name"
                  value={name}
                  onChange={this.onChangeNameInput}
                  className="input-fields"
                  type="text"
                />
                <textarea
                  placeholder="Your Comment"
                  value={comment}
                  onChange={this.onChangeCommentInput}
                  className="input-fields"
                  rows="8"
                  cols="23"
                />
                <button
                  onClick={this.addComment}
                  className="add-comment-btn"
                  type="submit"
                >
                  Add Comment
                </button>
              </form>
            </div>
            <div>
              <img
                className="hero-image"
                alt="comments"
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              />
            </div>
          </div>
          <hr className="divider" />
          <div className="all-comments">
            <div className="counter-section">
              <div className="comments-counter">
                <p>{commentsList.length}</p>
              </div>
              <p>Comments</p>
            </div>
          </div>
          <ul className="comments-list-section">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                deleteComment={this.deleteComment}
                toggleLike={this.toggleLike}
                profileColor={profileColor}
                commentDetails={eachComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
