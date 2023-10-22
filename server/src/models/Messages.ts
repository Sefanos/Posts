import mongoose , {Schema , Document , Types}  from "mongoose";

export interface Imessages extends Document{
    title: string;
    message: string;
    author: Types.ObjectId;
}

const MessageSchema : Schema = new Schema ({
    title: {type : String , required : [true, 'Title is required'] ,  minlength: 1 , maxlength : 60},
    message: {type : String , required : [true, 'Message is required'] ,  minlength: 1},
    author:{ type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    }
} , {
    timestamps : true
})

const Message = mongoose.model<Imessages>('Message', MessageSchema);

export default Message;