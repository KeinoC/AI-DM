let formData = [
  {
    id: 1,
    label: "Weapon",
    form: "weapons",
    inputFields: [
      {
        id: 1,
        name: "weapon name",
        label: "Weapon Name",
        placeholder: "Short Sword",
        defaultValue: "",
        type: "text"
      },
      {
        id: 2,
        name: "rank",
        label: "Rank",
        placeholder: "1",
        defaultValue: "",
        type: "number"
      },
      {
        id: 3,
        name: "type",
        label: "Type",
        placeholder: "Martial",
        defaultValue: "",
        type: "text"
      },
      {
        id: 4,
        name: "range",
        label: "Range",
        placeholder: "5",
        defaultValue: "",
        type: "number",
      },
      {
        id: 5,
        name: "hitMod",
        label: "Hit Modifier",
        placeholder: "1",
        defaultValue: "",
        type: "number"
      },
      {
        id: 6,
        name: "dmgMod",
        label: "Damage Modifier",
        placeholder: "1",
        defaultValue: "",
        type: "number"
      }
    ]
  },
  {
    id: 2,
    label: "Consumable",
    form: "items",
    inputFields: [
      {
        id: 1,
        name: "type",
        label: "Item Type",
        placeholder: "Healing",
        defaultValue: "",
        type: "text"
      },
      {
        id: 2,
        name: "numRolls",
        label: "Number of Rolls",
        placeholder: "1",
        defaultValue: "",
        type: "number"
      },
      {
        id: 3,
        name: "sides",
        label: "Dice Type",
        placeholder: 6,
        defaultValue: "",
        type: "number"
      },
      {
        id: 4,
        name: "mod",
        label: "Modifier",
        placeholder: "1",
        defaultValue: "",
        type: "number"
      }
    ]
  }
]

export default formData;