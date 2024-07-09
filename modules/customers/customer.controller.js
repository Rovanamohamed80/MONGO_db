import { ObjectId } from "mongodb";
import { db } from "../../database/dbConnection.js"
import bcrypt from "bcrypt"

const addcustomer= async (req,res)=>{
 const {name,email,password,phoneNumber} = req.body;
 let customer =await db.collection('customers').findOne({email});
 const passHash = bcrypt.hashSync(password,8)
 if(customer){  
   return res.json({ message: "this email is already exist", customer });
   }
    else{
       let customer =await db.collection('customers').insertOne({name,email,password:passHash,phoneNumber});
       return res.json({ message: "this customer is added successfully", customer });
    }
 
}
const signIncustomer= async (req,res)=>{
    const {email,password} = req.body;
    let customer =await db.collection('customers').findOne({email});
    if(!customer || !bcrypt.compareSync(password,customer.password)){  
      return res.json({ message: "invalid email or password"});
      }
    else{
      return res.json({ message: "this customer is login successfully"});
    }
  
   }

const getcustomer = async (req, res) => {
    let customer = await db.collection('customers').findOne({ _id: new ObjectId(req.params.id) });
    if(customer){
   return res.json({ message: "success", customer });
   }
    else{
      return res.json({ message: "this customer is does not found", customer });
    }

    }
const getallcustomer = async (req, res) => {
    let customer = await db.collection('customers').find().toArray();
       return res.json({ message: "success", customer });
}
const updatecustomer = async (req, res) => {
   
      const { id } = req.params;
      const { name,phoneNumber, ownerId } = req.body;
      if (id !== ownerId) {
        return res.status(403).json({ message: "This owner is not allowed to update this customer." });
      }
      const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });
      if (customer) {
        await db.collection('customers').updateOne({ _id: new ObjectId(id) },{ $set: { name,phoneNumber } });
        return res.json({ message: "The customer is updated" });
      } else {

        return res.status(404).json({ message: "This customer is not found." });
      }
  };
  const deletecustomer = async (req, res) => {
   
    const { id } = req.params;
    const {ownerId } = req.body;
    if (id !== ownerId) {
      return res.status(403).json({ message: "This owner is not allowed to update this customer." });
    }
    const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });
    if (customer) {
      await db.collection('customers').deleteOne({ _id: new ObjectId(id) });
      return res.json({ message: "The customer is deleted" });
    } else {
      return res.status(404).json({ message: "This customer is not found." });
    }
};

// const deletecustomer = async (req, res) => {
//     let customer = await db.collection('customers').deleteOne({ _id: new ObjectId(req.params.id) });
//     res.json({ message: "this customer is deleted", customer });
// }
export{
    addcustomer,signIncustomer,updatecustomer,deletecustomer,getcustomer,getallcustomer
}