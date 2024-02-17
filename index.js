import express from 'express'
import cors from 'cors'
import Utils from './utils.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('<h1>Tracker</h1>')
})

app.get('/api/click', async (req, res) => {
  const paramsGet = req.query
  const urlDestino = paramsGet.url
  const urlPost = 'https://script.google.com/macros/s/AKfycbwbMKcDvu4VBw9FUyFxS754_h45bY-2AIzbafdGgH6dLn6Pg15uVk2QG55XTMyLGQK8/exec'

  const paramsPost = {
    emailToTrack: paramsGet.email,
    base: paramsGet.base,
    date: paramsGet.date
  }

  try {
    await Utils.axiosPost(urlPost, paramsPost)

    res.redirect(urlDestino)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Error')
  }
})

app.use((req, res) => {
  res.send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listing on port ${PORT}`)
})
