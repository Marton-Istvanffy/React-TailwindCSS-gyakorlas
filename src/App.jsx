import { useState } from 'react'
import './App.css'
import UserCard from './components/userCard'
import UserForm from './components/UserForm'

function App() {
  const [users, setUsers] = useState([
    {name: "Teszt Elek", email:"teszt@elek.hu", age:30}
  ]);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };
  return(
    <div>
      <h1>Felhasználó kezelő</h1>
        <UserForm onAddUser={handleAddUser}/>
        <hr />
        <h2>Regisztrált felhasználók</h2>
        <div>{users.map((user, index) => (<UserCard key={index} user={user}/>
        ))}
        </div>
    </div>
  );
};

export default App;
