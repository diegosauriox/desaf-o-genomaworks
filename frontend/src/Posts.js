export const Posts = () => {
  return (
    <button
      onClick={() => {
        fetch("http://127.0.0.1:8000/api/listaLugares/")
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      }}
    >
      traer datos
    </button>
  );
};
