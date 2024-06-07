import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constant/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

// const questions = [
//     {
//         _id: 1,
//         title: "This is a dummy question title",
//         tags: [{ _id: "1", name: "python" }, { _id: "2", name: "Php" }, { _id: "3", name: "javascript" },],
//         author: { _id: 1, name: "Leon", picture: "leon.jpg" },
//         upvotes: 99900,
//         views: 150000000,
//         answers: [],
//         createdAt: new Date('2024-06-06T10:37:14.276+00:00')
//     },
//     {
//         _id: 2,
//         title: "This is a dummy question title 2",
//         tags: [{ _id: "1", name: "python" }, { _id: "2", name: "Php" }, { _id: "3", name: "javascript" },],
//         author: { _id: 1, name: "Leon", picture: "leon.jpg" },
//         upvotes: 10,
//         views: 100,
//         answers: [],
//         createdAt: new Date('2024-06-06T10:37:14.276+00:00')
//     },
// ]

export default async function Home() {

    const result = await getQuestions({});
    // console.log(result.questions);

    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>

                <Link href="/ask-question" className="flex justify-center md:justify-end max-sm:w-full">
                    <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                        Ask a Question
                    </Button>
                </Link>
            </div>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchBar
                    route='/'
                    iconPosition='left'
                    imgSrc='/assets/icons/search.svg'
                    placeholder='Search for questions'
                    otherClasses='flex-1'
                />

                <Filter filters={HomePageFilters} otherClasses={"min-h-[56px] sm:min-w-[170px]"} containerClasses={"hidden max-md:flex"} />
            </div>

            <HomeFilters />
            <div className="mt-10 flex w-full flex-col gap-6">
                {
                    result.questions.length > 0 ?
                        result.questions.map((question) => (
                            <QuestionCard key={question._id}
                                _id={question._id}
                                title={question.title}
                                tags={question.tags}
                                author={question.author}
                                upvotes={question.upvotes}
                                answers={question.answers}
                                createdAt={question.createdAt}
                                views={question.views}
                            />
                        )) :
                        <NoResult
                            name={"questions"}
                            link={"/ask-question"}
                            linkTitle={"Ask a question"}
                        />
                }
            </div>
        </>
    )
}