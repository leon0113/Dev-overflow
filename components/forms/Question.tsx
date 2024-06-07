"use client"

import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionSchema } from "@/lib/validation"
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { createQuestion } from '@/lib/actions/question.action';
import { usePathname, useRouter } from 'next/navigation';

const type: string = 'post';

const Question = ({ mongoUserId }: { mongoUserId: string }) => {
    // const editorRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    // 1. Define your form.
    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            title: "",
            explaination: "",
            tags: [],
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof QuestionSchema>) {
        // Do something with the form values.
        setIsSubmitting(true);
        try {
            // make an async call to our API to create a question
            //contain all form data
            await createQuestion({
                title: values.title,
                content: values.explaination,
                tags: values.tags,
                author: JSON.parse(mongoUserId),
                path: pathName
            })
            //navigate to home page
            router.push('/');

        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }


    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>, field: any) {
        if (e.key === 'Enter' && field.name === 'tags') {
            e.preventDefault();

            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim();

            if (tagValue !== '') {
                if (tagValue.length > 15) {
                    return form.setError('tags', {
                        type: "required",
                        message: "Tag must be less than 15 characters."
                    })
                }

                if (!field.value.includes(tagValue as never)) { // checking current tag doesn't exists within the tags already or not
                    form.setValue('tags', [...field.value, tagValue]);
                    tagInput.value = '';
                    form.clearErrors('tags');
                }
            } else {
                form.trigger();
            }
        }
    }


    function handleTagRemove(tag: string, field: any) {
        const newTags = field.value.filter((t: string) => t !== tag);
        form.setValue('tags', newTags);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
                {/* question title  */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark300_light700">Question Title <span className="text-primary-500">*</span></FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                    {...field} />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Be specific about your question.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                {/* question explaination  */}
                <FormField
                    control={form.control}
                    name="explaination"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark300_light700">Detailed Explanation of Your Question <span className="text-primary-500">*</span></FormLabel>
                            <FormControl className="mt-3.5">
                                <Editor
                                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                                    init={{
                                        height: 350,
                                        menubar: false,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | codesample  | bold italic underline strikethrough  | align lineheight ',
                                        tinycomments_mode: 'embedded',
                                        tinycomments_author: 'Author name',
                                        mergetags_list: [
                                            { value: 'First.Name', title: 'First Name' },
                                            { value: 'Email', title: 'Email' },
                                        ],
                                        // @ts-ignore
                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                    }}
                                    initialValue=""
                                    onBlur={field.onBlur}
                                    onEditorChange={(content) => field.onChange(content)}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Introduce the problem with more explaination what you put in the title. Minimum 20 character.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                {/* tags */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark300_light700">Tags <span className="text-primary-500">*</span></FormLabel>
                            <FormControl className="mt-3.5">
                                <>
                                    <Input
                                        className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                        placeholder="Add tags..."
                                        onKeyDown={(e) => handleInputKeyDown(e, field)}
                                    />

                                    {
                                        field.value.length > 0 && (
                                            <div className='flex-start mt-2.5 gap-2.5'>
                                                {
                                                    field.value.map((tag: any) => (
                                                        <Badge
                                                            key={tag}
                                                            className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase flex gap-1'
                                                            onClick={() => handleTagRemove(tag, field)}
                                                        >
                                                            {tag}
                                                            <Image
                                                                alt='close-icon'
                                                                src='/assets/icons/close.svg'
                                                                width={12}
                                                                height={12}
                                                                className='cursor-pointer object-contain invert-0 dark:invert'
                                                            />

                                                        </Badge>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </>
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Add upto 3 tags to describe your question.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="primary-gradient w-fit !text-light-900" disabled={isSubmitting}>
                    {
                        isSubmitting ? (
                            <>
                                {type === 'edit' ? 'Editing...' : 'Posting'}
                            </>
                        ) : (
                            <>
                                {type === 'edit' ? 'Edit Question' : 'Ask a Question'}
                            </>
                        )
                    }
                </Button>
            </form>
        </Form>
    )
}

export default Question