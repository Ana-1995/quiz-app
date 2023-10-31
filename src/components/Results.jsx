import React, { useEffect } from 'react'
import AnswersReview from './AnswersReview'

const Results = ({
  resetQuiz,
  currentQuizStep,
  processedAnswers,
  setCurrentQuizStep,
}) => {
  useEffect(() => {
    window.scrollTo(0, 20)
  }, [])

  return currentQuizStep === 'results' ? (
    <div className='container mx-auto'>
      <div className='bg-transparent p-4'>
        <h1 className='text-3xl font-bold mb-4'>Results</h1>
        <h4>
          {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out of{' '}
          {processedAnswers.length}
        </h4>
        <button
          onClick={(e) => {
            setCurrentQuizStep('review')
          }}
          className='bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 mt-4'
        >
          Review
        </button>
        <button
          onClick={resetQuiz}
          className='bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 mt-4 ml-3'
        >
          Reset
        </button>
      </div>
    </div>
  ) : (
    <AnswersReview resetQuiz={resetQuiz} processedAnswers={processedAnswers} />
  )
}

export default Results
