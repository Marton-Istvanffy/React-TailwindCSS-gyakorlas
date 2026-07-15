import type { User } from '../types'

interface UserCardProps {
  user: User
}

function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>
        <strong className="text-gray-700">Email: </strong>
        {user.email}
      </p>
      <p>Kor: {user.age}</p>
    </div>
  )
}

export default UserCard