import { Router } from "express" 
import { addcar, deletecar, getallcar, getcar,updatecar} from "./car.controller.js"
const carRouter = Router();

carRouter.post('/',addcar)
carRouter.get('/:id',getcar)
carRouter.put('/:id',updatecar)
carRouter.delete('/:id',deletecar)
carRouter.get('/',getallcar)









export default carRouter;