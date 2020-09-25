'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')

class UserController {
  async create({ request, response }) {
    const { email, username } = request.only(['email', 'username'])

    if (
      (await User.findBy('username', username)) &&
      (await User.findBy('email', email))
    ) {
      return response.badRequest({ message: 'Usuário já cadastrado' })
    }

    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)

    await Mail.send('emails.welcome', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from('email@email.com')
        .subject('Seja mais do que bem-vind@')
    })

    return user
  }

  async index({ request, response }) {
    try {
      const users = await User.all()

      return users
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserController
