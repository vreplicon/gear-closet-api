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
  
    updateUser(knex, id, newGearFields) {
      return knex('gear')
        .where({ id })
        .update(newGearFields)
    },
  }
  
  module.exports = GearService