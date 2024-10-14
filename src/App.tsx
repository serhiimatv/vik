import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./app.module.css";
import { useGetUsersQuery } from "./store/api/usersApi";
import { SyntheticEvent } from "react";
import { IUser } from "./models/user";

function App() {
  const { data, isLoading, isError, isSuccess } = useGetUsersQuery();

  const handleClick = (event: SyntheticEvent, user: IUser) => {
    event.preventDefault();
    console.log(user);
  };

  if (isLoading) {
    return (
      <div className={`spinner-grow ${styles.spinner}`}>
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return <h1 className={styles.error}>Some error, try to reload page</h1>;
  }

  return (
    <>
      <h1 className="text-decoration-underline text-center py-4">User list</h1>

      {isSuccess && (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr
                className={styles.pointer}
                key={user.id}
                onClick={(event) => handleClick(event, user)}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  str. {user.address.street}, {user.address.suite},{" "}
                  {user.address.city}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
