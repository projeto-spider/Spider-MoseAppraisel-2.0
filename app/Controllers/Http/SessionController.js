'use strict'

class SessionController {
  async login ({ request, auth, response }) {
    const { email, password } = request.all()

    try {
      return await auth.attempt(email, password)  
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
      })
    }
    
  }

  async logout ({auth, params}) {
    return await auth.logout()
  }
}

module.exports = SessionController
