import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
    name: string,
    description: string,
    questions: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    createdOn: Date;
}

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question",
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    createdOn: {
        type: Date,
        default: Date.now,
    },
});


const Tag = models.Tag || model('Tag', TagSchema); // we are checking first if the model already exists or not. if not then creating a new model


export default Tag;