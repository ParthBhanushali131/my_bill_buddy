// import { Group } from "../models/group.model";
// import { User } from "../models/user.model";
import { Expense } from "../models/expense.model.js";



const addExpense = async (req, res)=>{
    try{

        const {
            groupId,
            description,
            amount,
            paidBy,
            involved_members
        } = req.body

        const individualAmount = amount / involved_members.length;

        const deus = involved_members.map(member => ({
            user_id: member, 
            amount_owes: individualAmount
        }));



        const response = await Expense.create({
            paidBy:paidBy,
            description:description,
            involved_users:deus,
            group: groupId,

        })

        if(!response){
            throw new Error("server Error");
        }
        
        res.status(201).json({message: "inserted successfully!"});
    }
    catch(err)
    {

        console.log("Error :", err)
        res.status(500).json({ message: "Server error" })
    }
}

const getExpenseHistory = async(req, res)=>{
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Server error' });
      }
}

export{
    addExpense,
    getExpenseHistory
}

