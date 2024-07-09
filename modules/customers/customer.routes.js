import { Router } from "express" 
import {addcustomer, deletecustomer, getallcustomer, getcustomer, signIncustomer, updatecustomer} from "./customer.controller.js"
const customerRouter = Router();

customerRouter.post('/',addcustomer)
customerRouter.post('/signin',signIncustomer)
customerRouter.get('/:id',getcustomer)
customerRouter.put('/:id',updatecustomer)
customerRouter.delete('/:id',deletecustomer)
customerRouter.get('/',getallcustomer)






export default customerRouter;