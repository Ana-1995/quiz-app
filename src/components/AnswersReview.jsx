import React from 'react'

const AnswersReview = ({ processedAnswers, resetQuiz }) => {
   const createMarkup = (text) => ({ __html: text })
  const renderAnswers = (answers) => {
    return answers.map(
      ({ question, isCorrect, correctAnswer, wrongAnswer }) => (
        <div key={question} className='bg-transparent p-4 shadow-lg rounded-lg'>
          <h2 className='text-lg mb-2 text-zinc-600'>
            <span dangerouslySetInnerHTML={createMarkup(question)} />
          </h2>

          {isCorrect ? (
            <div className='text-green-600 font-semibold'>
              <span className='text-lg'>&#10004;</span>
              <span
                dangerouslySetInnerHTML={createMarkup(correctAnswer)}
                className='ml-2'
              />
            </div>
          ) : (
            <>
              <div className='text-red-600 font-semibold'>
                <span className='text-lg'>&#10008;</span>
                <span
                  dangerouslySetInnerHTML={createMarkup(wrongAnswer)}
                  className='ml-2'
                />
              </div>
              <div className='text-green-600 font-semibold'>
                <span className='text-lg'>&#10004;</span>
                <span
                  dangerouslySetInnerHTML={createMarkup(correctAnswer)}
                  className='ml-2'
                />
              </div>
            </>
          )}
        </div>
      )
    )
  }

  return (
    <div className=' bg-transparent h-[350px]'>
      <div className=' bg-transparent py-5 px-3'>
        <h1 className='text-2xl font-bold mb-2 ml-3 tracking-wider'>Answers review:</h1>
        {renderAnswers(processedAnswers)}
        <button
          onClick={resetQuiz}
          className='bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 mt-5 w-full tracking-wider'
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default AnswersReview
