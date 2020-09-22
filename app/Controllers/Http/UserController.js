'use strict'
const User = use('App/Models/User')

class UserController {
  async create({ request, response }) {
    try {
      const { email, username } = request.only(['email', 'username'])

      if (
        (await User.findBy('username', username)) &&
        (await User.findBy('email', email))
      ) {
        return response.badRequest({ message: 'Usuário já cadastrado' })
      }

      const data = request.only(['username', 'email', 'password'])
      const newUser = User.create(data)

      return newUser
    } catch (error) {
      return response.internalServerError({
        message: 'Falha ao cadastrar usuário',
      })
    }
  }

  async index({ request, response }) {
    try {
      const users = await User.all()

      return users
    } catch (error) {}
  }
}

module.exports = UserController
