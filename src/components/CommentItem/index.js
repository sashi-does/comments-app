import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {name, comment, like, profileColor, id} = commentDetails
  const likeBtn = () => {
    if (like === false) {
      return 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    }
    return 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
  }

  const likeStyle = () => (like === true ? 'liked like-text' : 'like-text')

  const onClickLike = () => {
    toggleLike(id)
  }

  const onClickDelete = event => {
    event.preventDefault()
    deleteComment(id)
  }

  return (
    <>
      <li className="comment-item">
        <div className="comment-user">
          <div className={`${profileColor} profile`}>
            <p>{name[0]}</p>
          </div>
          <div>
            <div className="commented-user-details">
              <p className="name">{name}</p>
              <p className="comment-details">
                {formatDistanceToNow(new Date())}
              </p>
            </div>
            <p className="comment">{comment}</p>
          </div>
        </div>
        <div className="like-delete">
          <div className="like-section">
            <button
              id={id}
              onClick={onClickLike}
              type="submit"
              className="like-button"
            >
              <img alt="like" className="like" src={likeBtn()} />
            </button>
            <label htmlFor={id} className={likeStyle()}>
              Like
            </label>
          </div>
          <div>
            <button
              data-testid="delete"
              type="submit"
              onClick={onClickDelete}
              className="delete"
            >
              <img
                className="delete-icon"
                alt="delete"
                src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              />
            </button>
          </div>
        </div>
        <hr className="divider" />
      </li>
    </>
  )
}

export default CommentItem
