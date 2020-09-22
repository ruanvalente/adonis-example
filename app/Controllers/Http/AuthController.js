'use strict'

class AuthController {
  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all()
      const token = auth.attempt(email, password)

      return token
    } catch (error) {
      return response.unauthorized({ message: 'Não autorizado' })
    }
  }

  async logout({ auth, response }) {
    await auth.logout()

    return response.redirect('/')
  }
}

module.exports = AuthController
