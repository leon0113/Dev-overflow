'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
    try {
        //calling the db
        connectToDatabase();
        //recieving the parameters
        const { title, content, tags, author, path } = params;
        // create question in db
        const question = await Question.create({
            title,
            content,
            author
        });
        // initial empty array of tags
        const tagDocuments = [];
        // extrat every single tag from tags param. then checking if thet tag already exists in the db or not. if not then create a new tag in db
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate({
                name: { $regex: new RegExp(`^${tag}$`, "i") }
            }, {
                $setOnInsert: { name: tag }, $push: { question: question._id }
            }, {
                upsert: true, new: true
            });

            tagDocuments.push(existingTag._id);
        }

        // now upodate the question with tag field
        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments } }
        })

        // Create an interaction record for the user's ask_question action


        // Increment author's reputation by +5 for creating a question

    } catch (error) {
        console.log(error);
    }
}