import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { useTable } from "react-table";

export function Tabla() {
  const [tiendas, setTiendas] = useState([]);

  const fetchData = async () => {
    const response = fetch("http://127.0.0.1:8000/api/listaLugares/")
      .then((response) => response.json())
      .then((data) => setTiendas(data))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  /* const columns = useMemo(() => [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Ubicación",
      accessor: "ubicacion",
    },
    {
      Header: "Calificación",
      accessor: "calificacion",
    },
    {
      Header: "Visitado",
      accessor: "visitado",
    },
    {
      Header: "Tipo del Lugar",
      accessor: "tipolugar.nombre",
    },
  ]);

  const tableInstance = useTable({ columns, tiendas });

  const { getTableProps, getTableBodyProps ,headerGroups,rows,prepareRow} = tableInstance; */
   {/* <Tabla {...getTableProps()}>
        <TableHead>
            {headerGroups.map((headerGroups,)=>(
                <TableRow {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.map((column)=>(
                        <TableHeader>{...column.getHeaderProps}</TableHeader>
                    ))}
                </TableRow>
            ))}
        </TableHead>
    </Tabla> */}
  return (
   <div>
    <h1>hola</h1>
   </div>
    
  );
}
