import request from 'supertest'
import { getConnection } from 'typeorm'
import { app } from '../App'
import createConnection from '../database'

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
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