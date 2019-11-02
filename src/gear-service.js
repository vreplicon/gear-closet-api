const GearService = {

    getAllGear(knex) {
        return knex.select('*').from('gear')
      },

    addNewGear(knex, newGear) {
      return knex
        .insert(newGear)
        .into('gear')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('gear')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteGear(knex, id) {
      return knex('gear')
        .where({ id })
        .delete()
    },
  
    updateGear(knex, id, newGearFields) {
      return knex('gear')
        .where({ id })
        .update(newGearFields)
    },

    getByUser(knex, userId) {
        return knex('gear')
        .select('*')
        .where('user_id', userId)
    },

    getGearByList(knex, listId) {
        return knex.from('gear').join('gear_lists_lookup', 'gear.id', '=', 'gear_lists_lookup.gear_id')
        // return knex('gear_list_lookup')
        .select('*')
        .where('list_id', listId)
        
    },

  }
  
  module.exports = GearService