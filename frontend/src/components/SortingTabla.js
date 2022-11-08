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
} from "reactstrap";
import { COLUMNS } from "./Columns";

export function SortingTabla() {
  const [tiendas, setTiendas] = useState([]);
  const [idTienda, setIdTienda] = useState(0);
  const [nombreTienda, setNombreTienda] = useState("");
  const [paisTienda, setPaisTienda] = useState("");
  const [ciudadTienda, setCiudadTienda] = useState("");
  const [calificacionTienda, setCalificacionTienda] = useState(0);
  const [visitadoTienda, setVisitadoTienda] = useState(0);
  const [tipoTienda, setTipoTienda] = useState(0);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [actualRow, setActualRow] = useState(0);
  const [tiposLugar, setTiposLugar] = useState([]);
  const [paises, setPaises] = useState([])
  const [paisSeleccionado, setPaisSeleccionado]=useState("")
  const [currentTipoLugar, setCurrentTipoLugar]=useState("")
  const [currentVisitado, setCurrentVisitado]=useState("")
  useEffect(() => {
    getTiposTienda()
    getTiendas()
    getPaises()

  }, []);

  const valoresEditables = (values) => {
    setIdTienda(values.id);
    setNombreTienda(values.nombre);
    setPaisTienda(values.pais);
    setCiudadTienda(values.ciudad);
    setCalificacionTienda(values.calificacion);
    if(values.Visitado==="Si"){
      setVisitadoTienda(1)
    }else{
      setVisitadoTienda(0)
    }
    
    setTipoTienda(values.tipoTienda);
    console.log(values)
  };
  const editar = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/editarLugar/" + idTienda,{
        method:"POST",headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreTienda,
          pais: paisTienda,
          ciudad:ciudadTienda,
          calificacion: calificacionTienda,
          visitado: visitadoTienda,
          id_tipo_lugar: tipoTienda,
        }) })
      .then((response) => response.json())
      .catch((error) => console.error(error));
      setModalEditar(false)
      getTiendas()
  };

  const añadir = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/agregarLugar",{method:"POST",headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: nombreTienda,
      pais: paisTienda,
      ciudad:ciudadTienda,
      calificacion: calificacionTienda,
      visitado: visitadoTienda,
      id_tipo_lugar: tipoTienda,
    }) })
      .then((response) => response.json())
      .catch((error) => console.error(error));
    setModalInsertar(false)
    getTiendas()
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
    const response = await fetch("http://127.0.0.1:8000/api/filtroPais/"  ,
    {method:"POST",headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pais: paisSeleccionado,
    })
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
  const eliminarTienda = () => {
    eliminar();
    deleteRow();
  };

  const deleteRow = () => {
    let copy = [...tiendas];
    copy = copy.filter((item, index) => actualRow != index);
    setTiendas(copy);
  };

  const columns = useMemo(() => COLUMNS, []);

  const optionsHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "agregar",
        Header: "Agregar",
        Cell: ({ row }) => (
          <Button
            onClick={() => {
              setModalInsertar(true);
            }}
          >
            Agregar
          </Button>
        ),
      },
      {
        id: "edit",
        Header: "Editar",
        Cell: ({ row }) => (
          <Button
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
  const abrirModalEliminar = (row) => {
    setModalEliminar(true);
    setIdTienda(row.values.id);
    setNombreTienda(row.values.nombre);
    setActualRow(row.id);
  };
  const abrirModalEditar = (row) => {
    setModalEditar(true);
    /* setCurrentTipoLugar(row.va) */
    valoresEditables(row.values);
    console.log(idTienda);
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
      <h1>Lista de locales</h1>
      <div>
        <label>Filtrador de pais</label>
        <select onChange={(e)=>{setPaisSeleccionado(e.target.value)}}>
        <option hidden value="">Seleccione...</option>
        {paises.map((pais)=>(
          <option value={pais.pais}>{pais.pais}</option>
        ))}
        </select>
        <Button className="success" onClick={()=>{filtrarPais()}}>filtrar</Button>
        <Button className="success" onClick={()=>{getTiendas()}}>Limpiar</Button>
      </div>
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
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
        <FormGroup>
            <label>Tipo de tienda</label>
            <select
              className="form-control"
              
              onChange={(e) => {
                setTipoTienda(e.target.value);
              }} 
            ><option hidden value="">Seleccione...</option>
              {tiposLugar.map((lugar) => (
                <option
                  key={lugar.id}
                  value={lugar.id}
                  
                >
                  {lugar.nombre}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              type={"text"}
              onChange={(e) => {
                setNombreTienda(e.target.value);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <label>País</label>
            <input
              className="form-control"
              onChange={(e) => {
                setPaisTienda(e.target.value);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <label>Ciudad</label>
            <input
              className="form-control"
              onChange={(e) => {
                setCiudadTienda(e.target.value);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <label>Calificación</label>
            <input
              className="form-control"
              type="number"
              min={"0"}
              max={"5"}
              onChange={(e) => {
                setCalificacionTienda(e.target.value);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <label>Visitado</label>
            <select
              className="form-control"
              onChange={(e) => {
                setVisitadoTienda(e.target.value);
              }}
            >
              <option hidden value="">Seleccione...</option>
              <option value={1}>
              Sí
              </option>
              <option value={0}>
                No
              </option>
            </select>
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              añadir();
            }}
          >
            Insertar
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
      </Modal>
      {/* modal para editar un registro */}
      <Modal isOpen={modalEditar}>
      <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
        <FormGroup>
            <label>Tipo de tienda</label>
            <select
              className="form-control"
              value={{value:tipoTienda}}
              onChange={(e) => {
                setTipoTienda(e.target.value);
              }} 
            ><option hidden value="">Seleccione...</option>
              {tiposLugar.map((lugar) => (
                <option
                  key={lugar.id}
                  value={lugar.id}
                  
                >
                  {lugar.nombre}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              type={"text"}
              value={nombreTienda}
              onChange={(e) => {
                setNombreTienda(e.target.value);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <label>País</label>
            <input
              className="form-control"
              value={paisTienda}
              onChange={(e) => {
                setPaisTienda(e.target.value);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <label>Ciudad</label>
            <input
              className="form-control"
              value={ciudadTienda}
              onChange={(e) => {
                setCiudadTienda(e.target.value);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <label>Calificación</label>
            <input
              className="form-control"
              type="number"
              value={calificacionTienda}
              min={"0"}
              max={"5"}
              onChange={(e) => {
                setCalificacionTienda(e.target.value);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <label>Visitado</label>
            <select
              
              className="form-control"
              onChange={(e) => {
                setVisitadoTienda(e.target.value);
              }}
            >
              <option hidden value={visitadoTienda} >{visitadoTienda==1? "Si":"No"}</option>
              <option value={1}>
              Sí
              </option>
              <option value={0}>
                No
              </option>
            </select>
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{editar()}}>Editar</Button>
          <Button
            color="danger"
            onClick={() => {
              setModalEditar(false);
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
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
            <label>eliminar {nombreTienda}</label>
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
