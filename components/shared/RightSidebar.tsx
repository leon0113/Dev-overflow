import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTags from './RenderTags'

const RightSidebar = () => {
    const hotQuestions = [
        {
            _id: "1",
            title: "What is the future of Web3?"
        },
        {
            _id: "2",
            title: "jgosdjgosdjgfosedgedg"
        },
        {
            _id: "3",
            title: "jgosdjgosdjgfosedgedg"
        },
        {
            _id: "4",
            title: "jgosdjgosdjgfosedgedg"
        },
        {
            _id: "5",
            title: "jgosdjgosdjgfosedgedg"
        },
    ];

    const popularTags = [
        {
            _id: "1",
            name: "javascript",
            totalQuestions: 4
        },
        {
            _id: "2",
            name: "javascript",
            totalQuestions: 34
        },
        {
            _id: "3",
            name: "javascript",
            totalQuestions: 4
        },
        {
            _id: "4",
            name: "javascript",
            totalQuestions: 6
        },
        {
            _id: "5",
            name: "javascript",
            totalQuestions: 10
        },
    ]

    return (
        <section className='background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar'>
            {/* Top Questions  */}
            <div>
                <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
                <div className='mt-7 flex w-full flex-col gap-[30px]'>
                    {
                        hotQuestions.map((question) => (
                            <Link
                                key={question._id}
                                href={`/questions/${question._id}`}
                                className='flex cursor-pointer items-center justify-between gap-7'
                            >
                                <p className='body-medium text-dark500_light700'>{question.title}</p>
                                <Image
                                    src='/assets/icons/chevron-right.svg'
                                    alt='chevron-right'
                                    width={20}
                                    height={20}
                                    className='invert-colors'
                                />
                            </Link>
                        ))
                    }
                </div>
            </div>
            {/* Popular Tags  */}
            <div className='mt-16 flex flex-col gap-3'>
                <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
                {
                    popularTags.map((tag) => (
                        <RenderTags key={tag._id}
                            _id={tag._id}
                            name={tag.name}
                            totalQuestions={tag.totalQuestions}
                            showCount={true}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default RightSidebar