const LookupService = {

    getAllLookups(knex) {
        return knex.select('*').from('gear_lists_lookup')
      },

    addNewLookup(knex, gear, list) {
        const fieldsToInsert = gear.map(g => 
            ({ user_id: 1, gear_id: g.id, list_id: list.id })); 
      return knex
        .insert(fieldsToInsert)
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