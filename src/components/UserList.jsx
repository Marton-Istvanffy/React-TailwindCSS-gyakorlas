import UserCard from './UserCard';

function UserList({users}){
    //Ha nincs felvitt felhasználó
    if (users.length === 0){
        return(
            <p>Még nincsen benne felhasználó.</p>
        );
    }
    //Csinál egy UserCard tömböt
    return(
        <div>
        {users.map((user, index) => (
            <UserCard key={index} user={user} />
        ))}
        </div>
    );
}
export default UserList;
    


