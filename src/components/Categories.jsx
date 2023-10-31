import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Answers from './Answers'
import ideas from '../assets/ideas.png'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [quizNumber, setQuizNumber] = useState('')
  const [difficulty, setDifficulty] = useState('select')
  const [quizData, setQuizData] = useState([])
  const [currentQuizStep, setCurrentQuizStep] = useState('start')

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${quizNumber}&category=${category}&difficulty=${difficulty}`
      const { data } = await axios.get(url)

      const formattedCategory = data.results.map((cat) => {
        const incorrectAnswersIndexes = cat.incorrect_answers.length
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0
        )

        cat.incorrect_answers.splice(randomIndex, 0, cat.correct_answer)

        return {
          ...cat,
          answers: cat.incorrect_answers,
        }
      })

      setQuizData(formattedCategory)
      setCurrentQuizStep('results')
    } catch (error) {
      console.log('Fetch quiz error =====>>>>', error)
    }
  }

  const fetchCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`)
    setCategories(data.trivia_categories)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!quizData.length && quizNumber && category && difficulty) {
      fetchQuizData()
    }
  }

  const handleSelectChange = (e) => {
    setCategory(e.target.value)
  }

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value)
  }

  const handleChange = (e) => {
    setQuizNumber(e.target.value)
  }

  const resetQuiz = (e) => {
    setQuizData([])
    setCategory('')
    setQuizNumber('')
    setDifficulty('')
    setCurrentQuizStep('start')
  }

  if (!categories.length) {
    return null
  }

  return (
    <div
      className=' bg-right lg:bg-cover lg:bg-bottom '
      style={{
        backgroundImage: `url(${'https://www.freevector.com/uploads/vector/preview/28142/Education_Background_vector_4.jpg'})`,
      }}
    >
      <div className='h-screen  flex justify-center items-center'>
        <div className='py-5 pl-2 lg:pl-6 pr-3 overflow-y-scroll scrollbar-container bg-[#FFFDD0] rounded-lg mt-4 w-[90%] lg:w-[380px] md:w-[35vw] xl:w-[38vw]'>
          {currentQuizStep === 'start' ? (
            <>
              <div className='flex flex-row items-center justify-center '>
                <h1 className='text-[22px] lg:text-4xl font-bold mb-5 lg:mb-7 mt-3 tracking-wider capitalize'>
                  Knowledge Challenge
                </h1>
                <div className='pb-2 lg:pb-4'>
                  <img
                    src={ideas}
                    alt='knowledge'
                    className='w-8 lg:w-11 h-8 lg:h-11 ml-1 object-cover'
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <label
                      htmlFor='category-select'
                      className='block font-semibold mb-2 text-zinc-600 text-lg tracking-wider'
                    >
                    Categories:
                    </label>
                    <select
                      required
                      name='category'
                      value={category}
                      id='category-select'
                      className='border border-gray-500 bg-transparent rounded p-2 w-full'
                      onChange={handleSelectChange}
                    >
                      <option value='none'>select</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor='difficulty-select'
                      className='block font-semibold mb-2 text-zinc-600 text-lg'
                    >
                      Levels:
                    </label>
                    <select
                      required
                      name='difficulty'
                      value={difficulty}
                      id='difficulty-select'
                      className='border border-gray-500 rounded p-2 w-full bg-transparent'
                      onChange={handleDifficultyChange}
                    >
                      <option value='select'>Select</option>
                      <option value='easy'>Easy</option>
                      <option value='medium'>Medium</option>
                      <option value='hard'>Hard</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor='difficulty-select'
                      className='block font-semibold mb-2 text-zinc-600 text-lg'
                    >
                      Choose 1-10 Questions:
                    </label>
                    <input
                      type='number'
                      min='1'
                      max='10'
                      required
                      id='quiz-number'
                      name='quiz-number'
                      value={quizNumber}
                      className='border border-gray-500 rounded p-2 w-full bg-transparent placeholder:text-black'
                      placeholder='1'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='bg-blue-600 hover:bg-blue-700 text-white rounded p-2 mt-4 w-full tracking-wider'
                >
                  Submit
                </button>
              </form>
            </>
          ) : (
            <Answers
              quizData={quizData}
              resetQuiz={resetQuiz}
              currentQuizStep={currentQuizStep}
              setCurrentQuizStep={setCurrentQuizStep}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories
