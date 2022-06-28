import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database';
import Categorie from 'App/Models/Categorie';
import Toriteny from 'App/Models/Toriteny';
import UpdateToritenyValidator from 'App/Validators/UpdateToritenyValidator';

export default class ToriteniesController {

   async index ({ view, request }: HttpContextContract) {
      //const toritenies = await Toriteny.all()
      const page = request.input('page', 1)
      const toritenies = await Database.from(Toriteny.table).paginate(page, 5)
      return view.render('Toriteny/index', { toritenies });
   }

   async create({view}: HttpContextContract) {
      const toriteny = new Toriteny()
      const categories = await Categorie.all()
      return view.render('toriteny/create', { toriteny, categories })
   }

  async store({params, request, response, session}:HttpContextContract){
      await this.handleRequest(params, request)
      session.flash({success: "l'article a bien été créé"})
      return response.redirect().toRoute('home')
  }

   async editToriteny({params, view}: HttpContextContract) {
      const toriteny = await Toriteny.findOrFail(params.id)
      const categories = await Categorie.all()
      return view.render('toriteny/editToriteny', { toriteny, categories })
   }

   async updateToriteny({params, request, response, session}: HttpContextContract) {
      this.handleRequest(params, request)
      session.flash({success: "l'article a bien sauvegarder"})
      return response.redirect().toRoute('home')
   }

   async destroy({params, session, response}: HttpContextContract) {
      const toriteny = await Toriteny.findOrFail(params.id)
      await toriteny.delete()
      session.flash({success: "l'article a bien supprimer"})
      return response.redirect().toRoute('home')
   }

   private async handleRequest(params: HttpContextContract['params'], request: HttpContextContract['request']) {
      const toriteny = params.id ? await Toriteny.findOrFail(params.id): new Toriteny;
      
      const thumbnail = request.file('thumbnail_file')

       console.log(thumbnail)
      if(thumbnail){
         const newJacketName = string.generateRandom(32) + '.' + thumbnail.extname
         
         await thumbnail.moveToDisk('./', {name: newJacketName})
         toriteny.thumbnail = newJacketName
      }

      const data = await request.validate(UpdateToritenyValidator)
      toriteny
         .merge({...data, online: data.online || false} )
         .save()
   }
}
