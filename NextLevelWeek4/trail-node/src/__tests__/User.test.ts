import request from 'supertest'
import { app } from '../App'
import createConnection from '../database'

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })
  it("Should be able to create a new user", async () => {
    const response = await request(app).post('/users')
      .send({
        email: "nome@exemple.com",
        name: "nome do cara"
      })
    expect(response.status).toBe(201)
  })

  it("Should not be able to create a user with exists email", async () => {
    const response = await request(app).post('/users')
      .send({
        email: "nome@exemple.com",
        name: "nome do cara"
      })
    expect(response.status).toBe(400)
  })

})