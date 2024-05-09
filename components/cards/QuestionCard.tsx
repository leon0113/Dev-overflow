import React from 'react'

interface QuestionCardProps {
    _id: number,
    title: string,
    tags: { _id: number, name: string }[],
    author: string,
    upvotes: number,
    views: number,
    answers: number,
    createdAt: string
}

const QuestionCard = ({ _id, title, tags, author, upvotes, views, answers, createdAt }: QuestionCardProps) => {
    return (
        <div className='card-wrapper p-9 sm:px-11 rounded-[10px]'>
            {title}
        </div>
    )
}

export default QuestionCard