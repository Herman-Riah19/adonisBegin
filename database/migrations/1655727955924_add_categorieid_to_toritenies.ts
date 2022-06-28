import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'toritenies'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('categorie_id')
        .unsigned()
        .references('categories.id')
        .onDelete('SET NULL')
        .nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('categorie_id')
    })
  }
}
