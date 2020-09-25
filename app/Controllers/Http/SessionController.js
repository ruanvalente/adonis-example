'use strict'

class SessionController {
  async store({ auth, request }) {
    const { email, password } = request.all()
    const token = auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
