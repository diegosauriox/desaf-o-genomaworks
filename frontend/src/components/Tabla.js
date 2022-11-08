import React, { useState, useEffect, useMemo } from "react";
import "./tabla.css";
import { useTable } from "react-table";
import { COLUMNS } from "./Columns";

export function Tabla() {
  useEffect(() => {
    getTiendas();
  }, []);
  const [tiendas, setTiendas] = useState([]);
  const [idTienda, setIdTienda] = useState(0);
  const [nombreTienda, setNombreTienda] = useState(0);
  const [paisTienda, setPaisTienda] = useState(0);
  const [ciudadTienda, setCiudadTienda] = useState(0);
  const [calificacionTienda, setCalificacionTienda] = useState(0);
  const [visitadoTienda, setVisitadoTienda] = useState(0);
  const [tipoTienda, setTipoTienda] = useState(0);

  const editar = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/editarLugar/" + { idTienda },
      {
        nombre: nombreTienda,
        pais: paisTienda,
        ciudad: ciudadTienda,
        calificacion: calificacionTienda,
        visitado: visitadoTienda,
        id_tipo_lugar: tipoTienda,
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };

  const eliminar = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/eliminarLugar/" + { idTienda }
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };
  const añadir = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/agregarLugar/", {
      nombre: nombreTienda,
      ubicacion: paisTienda,
      calificacion: calificacionTienda,
      visitado: visitadoTienda,
      id_tipo_lugar: tipoTienda,
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };
  const getTiendas = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/listaLugares/")
      .then((response) => response.json())
      .then((data) => setTiendas(data))
      .catch((error) => console.error(error));
  };

  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columns,
    data: tiendas,
  });

  return (
    <div>
      <h1>Lista de locales</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td></td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroups) => (
            <tr {...footerGroups.getFooterGroupProps()}>
              {footerGroups.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
