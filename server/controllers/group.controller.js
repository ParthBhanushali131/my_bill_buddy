import { Group } from "../models/group.model.js";
import { User } from "../models/user.model.js";
import { getUserIdsFromEmails } from '../middlewares/getUserIdsFromEmails.middleware.js'

const createGroup = async (req, res) => {
    try {
        const {
            name
        } = req.body

        // Throw error if group name field is empty or empty string
        if (!name || name.trim() === "") {
            throw new Error("Group name is required");
        }
        // Ensure middleware has added user IDs to request object
        if (!req.userIds) {
            throw new Error("User IDs not found in request");
        }
        // for adding logged in user's own id.##VERY IMPORTANT
        const userId = req.cookies.id;
        if (!req.userIds) {
            req.userIds = [];
        }
        req.userIds.push(userId);
        // check if group is already exists
        const existedGroup = await Group.findOne({ name })

        if (existedGroup) {
            throw new Error("Group already existed with this name");
        }
        const group = await Group.create({
            name,
            members: req.userIds
        })


        // update new group in each member's groups array (into userSchema)
        for (const userId of req.userIds) {
            const user = await User.findById(userId);
            if (user) {
                user.groups.push(group._id);
                await user.save();
            } else {
                // Handle case where member does not exist
                console.log(`Member with id ${userId} does not exist. Invite him/her on Bill Buddy first.`);
                res.json({ message: `Member with id ${userId} does not exist. Invite him/her on Bill Buddy first.` })
            }
        }

        res.status(201).json({ message: "New group created successfully" })
    }
    catch (err) {
        console.log("Error occured :- ", err);
        res.status(500).json({ message: "Server error" })
    }
}

const fetchGroups = async (req, res, next) => {
    const id = req.cookies.id;
    console.log(id);
    if (!id) {
        return res.status(400).json({ error: 'User ID not found in cookies' });
    }

    try {
        const user = await User.findById(id).select("-password").populate('groups')
            .catch(error => console.error('Populate error:', error))
        if (!user) {
            return res.status(404).json({ error: 'User or groups not found' });
        }
        console.log("user :- ", user)
        res.status(200).json({ user: { ...user, groups: user.groups } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
async function getGroupNameAndMembersById(req, res) {
    const { groupId } = req.params;
    // console.log(groupId);
    try {
        const group = await Group.findById(groupId).populate('members');

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        //   console.log("Group name :- ", group.name)
        console.log("Group members :- ", group.members)
        return res.status(200).json({ groupname: group.name, members: group.members });
    } catch (error) {
        console.error('Error fetching group name:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

async function getMemberNames(req, res) {
    try {

        const group = await Group.findById(req.params.groupId).populate('members');

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const memberNames = group.members.map(member => member.name);
        res.status(200).json(memberNames);
    }
    catch (err) {
        console.log("Error :- ", err);
        res.status(500).json({ message: 'Error fetching group members' });
    }
}



async function addNewMembers(req, res) {
    const { groupId } = req.params;
    const { members } = req.body;
    console.log(members);

    try {
        // Find the group by ID
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Find users by their emails
        const users = await User.find({ email: { $in: members } });
        console.log("users:=", users)
        // Add user objects to the group's members array
        group.members = [...group.members, ...users.map(user => user._id)];
        console.log("group.members:=", group.members)



        // update new group's information in the user schema as well
        users.forEach(user => {
            user.groups.push(group._id);
            user.save(); // Save the user document to update the groups array
        });
        // Save the updated group
        await group.save();

        res.status(201).json({ message: 'Members added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding members' });
    }

}
export {
    createGroup,
    fetchGroups,
    getGroupNameAndMembersById,
    getMemberNames,
    addNewMembers,
    
}