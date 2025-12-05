import express from 'express'
import cors from 'cors'
import { gameRouter } from './routes/game'
import { metaRouter } from './routes/meta'
import { referralsRouter } from './routes/referrals'
import { getEnv } from './config/env'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/game', gameRouter)
app.use('/api/meta', metaRouter)
app.use('/api/referrals', referralsRouter)

const { PORT } = getEnv()
app.listen(PORT, () => {
  console.log(`Alchemy Lab backend listening on port ${PORT}`)
})
