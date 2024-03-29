import mongoose, { Schema } from "mongoose";

const pendingTransactionSchema = new mongoose.Schema(
    {
        group:{
            type:Schema.Types.ObjectId,
            ref:"Group",
            required:true
        },
        fromUser:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        toUser:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        amount:{
            type:Number,
            
        }
    }
)

export const PendingTransaction = mongoose.model("PendingTransaction", pendingTransactionSchema)