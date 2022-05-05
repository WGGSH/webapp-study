import express from 'express'
const app: express.Express = express()

app.listen(3000, (): void => {
  console.log('start on port 3000.')
})
