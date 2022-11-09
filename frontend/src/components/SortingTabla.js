import React, { useState, useEffect, useMemo } from "react";
import "./tabla.css";
import { useTable, useSortBy, useFilters } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Input,
} from "reactstrap";
import { COLUMNS } from "./Columns";
import { number } from "prop-types";

export function SortingTabla() {

  //Creacion de react hooks

  const [tiendas, setTiendas] = useState([]);
  const [idTienda, setIdTienda] = useState(0);
  const [nombreTienda, setNombreTienda] = useState("");
  const [paisTienda, setPaisTienda] = useState("");
  const [ciudadTienda, setCiudadTienda] = useState("");
  const [calificacionTienda, setCalificacionTienda] = useState(0);
  const [visitadoTienda, setVisitadoTienda] = useState(0);
  const [tipoTienda, setTipoTienda] = useState("");
  const [comidasTienda, setComidasTienda] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [actualRow, setActualRow] = useState(0);
  const [tiposLugar, setTiposLugar] = useState([]);
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState("");


  // Creacion de useEffect que buscara información desde la DB al abrir la página
  useEffect(() => {
    getTiposTienda();
    getTiendas();
    getPaises();
  }, []);


  //Editar valores de los hooks para los formularios de añadir y editar
  const valoresEditables = (values) => {
    console.log(values.Visitado.props.checked)
    setIdTienda(values.id);
    setNombreTienda(values.nombre);
    setPaisTienda(values.pais);
    setCiudadTienda(values.ciudad);
    setCalificacionTienda(values.calificacion);
    if (values.Visitado.props.checked) {
      setVisitadoTienda(1);
    } else {
      setVisitadoTienda(0);
    }
    setComidasTienda(values.comidas);
    setTipoTienda(values.tipoLugar);
  };
  const valoresDefault=()=>{
    setIdTienda(0);
    setNombreTienda("");
    setPaisTienda("");
    setCiudadTienda("");
    setCalificacionTienda(0);
    setVisitadoTienda(0);
    setComidasTienda("");
    setTipoTienda("");
  }

  //handleSubmit para ambos formularios
  const handleSubmitAñadir = (e) => {
    e.preventDefault();    
    añadir()
  };
  const handleSubmitEditar = (e) => {
    e.preventDefault();    
    editar()
  };

  //Metodos fetch para obtener los datos desde la DB
  const editar = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/editarLugar/" + idTienda,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombreTienda,
          pais: paisTienda,
          ciudad: ciudadTienda,
          comidas: comidasTienda,
          calificacion: calificacionTienda,
          visitado: visitadoTienda,
          tipoLugar: tipoTienda,
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));
    setModalEditar(false);
    getTiendas();
  };

  const añadir = async () => {
    await fetch("http://127.0.0.1:8000/api/agregarLugar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombreTienda,
        pais: paisTienda,
        ciudad: ciudadTienda,
        comidas: comidasTienda,
        calificacion: calificacionTienda,
        visitado: visitadoTienda,
        tipoLugar: tipoTienda,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
    setModalInsertar(false);
    getTiendas();
    getPaises()
  };
  const getTiendas = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/listaLugares/")
      .then((response) => response.json())
      .then((data) => setTiendas(data))
      .catch((error) => console.error(error));
  };
  const getPaises = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/paises/")
      .then((response) => response.json())
      .then((data) => setPaises(data))
      .catch((error) => console.error(error));
  };
  const getTiposTienda = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/tipoLugar/")
      .then((response) => response.json())
      .then((data) => setTiposLugar(data))
      .catch((error) => console.error(error));
  };
  const filtrarPais = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/filtroPais/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pais: paisSeleccionado,
      }),
    })
      .then((response) => response.json())
      .then((data) => setTiendas(data))
      .catch((error) => console.error(error));
  };
  const eliminar = async () => {
    const response = fetch(
      "http://127.0.0.1:8000/api/eliminarLugar/" + idTienda
    )
      .then()
      .catch((error) => console.error(error));

    setModalEliminar(false);
  };

  //Metodos para abrir los modales de añadir, editar y eliminar
  const abrirModalAñadir=(valor)=>{
    setModalInsertar(true)
    valoresDefault()
  }
  const abrirModalEliminar = (row) => {
    setModalEliminar(true);
    setIdTienda(row.values.id);
    setNombreTienda(row.values.nombre);
    setActualRow(row.id);
  };
  const abrirModalEditar = (row) => {
    setModalEditar(true);
    valoresEditables(row.values);
  };

  //Metodos para actualizar la tabla cuando se elimine una fila
  const eliminarTienda = () => {
    eliminar();
    deleteRow();
  };

  const deleteRow = () => {
    let copy = [...tiendas];
    copy = copy.filter((item, index) => actualRow != index);
    setTiendas(copy);
  };


  //Sección para añadir botones y propiedades a la tabla de react-table
  const columns = useMemo(() => COLUMNS, []);

  const optionsHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,

      {
        id: "edit",
        Header: "Editar",
        Cell: ({ row }) => (
          <Button
            color="primary"
            onClick={() => {
              abrirModalEditar(row);
            }}
          >
            Editar
          </Button>
        ),
      },
      {
        id: "eliminar",
        Header: "Eliminiar",
        Cell: ({ row }) => (
          <Button
            color="danger"
            onClick={() => {
              abrirModalEliminar(row);
            }}
          >
            Eliminar
          </Button>
        ),
      },
    ]);
  };
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: columns,
      data: tiendas,
    },
    optionsHooks,
    useFilters,
    useSortBy
  );

  return (
    <div>
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <h1>Lista de locales</h1>
      </div>

      <div class="row">
        <div class="col-5">
          <Button
            color="primary"
            class="btn btn-primary btn-lg"
            style={{ textAlign: "left" }}
            onClick={() => {
              abrirModalAñadir(true);
            }}
          >
            Insertar nuevo Lugar para comer
          </Button>
        </div>
        <div class="col">
          <h2>Filtrador por pais</h2>
          {"   "}
          <select
            onChange={(e) => {
              setPaisSeleccionado(e.target.value);
            }}
          >
            <option hidden value="">
              País...
            </option>
            {paises.map((pais) => (
              <option value={pais.pais}>{pais.pais}</option>
            ))}
          </select>
          {"   "}
          <Button
            color="success"
            onClick={() => {
              filtrarPais();
            }}
          >
            Filtrar
          </Button>
          {"   "}
          <Button
            color="success"
            onClick={() => {
              getTiendas();
            }}
          >
            Limpiar
          </Button>
        </div>
      </div>
      <br />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* modal para añadir nuevo registro */}
      <Modal isOpen={modalInsertar}>
        <form onSubmit={handleSubmitAñadir}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Tipo de tienda</label>
            <select
            required
              className="form-control"
              onChange={(e) => {
                setTipoTienda(e.target.value);
              }}
            >
              <option hidden value="">
                Seleccione...
              </option>
              {tiposLugar.map((lugar) => (
                <option key={lugar.id} value={lugar.nombre}>
                  {lugar.nombre}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <label>Nombre</label>
            <Input
            required
              className="form-control"
              type={"text"}
              onChange={(e) => {
                setNombreTienda(e.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <label>País</label>
            <Input
            oninvalid="alert('Hey, you missed something on modal!')"
              required
              type={"text"}
              className="form-control"
              onChange={(e) => {
                setPaisTienda(e.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <label>Ciudad</label>
            <Input
              required
              type={"text"}
              className="form-control"
              onChange={(e) => {
                setCiudadTienda(e.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <label>Comidas y/o Bebestibles </label>
            <Input
              required
              type={"textarea"}
              className="form-control"
              onChange={(e) => {
                setComidasTienda(e.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <label>Visitado</label>
            <select
              required
              className="form-control"
              onChange={(e) => {
                setVisitadoTienda(e.target.value);
              }}
            >
              <option hidden value="">
                Seleccione...
              </option>
              <option value={1}>Sí</option>
              <option value={0}>No</option>
            </select>
          </FormGroup>
          {visitadoTienda == 1 && (
            <FormGroup>
              <label>Calificación</label>
              <Input
                className="form-control"
                type={"number"}
                min={"0"}
                max={"100"}
                onChange={(e) => {
                  setCalificacionTienda(e.target.value);
                }}
              ></Input>
            </FormGroup>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
          >
           Agregar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsertar(false);
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
        </form>
      </Modal>
      {/* modal para editar un registro */}
      <Modal isOpen={modalEditar}>
        <form onSubmit={handleSubmitEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Tipo de tienda</label>
            <select
            required
              className="form-control"
              onChange={(e) => {
                setTipoTienda(e.target.value);
              }}
            >
              <option hidden value={tipoTienda}>
                {tipoTienda}
              </option>
              {tiposLugar.map((lugar) => (
                <option key={lugar.id} value={lugar.nombre}>
                  {lugar.nombre}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <label>Nombre</label>
            <Input
            required
              className="form-control"
              type={"text"}
              value={nombreTienda}
              onChange={(e) => {
                setNombreTienda(e.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <label>País</label>
            <Input
            required
              type={"text"}
              className="form-control"
              value={paisTienda}
              onChange={(e) => {
                setPaisTienda(e.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <label>Ciudad</label>
            <Input
            required
              type={"text"}
              className="form-control"
              value={ciudadTienda}
              onChange={(e) => {
                setCiudadTienda(e.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <label>Comidas</label>
            <Input
            required
              type={"textarea"}
              className="form-control"
              value={comidasTienda}
              onChange={(e) => {
                setComidasTienda(e.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <label>Visitado</label>
            <select
              required
              className="form-control"
              disabled={visitadoTienda==1 ? true :false}
              onChange={(e) => {
                setVisitadoTienda(e.target.value);
              }}
            >
              <option hidden value={visitadoTienda}>
                {visitadoTienda == 1 ? "Si" : "No"}
              </option>
              
              <option value={1}>Sí</option>
              <option value={0}>No</option>
            </select>
          </FormGroup>
          {visitadoTienda == 1 && (
            <FormGroup>
              <label>Calificación</label>
              <Input
                className="form-control"
                type={"number"}
                value={calificacionTienda}
                min={"0"}
                max={"100"}
                onChange={(e) => {
                  setCalificacionTienda(e.target.value);
                }}
              ></Input>
            </FormGroup>
          )}
          
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
          >
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalEditar(false);
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
        </form>
      </Modal>
      {/* modal para eliminar un registro */}
      <Modal isOpen={modalEliminar}>
        <ModalHeader>
          <div>
            <h3>Eliminar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Eliminar: {nombreTienda}</label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              eliminarTienda();
            }}
          >
            Eliminar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalEliminar(false);
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
