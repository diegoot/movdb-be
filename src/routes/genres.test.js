const chai = require('chai')
const chaiHttp = require('chai-http')
const Genre = require('../models/Genre')
const server = require('../index')
const expect = chai.expect

chai.use(chaiHttp)

describe('Genres routes', () => {
  beforeEach(async done => {
    try {
      Genre.deleteMany({})
    } catch (err) {
      throw err
    } finally {
      done()
    }
  })

  describe('Get all genres', () => {
    it('should success', done => {
      chai
        .request(server)
        .get('/genres')
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body.length).to.equal(0)
          done()
        })
    })
  })
})
