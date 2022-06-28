/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'ToriteniesController.index').as('home')
Route.get('/create', 'ToriteniesController.create').as('toriteny.create')
Route.post('/create', 'ToriteniesController.store')
Route.get('/article/:id', 'ToriteniesController.editToriteny').as('toriteny.edit')
Route.post('/article/:id', 'ToriteniesController.updateToriteny')
Route.delete('/article/:id', 'ToriteniesController.destroy')
