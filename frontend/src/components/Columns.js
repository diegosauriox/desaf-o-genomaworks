import { Button } from "bootstrap"
import {ColumnFilter} from "./ColumnFilter"

import {
   
    Input
  } from "reactstrap";


export const COLUMNS=[

    {
        Header:'N°',
        accessor:'id',
        Filter: ColumnFilter,
        disableFilters:true
    },
    {
        Header:'Tipo del Lugar',
        accessor:'tipoLugar',
        Filter: ColumnFilter
    },
    {
        Header:'Nombre',
        accessor:'nombre',
        Filter: ColumnFilter
    },
    {
        Header:'País',
        accessor:'pais',
        Filter: ColumnFilter
    },
    {
        Header:'Ciudad',
        accessor:'ciudad',
        Filter: ColumnFilter
    },
    {
        Header:'Comidas',
        accessor:'comidas',
        Filter: ColumnFilter
    },
   
    {
        Header:'Calificación',
        accessor:'calificacion',
        Filter: ColumnFilter
    },
    {
        Header:'Visitado',
        accessor:(data)=>data.visitado==1 ? <Input type="checkbox" readOnly checked={true} disabled></Input>:<Input type="checkbox" readOnly checked={false} disabled></Input>,
        Filter: ColumnFilter
    },
    
    
    /* {
        Header:'Opciones',
        Cell:({row})=><div><button onClick={()=>{console.log(row.values.nombre)}}>hola</button><button>eliminar</button></div>
    }, */
    
    
]