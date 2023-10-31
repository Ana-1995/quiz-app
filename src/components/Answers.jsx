import React from "react"
import { useState, useEffect } from "react"
import { PiSealQuestionFill } from 'react-icons/pi'
import Results from "./Results"

const Answers = ({
  quizData,
  resetQuiz,
  currentQuizStep,
  setCurrentQuizStep,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [processedAnswers, setProcessedAnswers] = useState([])

  const handleResult = (e) => {
    e.preventDefault()

    const processedAnswers = selectedAnswers.map(({ answer, question }) => {
      const relatedQuestion = quizData.find(
        (category) => category.question === question
      )
      if (relatedQuestion.correct_answer === answer) {
        return { correctAnswer: answer, isCorrect: true, question }
      }
      return {
        correctAnswer: relatedQuestion.correct_answer,
        wrongAnswer: answer,
        isCorrect: false,
        question,
      }
    })

    setProcessedAnswers(processedAnswers)
  }

  const handleAnswerChange = (e, selectedQuestion) => {
    e.preventDefault()
    const { value } = e.target

    if (value === 'Select') {
      const updatedAnswers = selectedAnswers.filter(
        (answer) => answer.question !== selectedQuestion
      )
      setSelectedAnswers(updatedAnswers)
    } else {
      const isExistQuestion =
        selectedAnswers.length &&
        selectedAnswers.find((answer) => answer.question === selectedQuestion)

      if (isExistQuestion && isExistQuestion.answer) {
        const updatedAnswers = selectedAnswers.map((answer) => {
          if (answer.question === selectedQuestion) {
            return { question: selectedQuestion, answer: value }
          }
          return answer
        })
        setSelectedAnswers(updatedAnswers)
      } else {
        setSelectedAnswers([
          ...selectedAnswers,
          { question: selectedQuestion, answer: value },
        ])
      }
    }
  }

  const relatedAnswer = (question, selectedAnswers) => {
    if (selectedAnswers && selectedAnswers.length) {
      const relatedQuestion = selectedAnswers.find(
        (answer) => answer.question === question
      )
      return (relatedQuestion && relatedQuestion.answer) || ''
    }
    return ''
  }

  useEffect(() => {
    window.scrollTo(0, '20px')
  }, [])

  return !processedAnswers || !processedAnswers.length ? (
    <div className='  h-[350px]'>
      <div className='py-5 px-3 bg-transparent rounded'>
        {quizData.map((quiz) => (
          <div
            key={quiz.question}
            className='p-4 bg-transparent shadow-lg rounded mb-4'
          >
            <h2
              className='text-lg font-bold mb-2 text-zinc-600'
              dangerouslySetInnerHTML={{ __html: quiz.question }}
            />
            <div className='mb-2'>
              <label className='flex items-center font-semibold pb-2 text-zinc-500'>
                Answer <PiSealQuestionFill className='ml-1' />
              </label>
              <select
                required
                name='answer'
                value={relatedAnswer(quiz.question, selectedAnswers)}
                className='border border-gray-500 rounded p-2 w-full bg-transparent'
                onChange={(e) => handleAnswerChange(e, quiz.question)}
              >
                <option value='Select'>Select</option>{' '}
                {quiz.answers.map((answer) => (
                  <option key={answer} value={answer}>
                    {answer}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          onClick={handleResult}
          className='bg-blue-600 hover:bg-blue-700 text-white rounded tracking-wider p-2 mt-4 w-full'
        >
          Result
        </button>
      </div>
    </div>
  ) : (
    <Results
      resetQuiz={resetQuiz}
      currentQuizStep={currentQuizStep}
      processedAnswers={processedAnswers}
      setCurrentQuizStep={setCurrentQuizStep}
    />
  )
}

export default Answers
