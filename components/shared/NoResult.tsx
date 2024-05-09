import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

interface NoResultProps {
    name: string,
    link: string,
    linkTitle: string
}

const NoResult = ({ name, link, linkTitle }: NoResultProps) => {
    return (
        <div className='mt-10 flex flex-col w-full items-center justify-center'>
            <Image
                src='/assets/images/light-illustration.png'
                alt='No result'
                width={270}
                height={200}
                className='block object-contain dark:hidden'
            />
            <Image
                src='/assets/images/dark-illustration.png'
                alt='No result'
                width={270}
                height={200}
                className='hidden object-contain dark:block'
            />

            <h2 className='h2-bold text-dark200_light900 mt-8'>There is no {name} to show</h2>
            <p className='body-regular text-dark500_light700 my-3.5 max-w-md text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem aliquid laudantium, reprehenderit impedit saepe tempore maiores possimus maxime assumenda magni!</p>
            <Link href={link} className="flex justify-end max-sm:w-full">
                <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                    {linkTitle}
                </Button>
            </Link>
        </div>
    )
}

export default NoResult