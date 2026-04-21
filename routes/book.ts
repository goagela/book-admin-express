import express from 'express';
import { Book } from '../model/index.js'
import type { NextFunction, Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let { current = 1, pageSize = 20, name, author, category } = req.query
  current = parseInt(current as string);
  pageSize = parseInt(pageSize as string);
  const query = {
    ...(name && { name: name as string }),
    ...(author && { author: author as string }),
    ...(category && { category: category as string }),
  }
  const data = await Book.find(query).skip((current - 1) * pageSize).limit(pageSize)
  const total = await Book.countDocuments(query)
  return res.status(200).json({ data, total })
})
router.post('/', (req: Request, res: Response) => {
  const body = req.body
  console.log(body);
  const bookModel = new Book({ ...body })
  bookModel.save()
  return res.json({ success: true })
})
export default router