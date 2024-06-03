'use client'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar"
import { themes } from '@/constant'
import Image from 'next/image'
import { useTheme } from '../../../context/ThemeProvider'


const Theme = () => {
    const { mode, setMode } = useTheme();

    return (
        <Menubar className='relative border-blue-700 bg-transparent shadow-none '>
            <MenubarMenu>
                <MenubarTrigger className='focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-light-900 dark:data-[state=open]:bg-dark-200'>
                    {
                        mode === 'light' ? (
                            <Image src="assets/icons/moon.svg" alt='sun' width={20} height={20} className='active-theme' />
                        ) : (
                            <Image src="assets/icons/sun.svg" alt='sun' width={20} height={20} className='active-theme' />

                        )
                    }</MenubarTrigger>
                <MenubarContent className='absolute right-[-3rem] mt-3 min-w-[200px] rounded border py-2 dark:bg-dark-300 dark:border-dark-400'>
                    {

                        themes.map((theme) => (
                            <MenubarItem key={theme.value} onClick={() => {
                                setMode(theme.value)
                                if (theme.value !== 'system') {
                                    localStorage.theme = theme.value
                                } else {
                                    localStorage.removeItem('theme')
                                }
                            }} className='flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400'>
                                <Image
                                    src={theme.icon}
                                    alt={theme.label}
                                    width={16}
                                    height={16}
                                    className={`${mode === theme.value && 'active-theme'}`}
                                />
                                <p className={`body-semibold text-light-500 ${mode === theme.value ? 'text-primary-500' : 'text-dark100_light900'} `}>{theme.label}</p>
                            </MenubarItem>
                        ))
                    }
                </MenubarContent>
            </MenubarMenu>
        </Menubar>

    )
}

export default Theme