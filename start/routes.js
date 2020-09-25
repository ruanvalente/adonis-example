'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group('posts', () => {
  Route.get('index', 'PostController.index')
  Route.get('index/:id', 'PostController.show')
  Route.patch('edit/:id', 'PostController.edit')
  Route.delete('post/:id', 'PostController.destroy')
}).prefix('posts')

Route.group('post_auth', () => {
  Route.post('new', 'PostController.create')
})
  .prefix('posts')
  .middleware('auth')

Route.group('users', () => {
  Route.post('create', 'UserController.create')
  Route.get('index', 'UserController.index')
}).prefix('user')

Route.group('session', () => {
  Route.post('store', 'SessionController.store')
}).prefix('session')
