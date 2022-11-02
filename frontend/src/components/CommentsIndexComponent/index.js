import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchComments, getComments } from "../../store/comments"
import CommentTile from "../CommentTileComponent"

const CommentsIndex = ({quizComments, quizId}) => {
    const dispatch = useDispatch()
    const [dummy, setDummy] = useState(false)

    const [numLikes, setNumLikes] = useState(false)
    // console.log(quizId)
    // useEffect(() => {
    //     dispatch(fetchComments(quizId))
    // }, [dispatch, quizId])
    
    // let comments = useSelector(getComments) || []    

    useEffect(() => {
       if (numLikes){
            dispatch(fetchComments(quizId)).then(() => setNumLikes(false))
       }

    }, [numLikes])

    return (
        <div id="comments-index-section">
            <h1 id="num-comments-header">{quizComments.length} Comments</h1>
            {quizComments.map(comment => {
                return (
                    <div>
                        <CommentTile comment={comment} setNumLikes={setNumLikes}/>
                         <hr />
                    </div>
                )
            })}
        </div>
    )

}

export default CommentsIndex;