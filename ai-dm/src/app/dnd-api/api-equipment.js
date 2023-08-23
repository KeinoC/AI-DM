

export async function getApiEquipmentByIndex(index) {
    const res = await fetch(`https://www.dnd5eapi.co/api/equipment/${index}`);
    const data = await res.json();
    return data;
}


// ********** Equipment Categories **********
export async function getEquipmentCategories() {
    const res = await fetch(`https://www.dnd5eapi.co/api/equipment-categories`);
    const data = await res.json();
    return data;
}






