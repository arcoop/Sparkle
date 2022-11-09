import { useState } from 'react';
import './QuizPaused.css'
import { Modal } from '../../context/Modal';

const QuizPausedModal = ({playQuiz, quiz, tempMin, tempSeconds}) => {
    const [showModal, setShowModal] = useState(false)

    const handleResume = () =>{
        setShowModal(false)
        playQuiz(tempMin, tempSeconds)
    }

    return (
        <>            
            <div onClick={() => setShowModal(true)}><i id="quiz-pause" className="fa-solid fa-pause"></i></div>
            
            {showModal &&
                // <Modal onClose = {() => setShowModal(false)} type={modalType}>
                // <Modal onClose = {() => setShowModal(false)} type={modal}>
                <Modal onClose = {() => setShowModal(false)} type={"quizPaused"}>
                    <div className='quiz-paused-modal-content'>
                        <div onClick={handleResume} id='resume-button' className='submit-button'>Resume</div>
                        <div className='quiz-paused-info'>
                            <div className='quiz-paused-text'>Quiz Paused</div>
                            <div className='paused-quiz-title-descript'>
                                <div>{quiz.title}</div>
                                <div>{quiz.description}</div>
                            </div>
                            <div className='paused-time-remaining'>{tempMin < 10 ? `0${tempMin}` : tempMin}:{tempSeconds < 10 ? `0${tempSeconds}` : tempSeconds} Remaining</div>
                        </div>
                    </div>            
                
                </Modal>
            }
        </>
    )
}

export default QuizPausedModal;