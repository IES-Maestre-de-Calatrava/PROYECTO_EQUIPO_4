export function Parser(stringJson) {
    try {
        const datos = JSON.parse(stringJson);
        console.log(datos);
        return Object.values(datos);
    } catch (e) {
        console.log(`Se ha producido un error al parsear el json, stack: ${e}`);
    } 
}