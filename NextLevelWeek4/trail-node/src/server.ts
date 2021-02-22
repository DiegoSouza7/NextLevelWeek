import express from 'express'

const server = express()

server.get('/users', (req, res) => {
  return res.json('olá')
})

server.listen(3333, () => console.log('Server is running!'))