

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

export async function getEquipmentListByCategory(category) {
    const res = await fetch(
        `https://www.dnd5eapi.co/api/equipment-categories/${category}`
    );
    const data = await res.json();
    if(data.length > 0) {
    // console.log('Equipment List by Category fetched');
    }
    return data;
}






