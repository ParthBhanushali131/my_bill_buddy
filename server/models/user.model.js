import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            reuired:true,

        },
        groups:[
            {
                type:Schema.Types.ObjectId,
                ref:"Group"
            }
        ]
    }
)
userSchema.methods.isPasswordCorrect = async function(password){
    return password===this.password
}
export const User = mongoose.model("User", userSchema)