  let expect = require('chai').expect
import db from '../../../server/db/dbConfig'
import util from '../util'


describe('Budget Table', () => {
  beforeEach( (done) => {
    util.clearDB().then(() => {
      util.populateDB( () => {
        setTimeout(done, 250)
      })
    })
  })
  after( (done) => {
    util.populateDB( () => {
        done()
    })
  })
  
  it('should have a user_id column which is an integer', (done) => {
    db.knex('budgets').columnInfo('user_id').then((info) => {
      expect(info.type).to.equal('integer')
      done()
    })
  })
  it('should have a Budget\'s table', (done) => {
    db.knex.schema.hasTable('budgets').then( (exists) => {
      expect(exists).to.equal(true)
      done()
    })
  })
  it('should have a category_id column which is an integer', (done) => {
    db.knex('budgets').columnInfo('category_id').then((info) => {
      expect(info.type).to.equal('integer')
      done()
    })
  })
  it('should have a target column which is an integer', (done) => {
    db.knex('budgets').columnInfo('target').then((info) => {
      expect(info.type).to.equal('real')
      done()
    })
  })
  it('should have a actual column which is a decimal', (done) => {
    db.knex('budgets').columnInfo('user_id').then((info) => {
      expect(info.type).to.equal('integer')
      done()
    })
  })

})

