export function UserCard(props) {
    return (
      <div>
        <h1>{props.name}</h1>
        <p>{props.married ? "married" : "single"}</p>
        <ul>
          <li>{props.address.city}</li>
        </ul>
      </div>
    );
  }
  