import express from 'express';
import { Category } from '../model/index.js'
import type { NextFunction, Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let { current = 1, pageSize = 20, name, level } = req.query
  current = parseInt(current as string);
  pageSize = parseInt(pageSize as string);
  const query = {
    ...(name && { name: name as string }),
    ...(level && { level: Number(level) }),
  }
  const data = await Category.find(query).skip((current - 1) * pageSize).limit(pageSize).populate("parent")
  const total = await Category.countDocuments(query)
  return res.status(200).json({ data, total })
})

router.post('/', async (req: Request, res: Response) => {
  const body = req.body
  // 检查分类名称是否已存在
  const existingCategory = await Category.findOne({ name: body.name })
  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: '该分类名称已存在'
    })
  }
  // 名称不存在，则创建新分类
  const categoryModel = new Category({ ...body })
  categoryModel.save()
  return res.json({ success: true })
})
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await Category.findByIdAndDelete(id)
  return res.status(200).json({ success: true })
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) { //防止无效id如undefined
    return res.status(400).json({
      success: false,
      message: '无效的图书id'
    })
  }
  const book = await Category.findById(id)
  if (book) {
    res.status(200).json({ data: book, success: true })
  } else {
    res.status(500).json({ message: "此分类不存在" })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  const body = req.body
  const { id } = req.params
  await Category.findOneAndUpdate({ _id: id }, body)
  return res.status(200).json({ success: true })
})
export default router