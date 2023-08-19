let formData = [
  {
    id: 1,
    form: "weapons",
    inputFields: [
      {
        id: 1,
        input: "weapon name",
        label: "Weapon Name",
        placeholder: "Short Sword",
        type: "text"
      },
      {
        id: 2,
        input: "rank",
        label: "Rank",
        placeholder: "1",
        type: "number"
      },
      // {
      //   id: 3,
      //   input: "id",
      //   placeholder: "weapon ID",
      //   type: "number"
      // }
      {
        id: 3,
        input: "type",
        label: "Type",
        placeholder: "Martial",
        type: "text"
      },
      {
        id: 4,
        input: "range",
        label: "Range",
        placeholder: "5",
        type: "number",
      },
      {
        id: 5,
        input: "hitMod",
        label: "Hit Modifier",
        placeholder: "1",
        type: "number"
      },
      {
        id: 5,
        input: "dmgMod",
        label: "Damage Modifier",
        placeholder: "1",
        type: "number"
      }
    ]
  },
  {
    id: 2,
    form: "items",
    inputFields: [
      {
        id: 1,
        input: "type",
        label: "Item Type",
        placeholder: "Healing",
        type: "text"
      },
      {
        id: 2,
        input: "numRolls",
        label: "Number of Rolls",
        placeholder: "1",
        type: "number"
      },
      {
        id: 3,
        input: "sides",
        label: "Dice Type",
        placeholder: 6,
        type: "number"
      },
      {
        id: 4,
        input: "mod",
        label: "Modifier",
        placeholder: "1",
        type: "number"
      }
    ]
  }
]

export default formData;