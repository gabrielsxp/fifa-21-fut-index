import * as S from './styles'

export type PlayerCardProps = {
  variant?: 'normal' | 'small'
  quality?: string
  playerImage?: string
  playerOverall?: number
  playerPosition?: string
  playerName?: string
  playerNationImage?: string
  playerTeamImage?: string
  playerPace?: number
  playerShooting?: number
  playerPassing?: number
  playerDribbling?: number
  playerDefending?: number
  playerPhysicality?: number
}

const PlayerCard = ({
  variant = 'normal',
  quality = 'bronze',
  playerName = '',
  playerImage = '',
  playerOverall = 0,
  playerPosition = '',
  playerNationImage = '',
  playerTeamImage = '',
  playerPace = 0,
  playerShooting = 0,
  playerPassing = 0,
  playerDribbling = 0,
  playerDefending = 0,
  playerPhysicality = 0
}: PlayerCardProps) => (
  <S.Wrapper variant={variant}>
    <S.CardImage src={`/img/cards/${quality}/${variant}.png`} />
    <S.CardTop variant={variant}>
      <S.TopSideAttributes>
        <S.CardAttribute variant={variant} type="rating">
          {playerOverall}
        </S.CardAttribute>
        <S.CardAttribute variant={variant} type="position">
          {playerPosition}
        </S.CardAttribute>
        <S.FlagContainer variant={variant}>
          <S.FlagImage
            variant={variant}
            src={playerNationImage ?? '/img/notfound_club.webp'}
            alt={playerName}
          ></S.FlagImage>
        </S.FlagContainer>
        <S.ClubImage
          variant={variant}
          src={playerTeamImage}
          alt={playerName}
        ></S.ClubImage>
      </S.TopSideAttributes>
      <S.PlayerImage variant={variant} src={playerImage} alt={playerName} />
    </S.CardTop>
    <S.CardBottom variant={variant}>
      <S.NameContainer variant={variant}>
        <S.CardAttribute variant={variant} type="name">
          {playerName}
        </S.CardAttribute>
      </S.NameContainer>
      {variant === 'normal' && (
        <S.AttributesContainer>
          <S.AttributeColumn>
            <S.AttributeItem>
              <S.CardAttribute type="attributeValue">
                {playerPace}
              </S.CardAttribute>
              <S.CardAttribute type="attributeName">PAC</S.CardAttribute>
            </S.AttributeItem>
            <S.AttributeItem>
              <S.CardAttribute type="attributeValue">
                {playerShooting}
              </S.CardAttribute>
              <S.CardAttribute type="attributeName">SHO</S.CardAttribute>
            </S.AttributeItem>
            <S.AttributeItem>
              <S.CardAttribute type="attributeValue">
                {playerPassing}
              </S.CardAttribute>
              <S.CardAttribute type="attributeName">PAS</S.CardAttribute>
            </S.AttributeItem>
          </S.AttributeColumn>
          <S.AttributeColumn>
            <S.AttributeItem>
              <S.CardAttribute type="attributeValue">
                {playerDribbling}
              </S.CardAttribute>
              <S.CardAttribute type="attributeName">DRI</S.CardAttribute>
            </S.AttributeItem>
            <S.AttributeItem>
              <S.CardAttribute type="attributeValue">
                {playerDefending}
              </S.CardAttribute>
              <S.CardAttribute type="attributeName">DEF</S.CardAttribute>
            </S.AttributeItem>
            <S.AttributeItem>
              <S.CardAttribute type="attributeValue">
                {playerPhysicality}
              </S.CardAttribute>
              <S.CardAttribute type="attributeName">PHY</S.CardAttribute>
            </S.AttributeItem>
          </S.AttributeColumn>
        </S.AttributesContainer>
      )}
    </S.CardBottom>
  </S.Wrapper>
)

export default PlayerCard
