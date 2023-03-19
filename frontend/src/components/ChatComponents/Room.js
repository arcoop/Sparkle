import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Room = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState('');
  const [usersInRoom, setUsersInRoom] = useState({});

  const {id: roomId} = useParams();
  const messages = useSelector(getMessages(roomId));
  const currentUserId = useSelector(state => state.currentUserId)
  const room = useSelector(state => state.rooms[roomId]);

  const activeMessagesRef = useRef(null);
  const messageUIRef = useRef(null);
  const prevRoom = useRef(null);
  const numMessages = useRef(0);

  const activeMessageId = parseInt(history.location.hash.slice(1));
  const usersInRoomArray = Object.values(usersInRoom);

  useEffect (() => {
    if (activeMessagesRef.current) scrollToMessage();
  }, [activeMessageId])

  useEffect(() => {
    if (roomId === prevRoom.current && numMessages.current < messages.length) {
      if (history.location.hash) history.push(history.location.pathname);
      scrollToBottom();
    }
    numMessages.current = messages.length;
  }, [messages, RoomId, history])

  useEffect(() => {
    dispatch(fetchRoom(roomId)).then(() => {
      if (activeMessageRef.current) {
        scrollToMessage();
      } else {
        scrollToBottom();
      }
      prevRoom.current = roomId;
    });
    const subscription = consumer.subscriptions.create(
      {channel: 'RoomsChannel', id: roomId},
      {
        received: ({message, user}) => {
          dispatch(receiveMessage(message));
          dispatch(receiveUser(user));
        }
      }
    );
    return () => subscription?.unsubscribe();
  }, [roomId, dispatch])

  const scrollToMessage = () => {
    activeMessagesRef.current.focus();
    activeMessagesRef.current.scrollIntoView();
  }

  const scrollToBottom = () => {
    messageUIRef.current.scrollTop = messageUIRef.current.scrollHeight;
  }

  // const setReaction = (id, reaction) => {
  //   setUsersInRoom(prevUsersInRoom => ({...prevUsersInRoom, [id]: { ...prevUsersInRoom[id], reaction } }))
  // }

  const handleSubmit = e => {
    e.preventDefault();
    createMessage({ body, roomId, authorId: currentUserId}).then(() => {
      setBody(' ')
    })
  }

  
  return (
    <div>
      Room!
      <form onSubmit={handleSubmit}>
        <textarea 
          rows={body.split('\n').length}
          onChange={e => setBody(e.target.value)}
          onKeyDown={e => {
            if (e.code === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          value={body}
        />

      </form>
    </div>
  )
}

export default Room;