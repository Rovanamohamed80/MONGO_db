import { ObjectId } from "mongodb";
import { db } from "../../database/dbConnection.js"


const addcar= async (req,res)=>{
 const {name,model} = req.body;
 let car =await db.collection('cars').insertOne({name,model,rentalStatus:"available"});
 return res.json({ message: "this car is added successfully", car });

}

const getcar = async (req, res) => {
    let car = await db.collection('cars').findOne({ _id: new ObjectId(req.params.id) });
    if(car){
   return res.json({ message: "success", car });
   }
    else{
      return res.json({ message: "this car is does not found", car });
    }

    }
const getallcar = async (req, res) => {
    let car = await db.collection('cars').find().toArray();
       return res.json({ message: "success", car });
}
const updatecar = async (req, res) => {
      const { name,model } = req.body;
      const car = await db.collection('cars').findOne({ _id: new ObjectId(req.params.id) });
      if (car) {
        await db.collection('cars').updateOne({ _id: new ObjectId(req.params.id) },{ $set: { name,model } });
        return res.json({ message: "The car is updated" ,car});
      } else {
        return res.status(404).json({ message: "This car is not found." });
      }
  };

const deletecar = async (req, res) => {
    const car = await db.collection('cars').findOne({ _id: new ObjectId(req.params.id) });
      if (car) {
        await db.collection('cars').deleteOne({ _id: new ObjectId(req.params.id) });
        return res.json({ message: "The car is deleted"});
      } else {
        return res.status(404).json({ message: "This car is not found." });
      }
}



export{
    addcar,updatecar,deletecar,getcar,getallcar
}