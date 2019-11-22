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
			.where({
				id
			})
			.delete()
	},

	updateList(knex, id, newListFields) {
		return knex('lists')
			.where({
				id
			})
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
	},

	getListsWithGear(knex, userId) {
		return knex('lists')
			.fullOuterJoin('gear_lists_lookup', 'lists.id', '=', 'gear_lists_lookup.list_id')
			.fullOuterJoin('gear', 'gear.id', '=', 'gear_lists_lookup.gear_id')
			.select('lists.list_name', 'lists.list_description', 'gear_lists_lookup.list_id', 'gear_lists_lookup.gear_id')
			.where('lists.user_id', userId)

	},

	groupLists(listGear) {
		let lists = []
		let listIds = []

		listGear.map(x => {
			if (!listIds.includes(x.list_id)) {
				listIds.push(x.list_id)
				lists.push({
					id: x.list_id,
					list_name: x.list_name,
					list_description: x.list_description,
					gear: []
				})
			}

			for (let i = 0; i < lists.length; i++) {
				if (lists[i].id === x.list_id) {
					lists[i].gear.push(x.gear_id)
				}
			}

		})
		return lists
	}
}

module.exports = ListsService