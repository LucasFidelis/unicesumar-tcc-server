import { RequestHandler } from 'express';
import { Controller } from '../controllers/Controller';

type Adapter = (controller: Controller) => RequestHandler

export const RouterAdapter: Adapter = controller => async (req, res) => {
  const bodyRequest = {
    body: { ...req.body, ...req.query, ...req.params }
  }
  const response = await controller.handle(bodyRequest)
  const { statusCode, body } = response
  const bodyResponse = [200, 204].includes(statusCode) ? body : { error: body.message }
  res.status(statusCode).json(bodyResponse)
}