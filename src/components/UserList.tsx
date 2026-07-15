import UserCard from './UserCard.tsx'
import type { User } from '../types'

interface UserListProps {
  users: User[]
}

function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return <p>Még nincsen benne felhasználó.</p>
  }

  return (
    <div>
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  )
}

export default UserList

