'use strict'

const { post } = require('@adonisjs/framework/src/Route/Manager')

const Post = use('App/Models/Post')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const posts = request.get().page || 1

    return await Post.query().paginate(posts)
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response }) {
    try {
      const { title } = request.only(['title'])

      if (await Post.findBy('title', title)) {
        return response.badRequest({ message: 'Post já cadastrado' })
      }

      const post = request.only(['title', 'content'])
      return await Post.create(post)
    } catch (error) {
      return response.internalServerError({
        message: 'Falha ao cadastrar o post',
      })
    }
  }

  async show({ params, response }) {
    try {
      return await Post.find(params.id)
    } catch (error) {
      return response.notFound({ message: 'Error, post não encontrado' })
    }
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async edit({ params, request, response }) {
    try {
      const post = await Post.findOrFail(params.id)
      const createNewPost = request.only(['title', 'content'])
      post.merge(createNewPost)

      await post.save()

      return post
    } catch (error) {
      return response.badRequest({ message: 'Falha ao atualizar o post' })
    }
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const post = await Post.findOrFail(params.id)
      await post.delete()
    } catch (error) {
      return response.badRequest({ message: 'Falha ao remover o post' })
    }
  }
}

module.exports = PostController
