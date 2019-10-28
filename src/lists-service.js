const ListsService = {

    getAllLists(knex) {
        return knex.select('*').from('lists')
      },

    addNewList(knex, newList) {
      return knex
        .insert(newList)
        .into('lists')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('lists')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteList(knex, id) {
      return knex('lists')
        .where({ id })
        .delete()
    },
  
    updateList(knex, id, newListFields) {
      return knex('lists')
        .where({ id })
        .update(newListFields)
    },

    getByUser(knex, userId) {
        return knex('lists')
        .select('*')
        .where('user_id', userId)
    },

    getIdsByUser(knex, userId) {
        return knex('lists')
        .select('id')
        .where('user_id', userId)
    }
  }
  
  module.exports = ListsService