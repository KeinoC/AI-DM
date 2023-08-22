

export async function getApiEquipmentByIndex(index) {
    const res = await fetch(`https://www.dnd5eapi.co/api/equipment/${index}`);
    const data = await res.json();
    console.log(data);
    return data;
}

/**
 * Retrieves all equipment items from the D&D 5e API.
 * @returns {Promise<Array>} - An array of equipment items.
 */
// export async function getAllApiEquipment() {
//     try {
//         const allEquipment = [];
//         let page = 1;

//         while (true) {
//             const res = await fetch(`https://www.dnd5eapi.co/api/equipment?page=${page}`);
//             const data = await res.json();

//             if (data.results && data.results.length > 0) {
//                 allEquipment.push(...data.results);
//             } else {
//                 break;
//             }

//             page++;
//         }

//         // Log the retrieved data (for debugging purposes)
//         console.log(allEquipment);

//         return allEquipment;
//     } catch (error) {
//         // Handle any errors that occur during the request or JSON conversion
//         console.error('Error fetching equipment data:', error);
//         throw error;
//     }
// }




