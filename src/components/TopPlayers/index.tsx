import * as S from './styles'
import SectionBackground from 'components/SectionBackground'
import Heading from 'components/Heading'
import { Container } from 'components/Container'
import PlayerCard from 'components/PlayerCard'
import { playerCardDataFormatted } from 'utils/playerMethods'
import { Player as PlayerProps } from 'generated/graphql'

export type TopPlayersProps = {
  players?: PlayerProps[]
  color?: string
}

const TopPlayers = ({ players, color = 'primary' }: TopPlayersProps) => (
  <S.Wrapper>
    <SectionBackground color={color} reduced>
      <Container>
        <S.ContentWrapper>
          <S.TopSection>
            <Heading color="light">Top Players</Heading>
            <Heading size="small" color="light">
              List of the top 24 players in the game.
            </Heading>
          </S.TopSection>
          <S.PlayersContainer>
            {players &&
              players.map((player: PlayerProps, index: number) => {
                return (
                  <PlayerCard
                    key={index}
                    {...playerCardDataFormatted(player)}
                    variant="small"
                  />
                )
              })}
          </S.PlayersContainer>
        </S.ContentWrapper>
      </Container>
    </SectionBackground>
  </S.Wrapper>
)

export default TopPlayers
