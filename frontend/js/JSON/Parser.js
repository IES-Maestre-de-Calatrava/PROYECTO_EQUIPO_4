export function Parser(stringJson) {
    try {
<<<<<<< Updated upstream
        const datos = JSON.parse(stringJson);
        console.log(datos);
        return Object.values(datos);
=======
        const datos = JSON.parse(stringJson).keys[0];
        let datosLimpios = [];
        datos.forEach((p, index) => {
            datosLimpios.push(p);
        });
        return datosLimpios;
>>>>>>> Stashed changes
    } catch (e) {
        console.log(`Se ha producido un error al parsear el json, stack: ${e}`);
    } 
}