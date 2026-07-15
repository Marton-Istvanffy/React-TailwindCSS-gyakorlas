import { useState } from "react";

function UserForm({onAddUser}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge]= useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

    if (!name ||!email || !age){
        alert("Nem töltötted ki");
        return;
    }

    onAddUser({name, email, age});
    setName('');
    setEmail('');
    setAge('');
};
return(
    <form onSubmit={handleSubmit}>
        <h1>Új felhasználó hozzáadása</h1>
        <input type="text"
        placeholder="Név"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input type="number"
        placeholder="Kor"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Hozzáadás</button>

    </form>
);
}
export default UserForm;



