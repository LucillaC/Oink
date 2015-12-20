import app from '../server'

import authHandler from '../handlers/authHandler'
import apiHandler from '../handlers/apiHandler'
import cronHandler from '../handlers/cronHandler'

// TODO: remove this after testing webhooks////////////////////////////////////////////////////////////////////////////
app.post('/webhook', (req, res) => {
  
  if (req.body.code === 2) {
    apiController.sendMessage('YAY WEBHOOK HAS FIRED!!!! You have a new transaction', 7344749351)
  }
})

app.get('/setWebhook', apiHandler.setWebhook)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/transactions', apiHandler.retrieveTransactions)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/auth/login', authHandler.login)

app.post('/auth/signup', authHandler.signup)

app.post('/auth/plaid', authHandler.plaid)

app.get('/auth/plaid', authHandler.getPlaid)

app.get('/api/initialState', apiHandler.initialState)

app.post('/api/budget/category/:id', apiHandler.addOrUpdateBudget)

app.delete('/api/budget/category/:id', apiHandler.deleteBudget)

app.post('/api/goals', apiHandler.createGoal)

app.delete('/api/goals/:id', apiHandler.deleteGoal)

app.put('/api/goals/:id', apiHandler.updateGoal)

app.get('/api/transactions', apiHandler.getTransactions)

app.get('/api/transactions/:year/:month', apiHandler.getTransactions)

app.post('/api/settings', apiHandler.settings)

app.delete('/api/deleteAccount', apiHandler.deleteAccount)

