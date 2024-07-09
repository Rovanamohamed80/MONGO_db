import { Router } from "express" 
import { getCarByModel, special2, special3, special4} from "./special.controller.js"
const specialRouter = Router();

specialRouter.get('/',getCarByModel)
specialRouter.get('/special2',special2)
specialRouter.get('/special3',special3)
specialRouter.get('/special4',special4)




export default specialRouter;