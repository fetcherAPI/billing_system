import React, { useState } from 'react'

import { Button } from '@/shared/ui'
import QuestionText from '@/components/question/QuestionText'
import { useGetQuestionQuery } from '@/features/api/question/questionApi'
import type { IValumeOfContainersProps } from '../model/types'
import './style.css'

export const ValumeOfContainers = ({ questionId, selectedOption, setSelectedOption }: IValumeOfContainersProps) => {
  const { data, error, isLoading } = useGetQuestionQuery({ id: questionId })
  const [animation, setAnimation] = useState(false)

  if (isLoading) return <p>Loading...</p>
  if (error || !data) return <p>Error loading question</p>

  const { TotalValue, ImgUrl, Value } = data.question

  const playSound = (sound: string) => {
    const audio = new Audio(`/sounds/${sound}`)

    audio.play()
  }

  const handleIncrease = () => {
    setAnimation(true)
    playSound('water-191999-VEED.mp3')
    setSelectedOption(prev => (prev ?? 0) + +Value)
    setTimeout(() => setAnimation(false), 4000)
  }

  const handleDecrease = () => {
    playSound('2025-VEED.mp3')
    setSelectedOption(prev => Math.max((prev ?? 0) - +Value, 0))
  }

  return (
    <div className='flex flex-col md:gap-[10px] gap-[35px] items-center'>
      <div className='wrapper'>
        <div className='measureUnit' onClick={handleIncrease}>
          <img className={animation ? 'rotate-90-cw' : ''} src={ImgUrl} alt='sosud' style={{ width: '200px' }} />
          <p className='text'>{Value} литр</p>
        </div>
        <div className='sosud'>
          <div id='banner'>
            <div className={'fill'}>
              <svg
                x='0px'
                y='0px'
                width='300px'
                height='300px'
                viewBox='0 0 300 300'
                enable-background='new 0 0 300 300'
                xmlSpace='preserve'
              >
                <path
                  fill='#04ACFF'
                  id={'waveShape'}
                  d='M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z'
                />
              </svg>
            </div>
          </div>
          <QuestionText>{TotalValue} литр</QuestionText>
        </div>
      </div>
      <div className='controlBtns'>
        <Button onClick={handleDecrease}>-</Button>
        <QuestionText questionText={`${selectedOption || 0}`} />
        <Button onClick={handleIncrease} disabled={selectedOption === 0}>
          +
        </Button>
      </div>
    </div>
  )
}
