'use server'

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";

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