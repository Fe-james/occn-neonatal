
import {makeFetch} from './makeFetch'


export function createPaciente({params}){
    const query = `
    mutation {
        createPaciente(
            fecha:"${params.fecha.substring(0,10)}"
            nombre:"${params.nombre}"
            apellidos:"${params.apellidos}"
            nombreDeLaMadre:"${params.nombreDeLaMadre}"
            carnetIdentidadMadre:"${params.carnetIdentidadMadre}"
            direccion:"${params.direccion}"
            municipio:"${params.municipio}"
            provincia:"${params.provincia}"
            telefono:"${params.telefono}"
            diagnosticoIngreso:"${params.diagnosticoIngreso}"
            diagnosticoEgreso:"${params.diagnosticoEgreso}"
            alta:${params.alta===""?"EMPTY":params.alta}
            genetico:${params.genetico===""?"EMPTY":params.genetico}
            riesgo:${params.riesgo===""?"EMPTY":params.riesgo}
            precoz:${params.precoz===""?"EMPTY":params.precoz}
            numeroControl:${params.numeroControl===""?"0":params.numeroControl}
            diagPrenatal:${params.diagPrenatal===""?"EMPTY":params.diagPrenatal}
            hojaConf:${params.hojaConf===""?"EMPTY":params.hojaConf}
            accionInmediatas:${params.accionInmediatas===""?"EMPTY":params.accionInmediatas}
            cronogramaSeg:${params.cronogramaSeg===""?"EMPTY":params.cronogramaSeg}
            infoMaternidad:${params.infoMaternidad==="0"?"EMPTY":params.infoMaternidad}
            coordinacionEquipo:${params.coordinacionEquipo===""?"EMPTY":params.coordinacionEquipo}
            criterioCirujano:${params.criterioCirujano===""?"EMPTY":params.criterioCirujano}
            presenciaEnSalon:${params.presenciaEnSalon===""?"EMPTY":params.presenciaEnSalon}
            actuacionAfeccion:${params.actuacionAfeccion===""?"EMPTY":params.actuacionAfeccion}
            ginecologoAsig:${params.ginecologoAsig===""?"EMPTY":params.ginecologoAsig}
            coordinacionTraslado1:${params.coordinacionTraslado1===""?"EMPTY":params.coordinacionTraslado1}
            coincidenciaDiag:${params.coincidenciaDiag===""?"EMPTY":params.coincidenciaDiag}
            coordinacionTraslado2:${params.coordinacionTraslado2===""?"EMPTY":params.coordinacionTraslado2}
            justificTraslado:${params.justificTraslado===""?"EMPTY":params.justificTraslado}
            evaluacionTrasl:${params.evaluacionTrasl===""?"EMPTY":params.evaluacionTrasl}
            deficienciasTrasl:"${params.deficienciasTrasl}"
            interconsultCirujano:${params.interconsultCirujano===""?"EMPTY":params.interconsultCirujano}
            interconsultMedica:${params.interconsultMedica===""?"EMPTY":params.interconsultMedica}
            estudiosInterQuirurgica:${params.estudiosInterQuirurgica===""?"EMPTY":params.estudiosInterQuirurgica}
            docContrarref:${params.docContrarref===""?"EMPTY":params.docContrarref}
            programaAcciones:${params.programaAcciones===""?"EMPTY":params.programaAcciones}
            cronogramaAtencion:${params.cronogramaAtencion==="0"?"EMPTY":params.cronogramaAtencion}
            confirSegundaOpinion:${params.confirSegundaOpinion===""?"EMPTY":params.confirSegundaOpinion}
            verificarEquipoQuirurgico:${params.verificarEquipoQuirurgico===""?"EMPTY":params.verificarEquipoQuirurgico}
            verificarEquipoAnestesico:${params.verificarEquipoAnestesico===""?"EMPTY":params.verificarEquipoAnestesico}
            clasificacion:${params.clasificacion===""?"EMPTY":params.clasificacion}
        ) {
            paciente {
                fecha
                nombre
                apellidos
                nombreDeLaMadre
                carnetIdentidadMadre
                direccion
                municipio
                provincia
                telefono
                diagnosticoIngreso
                diagnosticoEgreso
                alta
                genetico
                riesgo
                precoz
                numeroControl
                diagPrenatal
                hojaConf
                accionInmediatas
                cronogramaSeg
                infoMaternidad
                coordinacionEquipo
                criterioCirujano
                presenciaEnSalon
                actuacionAfeccion
                ginecologoAsig
                coordinacionTraslado1
                coincidenciaDiag
                coordinacionTraslado2
                justificTraslado
                evaluacionTrasl
                deficienciasTrasl
                interconsultCirujano
                interconsultMedica
                estudiosInterQuirurgica
                docContrarref
                programaAcciones
                cronogramaAtencion
                confirSegundaOpinion
                verificarEquipoQuirurgico
                verificarEquipoAnestesico
                clasificacion
            }
        }
    }`
    console.log(query);
    return makeFetch({query:query})
    .then(data => {return data})
}