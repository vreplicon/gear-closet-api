function makeGearArray() {
    return [
        {
          id: 1,
            user_id: 1,
            gear_name: 'Crash Pad',
            gear_type: 'Rock Climbing',
            gear_weight: 14.0,
            weight_unit: 'oz',
            notes: ''
        },
        {
          id:2,
            user_id: 1,
            gear_name: 'Quickdraw',
            gear_type: 'Rock Climbing',
            gear_weight: 4.0,
            weight_unit: 'oz',
            notes: 'Made by Black Diamond'
          },
          {
            id:3,
            user_id: 1,
            gear_name: 'V Harness',
            gear_type: 'Rock Climbing',
            gear_weight: 16.0,
            weight_unit: 'oz',
            notes: 'Love this harness, although not good to take on longer trips'
          },
          {
            id:4,
            user_id: 1,
            gear_name: 'Bear Canister',
            gear_type: 'Camping',
            gear_weight: 16.5,
            weight_unit: 'oz',
            notes: ''
          },
          {
            id:5,
            user_id: 1,
            gear_name: 'Tent',
            gear_type: 'Camping',
            gear_weight: 3,
            weight_unit: 'lbs',
            notes: ''
          }
    ]
}

function makeUpdatedGear() {
  return [
    {
      id: 1,
        user_id: 1,
        gear_name: 'Crash Pad',
        gear_type: 'Rock Climbing',
        gear_weight: 14.0,
        weight_unit: 'oz',
        notes: ''
    },
      {
        id:3,
        user_id: 1,
        gear_name: 'V Harness',
        gear_type: 'Rock Climbing',
        gear_weight: 16.0,
        weight_unit: 'oz',
        notes: 'Love this harness, although not good to take on longer trips'
      },
      {
        id:4,
        user_id: 1,
        gear_name: 'Bear Canister',
        gear_type: 'Camping',
        gear_weight: 16.5,
        weight_unit: 'oz',
        notes: ''
      },
      {
        id:5,
        user_id: 1,
        gear_name: 'Tent',
        gear_type: 'Camping',
        gear_weight: 3,
        weight_unit: 'lbs',
        notes: ''
      },
      {
        id:2,
          user_id: 1,
          gear_name: 'updated gear name',
          gear_type: 'Rock Climbing',
          gear_weight: 4.0,
          weight_unit: 'oz',
          notes: 'updated notes'
        }
]
}

function makeMaliciousGear() {
    const maliciousGear = {
        id: 911,
        user_id: 1,
        gear_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
        gear_type: 'Rock Climbing',
        gear_weight: 14.0,
        weight_unit: 'oz',
        notes: 'Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.'
    }

    const expectedGear = {
        ...maliciousGear,
        gear_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        notes: 'Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.'
    }

    return {maliciousGear, expectedGear}
}


module.exports = {makeGearArray, makeUpdatedGear, makeMaliciousGear}