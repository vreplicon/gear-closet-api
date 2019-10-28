const LookupService = {

    getAllLookups(knex) {
        return knex.select('*').from('gear_lists_lookup')
      },

    addNewLookup(knex, newLookup) {
      return knex
        .insert(newLookup)
        .into('gear_lists_lookup')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('gear_lists_lookup')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteLookup(knex, id) {
      return knex('gear_lists_lookup')
        .where({ id })
        .delete()
    },
  
    updateLookup(knex, id, newLookupFields) {
      return knex('gear_lists_lookup')
        .where({ id })
        .update(newLookupFields)
    },

    getByUser(knex, userId) {
        return knex('gear_lists_lookup')
        .select('*')
        .where('user_id', userId)
    }
  }
  
  module.exports = LookupService