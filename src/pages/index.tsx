import PlayerCard from 'components/PlayerCard'
import mock from 'components/PlayerCard/mock'

export default function Home() {
  return (
    <div>
      <PlayerCard {...mock} variant="normal" />
    </div>
  )
}
