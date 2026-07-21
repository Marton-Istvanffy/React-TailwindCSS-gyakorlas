import type { Entity, User, Animal, Drink } from '../types'

interface UserCardProps {
  entity: Entity
}

function UserCard({ entity }: UserCardProps) {
  const isUser = (item: Entity): item is User => 'email' in item
  const isAnimal = (item: Entity): item is Animal => 'species' in item
  const isDrink = (item: Entity): item is Drink => 'isFizzy' in item

  const kind = (() => {
    if (isUser(entity)) return 'user'
    if (isAnimal(entity)) return 'animal'
    if (isDrink(entity)) return 'drink'
    return 'unknown'
  })()

  const content = (() => {
    switch (kind) {
      case 'user':
        return (
          <>
            <h2>{entity.name}</h2>
            <p>Email: {(entity as User).email}</p>
            <p>Életkor: {(entity as User).age} év</p>
            <p>Rassz: {(entity as User).race}</p>
            <p>Magasság: {(entity as User).height}</p>
            <p>Csillagjegy: {(entity as User).starSign}</p>
            <p>Felnőtt-e {(entity as User).isAdult  ? 'Igen' : 'Nem'}</p>
          </>
        )

      case 'animal':
        return (
          <>
            <h2>{entity.name}</h2>
            <p>Születési dátum: {(entity as Animal).dateOfBirth.toLocaleDateString()}</p>
            <p>Fajta: {(entity as Animal).species}</p>
            <p>Életkor: {(entity as Animal).age} év</p>
            <p>Lábak száma: {(entity as Animal).numberOfLegs} db</p>
          </>
        )

      case 'drink':
        return (
          <>
            <h2>{entity.name}</h2>
            <p>Szénsavas-e: {(entity as Drink).isFizzy ? 'Igen' : 'Nem'}</p>
            <p>Alkoholos-e: {(entity as Drink).isAlcoholic ? 'Igen' : 'Nem'}</p>
            <p>Lejárati dátum: {(entity as Drink).dateOfExpiration.toLocaleDateString()}</p>
            <p>Ár: {(entity as Drink).price} Ft</p>
          </>
        )

      default:
        return (
          <>
            <h1>{entity.name}</h1>
          </>
        )
    }
  })()

  return <div className="rounded-[20px] border border-white/20 bg-gradient-to-br from-[#f5a623] to-[#d96c00] p-4 text-[#fff8e1] shadow-[0_10px_30px_rgba(0,0,0,0.15)]">{content}</div>
}

export default UserCard