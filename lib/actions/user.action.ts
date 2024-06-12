'use server'

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: any) {
    try {
        connectToDatabase();

        const { userId } = params;

        const user = await User.findOne({
            clerkId: userId
        })

        return user;

    } catch (error) {
        console.log(error);
    }
}

export async function createUser(params: CreateUserParams) {
    try {
        connectToDatabase();

        const newUser = await User.create(params);
        return newUser;

    } catch (error) {
        console.log(error);
    }
}
export async function updateUser(params: UpdateUserParams) {
    try {
        connectToDatabase();
        const { clerkId, updateUserData, path } = params

        await User.findOneAndUpdate({ clerkId }, updateUserData, {
            new: true
        });

        revalidatePath(path);

    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase();
        const { clerkId } = params

        const user = await User.findOneAndDelete({ clerkId });

        if (!user) {
            throw new Error('User not found!');
        }

        // Deletet user, questions, answers, comments etc.

        //get users questions id's
        const userQuestionsIds = await Question.find({ author: user._id }).distinct('_id');
        // TODO: delete user answers, comments, etc.

        //delete user questions
        await Question.deleteMany({ author: user._id });
        // delete user from db
        const deletedUser = await User.findByIdAndDelete(user._id);
        return deletedUser;

    } catch (error) {
        console.log(error);
    }
}