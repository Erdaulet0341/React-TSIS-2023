import React, { useEffect, useState } from "react";

export default function NewProducts() {
  const [clients, setClients] = useState([]);

  const fetchUserData = () => {
    fetch("http://0.0.0.0:4000/api/products/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setClients(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      {clients.length > 0 && (
        <ul>
          {clients.map((user) => (
            <li key={user.id}>
              {user.id} {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
