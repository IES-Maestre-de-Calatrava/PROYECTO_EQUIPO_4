export function Parser(stringJson) {
    try {
        const datos = JSON.parse(stringJson).keys[0];
        let datosLimpios = [];
        datos.forEach((p, index) => {
            datosLimpios.push(p);
        });
        return datosLimpios;
    } catch (e) {
        console.log(`Se ha producido un error al parsear el json, stack: ${e}`);
    } 
}