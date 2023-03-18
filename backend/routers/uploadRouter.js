/* eslint-disable import/no-extraneous-dependencies */
import express from 'express'
import multer from 'multer'
import { isAuth, isAdmin } from '../utils'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${uniqueSuffix}.${file.originalname.split('.').pop()}`)
  },
})

const upload = multer({ storage })
const uploadRouter = express.Router()

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
  res.status(201).send({ image: `/${req.file.path}` })
})

export default uploadRouter
