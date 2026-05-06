export function parserPreguntas(stringJson) {
    try {
        const datos = JSON.parse(stringJson).preguntas;
        let preguntas = [];
        datos.forEach((p, index) => {
            preguntas.push(p);
        });
        return preguntas;
    } catch (e) {
        console.log(`Se ha producido un error al parsear el json, stack: ${e}`);
    } 
}

export function parserRespuestas(stringJson) {
    try {
        const datos = JSON.parse(stringJson).respuestas;
        let respuestas = [];
        datos.forEach((p, index) => {
            respuestas.push(p);
        });
        return respuestas;
    } catch (e) {
        console.log(`Se ha producido un error al parsear el json, stack: ${e}`);
    } 
}