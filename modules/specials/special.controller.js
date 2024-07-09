import { ObjectId } from "mongodb";
import { db } from "../../database/dbConnection.js"

  const getCarByModel= async (req, res) => {
    const { model } = req.query; 
    let car = await db.collection('cars').find({model}).toArray();
    if(car.length>0){
   return res.json({ message: "success", car });
   }
    else{
      return res.json({ message: "this model is does not found"});
    }
  
   }

   const special2 = async (req, res) => {
    const { model } = req.query; 
    const car = await db.collection('cars').find({model,rentalStatus: "available"}).toArray();
    if (car.length > 0) {
      return res.json({ message: "success", car });
    } else {
      return res.json({ message: "there is no cars with this model is available "});
    }

};

//Get Cars that are Either rented or of a Specific Model.//
const special3 = async (req, res) => {
    const { model } = req.query; 
    const car = await db.collection('cars').find({model}).toArray();
    if (car.length > 0) {
      return res.json({ message: "success", car });
    } else {
        const car = await db.collection('cars').find({rentalStatus:"rented"}).toArray();
        return res.json({ message: "success", car });
    }

};
const special4 = async (req, res) => {
    const { model } = req.query; 
    const car = await db.collection('cars').find({model,$or:[{rentalStatus:"available"},{rentalStatus:"rented"}]}).toArray();
    if (car.length > 0) {
      return res.json({ message: "success", car });
    } else {
        const car = await db.collection('cars').find({rentalStatus:"rented"}).toArray();
        return res.json({ message: "success", car });
    }

};

export{
getCarByModel,special2,special3,special4
}