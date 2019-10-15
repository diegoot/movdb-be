const chai = require('chai')
const chaiHttp = require('chai-http')
const Genre = require('../models/Genre')
const server = require('../index')
const expect = chai.expect
const sinon = require('sinon')
const mongoose = require('mongoose')

chai.use(chaiHttp)

describe('Genres routes', () => {
  beforeEach(async () => {
    try {
      await Genre.deleteMany({})
    } catch (err) {
      throw err
    }
  })

  describe('Create genre', () => {
    describe('Error scenario', () => {
      beforeEach(() => {
        sinon.stub(mongoose.Model.prototype, 'save').callsFake(() => {
          throw new Error()
        })
      })

      afterEach(() => {
        mongoose.Model.prototype.save.restore()
      })

      it('should throw an error', async () => {
        try {
          const res = await chai
            .request(server)
            .post('/genres')
            .send({ name: 'Action' })
            .set(
              'Authorization',
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRzdG9yYW56b0BnbWFpbC5jb20iLCJpZCI6IjVkNDY2M2U1N2Y4YjAzODJmNDQ3M2VhYyIsImlhdCI6MTU3MTEwMjQxNSwiZXhwIjoxODg2Njc4NDE1fQ.Ag3Ak_7EAq5M_zA-uaRL-RAygoJKb2ByP3sXvkf11yE'
            )
          expect(res.status).to.equal(500)
          expect(res.body.message).to.equal('Internal Server Error')
        } catch (err) {
          expect.fail(err.message)
        }
      })
    })

    describe('Success scenario', () => {
      it('should create a new genre', async () => {
        try {
          const res = await chai
            .request(server)
            .post('/genres')
            .set(
              'Authorization',
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRzdG9yYW56b0BnbWFpbC5jb20iLCJpZCI6IjVkNDY2M2U1N2Y4YjAzODJmNDQ3M2VhYyIsImlhdCI6MTU3MTEwMjQxNSwiZXhwIjoxODg2Njc4NDE1fQ.Ag3Ak_7EAq5M_zA-uaRL-RAygoJKb2ByP3sXvkf11yE'
            )
            .send({ name: 'Action' })
          expect(res.status).to.equal(201)
        } catch (err) {
          expect.fail(err.message)
        }
      })
    })
  })

  describe('Get all genres', () => {
    describe('Error scenario', () => {
      beforeEach(() => {
        sinon.stub(Genre, 'find').callsFake(() => {
          throw new Error()
        })
      })

      afterEach(() => {
        Genre.find.restore()
      })

      it('should throw an error', async () => {
        try {
          const res = await chai.request(server).get('/genres')
          expect(res.status).to.equal(500)
          expect(res.body.message).to.equal('Internal Server Error')
        } catch (err) {
          expect.fail(err.message)
        }
      })
    })

    describe('Success scenarios', () => {
      it('should return an empty list if there are no genres', async () => {
        try {
          const res = await chai.request(server).get('/genres')
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(0)
        } catch (err) {
          expect.fail(err.message)
        }
      })

      it('should return a list with all the existing genres', async () => {
        try {
          await chai
            .request(server)
            .post('/genres')
            .set(
              'Authorization',
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRzdG9yYW56b0BnbWFpbC5jb20iLCJpZCI6IjVkNDY2M2U1N2Y4YjAzODJmNDQ3M2VhYyIsImlhdCI6MTU3MTEwMjQxNSwiZXhwIjoxODg2Njc4NDE1fQ.Ag3Ak_7EAq5M_zA-uaRL-RAygoJKb2ByP3sXvkf11yE'
            )
            .send({ name: 'Action' })
          await chai
            .request(server)
            .post('/genres')
            .set(
              'Authorization',
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRzdG9yYW56b0BnbWFpbC5jb20iLCJpZCI6IjVkNDY2M2U1N2Y4YjAzODJmNDQ3M2VhYyIsImlhdCI6MTU3MTEwMjQxNSwiZXhwIjoxODg2Njc4NDE1fQ.Ag3Ak_7EAq5M_zA-uaRL-RAygoJKb2ByP3sXvkf11yE'
            )
            .send({ name: 'Drama' })
          const res = await chai.request(server).get('/genres')
          expect(res.status).to.equal(200)
          expect(res.body.length).to.equal(2)
        } catch (err) {
          expect.fail(err.message)
        }
      })
    })
  })
})
