function makeLookupsArray() {
    return [
        {
            gear_id: 1,
            list_id: 1
        },
        {
            gear_id: 2,
            list_id: 1
        },
        {
            gear_id: 3,
            list_id: 1
        },
        {
            gear_id: 4,
            list_id: 2
        },
        {
            gear_id: 5,
            list_id: 2
        }
    ]
}

function makeListsArray() {
    return [
        {
            user_id: 1,
            list_name: "The Big Climb",
            list_description: "Some description"
        },
        {
            user_id: 1,
            list_name: "Mount Whitney",
            list_description: "Going to climb that mountain"
        }
    ]
}

function makeMaliciousList() {
    const maliciousList = {
        user_id: 1,
        list_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
        list_description: 'Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.'
    }

    const expectedList = {
        ...maliciousList,
        list_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        list_description: 'Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.'
    }

    return {maliciousList, expectedList}
}


module.exports = {makeListsArray, makeLookupsArray, makeMaliciousList}