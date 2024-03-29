import { Group } from "../models/group.model.js";
import { User } from "../models/user.model.js";

const createGroup = async (req, res, next) => {
    try {
        const {
            name,
            members
        } = req.body

        if ([name, members].some((field) => field?.trim() === "")) {
            throw new Error("All fields are required")
        }
        // check if group is already exists
        const existedGroup = await Group.findOne({ name })

        if (existedGroup) {
            throw new Error("user already existed with this email");
        }
        const group = await Group.create({
            name,
            members
        })
        // update new group in each member's groups array (into userSchema)
        for (const member of members) {
            const user = await User.findOne({ name: member });
            if (user) {
                user.groups.push(group._id);
                await user.save();
            } else {
                // Handle case where member does not exist
                console.log(`Member ${member} does not exist. Invite him/her on Bill Buddy first.`);
            }
        }
        //updating the members array of the groupSchema
        const userIds = await User.find({ name: { $in: members } }).select('_id');
        group.members = userIds.map(user => user._id);
        await group.save();

        res.status(201).json({message: "New group created successfully"})
    }
    catch (err) {
        console.log("Error occured :- ", err)
        req.status(500).json({message:"Server error"})
    }
}

export{
    createGroup
}