import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Categorie from 'App/Models/Categorie'

export default class Toriteny extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string
  
  @column()
  public online: boolean

  @belongsTo(() => Categorie)
  public categorie: BelongsTo<typeof Categorie>

  @column()
  public categorieId: number

  @column()
  public thumbnail: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
