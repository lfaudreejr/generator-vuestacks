import {
  Router,
  Request,
  Response,
  NextFunction
} from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json({
    response: "Hello from the server api!"
  })
})

export default router;
