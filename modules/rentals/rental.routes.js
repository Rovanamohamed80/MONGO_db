import { Router } from "express" 
import { addrental, deleterental, getallrental, getrental,  updaterental} from "./rental.controller.js"
const rentalRouter = Router();

rentalRouter.post('/',addrental)
rentalRouter.get('/:id',getrental)
rentalRouter.put('/:id',updaterental)
rentalRouter.delete('/:id',deleterental)
rentalRouter.get('/',getallrental)







export default rentalRouter;