import { ObjectId } from "mongodb";
import { db } from "../../database/dbConnection.js"


const addrental= async (req,res)=>{
 const {customerId,carId,rentalDate,returnDate} = req.body;
 let customer =await db.collection('customers').findOne({ _id: new ObjectId(customerId) });
 if(!customer){
    return res.json({ message: "this customer is does not found"});
 }else{
    let car =await db.collection('cars').findOne({ _id: new ObjectId(carId) });
    if(!car){
        return res.json({ message: "this car is does not found"});
     }else{
        if(car.rentalStatus == "available"){
        await db.collection('cars').updateOne({ _id: new ObjectId(carId) }, {$set:{rentalStatus:"rented"}});
        let rental =await db.collection('rentals').insertOne({ customerId: new ObjectId(customerId) , carId: new ObjectId(carId) ,rentalDate:new Date(rentalDate).toDateString(),returnDate:new Date(returnDate).toDateString()});
        return  res.json({ message: "success",rental});
    }else{
        return res.json({ message: "this car is  not available"});
    }

     }
 }
}

   
const getrental = async (req, res) => {
    let rental = await db.collection('rentals').findOne({ _id: new ObjectId(req.params.id) });
    if(rental){
   return res.json({ message: "success", rental });
   }
    else{
      return res.json({ message: "this rental is does not found", rental });
    }

    }
const getallrental = async (req, res) => {
    let rental = await db.collection('rentals').find().toArray();
       return res.json({ message: "success", rental });
}
const updaterental = async (req, res) => {
      const { returnDate } = req.body;
      const rental = await db.collection('rentals').findOne({ _id: new ObjectId(req.params.id) });
      if (rental) {
        await db.collection('rentals').updateOne({ _id: new ObjectId(req.params.id) },{ $set: { returnDate:new Date(returnDate).toDateString()} });
        return res.json({ message: "The rental is updated"});
      } else {
        return res.status(404).json({ message: "This rental is not found." });
      }
  };

const deleterental = async (req, res) => {
    const rental = await db.collection('rentals').findOne({ _id: new ObjectId(req.params.id) });
      if (rental) {
        await db.collection('rentals').deleteOne({ _id: new ObjectId(req.params.id) });
        return res.json({ message: "The rental is deleted"});
      } else {
        return res.status(404).json({ message: "This rental is not found." });
      }
}

export{
    addrental,updaterental,deleterental,getrental,getallrental
}