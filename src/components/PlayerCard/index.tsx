import * as S from './styles'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

export type PlayerCardProps = {
  playerId: number
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
  isGK?: boolean
  closeSearchFunction?: Dispatch<SetStateAction<boolean>>
}

const PlayerCard = ({
  playerId,
  variant = 'normal',
  quality = 'bronze',
  playerName = '',
  playerImage = '/img/notfound_player.webp',
  playerOverall = 0,
  playerPosition = '',
  playerNationImage = '/img/notfound_club.webp',
  playerTeamImage = '/img/notfound_club.webp',
  playerPace = 0,
  playerShooting = 0,
  playerPassing = 0,
  playerDribbling = 0,
  playerDefending = 0,
  playerPhysicality = 0,
  isGK = false,
  closeSearchFunction = () => ({})
}: PlayerCardProps) => (
  <Link href={`/player/${playerId}`}>
    <S.Wrapper onClick={() => closeSearchFunction(false)} variant={variant}>
      <S.CardImage
        src={`/img/cards/${quality}/${variant}.png`}
        alt={`${playerName} player name`}
      />
      <S.CardTop variant={variant}>
        <S.TopSideAttributes>
          <S.CardAttribute
            aria-label="player rating"
            variant={variant}
            type="rating"
          >
            {playerOverall}
          </S.CardAttribute>
          <S.CardAttribute
            aria-label="player position"
            variant={variant}
            type="position"
          >
            {playerPosition}
          </S.CardAttribute>
          <S.FlagContainer variant={variant}>
            <S.FlagImage
              variant={variant}
              src={playerNationImage ?? '/img/notfound_club.webp'}
              alt={`${playerName} nation`}
            ></S.FlagImage>
          </S.FlagContainer>
          <S.ClubImage
            variant={variant}
            src={playerTeamImage}
            alt={`${playerName} team`}
          ></S.ClubImage>
        </S.TopSideAttributes>
        <S.PlayerImage
          variant={variant}
          src={playerImage}
          alt={`${playerName} picture`}
        />
      </S.CardTop>
      <S.CardBottom variant={variant}>
        <S.NameContainer variant={variant}>
          <S.CardAttribute
            aria-label="player name"
            variant={variant}
            type="name"
          >
            {playerName}
          </S.CardAttribute>
        </S.NameContainer>
        {variant === 'normal' && (
          <S.AttributesContainer>
            <S.AttributeColumn>
              <S.AttributeItem aria-label="player attribute rating">
                <S.CardAttribute type="attributeValue">
                  {playerPace}
                </S.CardAttribute>
                <S.CardAttribute type="attributeName">
                  {isGK ? 'DIV' : 'PAC'}
                </S.CardAttribute>
              </S.AttributeItem>
              <S.AttributeItem aria-label="player attribute rating">
                <S.CardAttribute type="attributeValue">
                  {playerShooting}
                </S.CardAttribute>
                <S.CardAttribute type="attributeName">
                  {isGK ? 'HAN' : 'SHO'}
                </S.CardAttribute>
              </S.AttributeItem>
              <S.AttributeItem aria-label="player attribute rating">
                <S.CardAttribute type="attributeValue">
                  {playerPassing}
                </S.CardAttribute>
                <S.CardAttribute type="attributeName">
                  {isGK ? 'KIC' : 'PAS'}
                </S.CardAttribute>
              </S.AttributeItem>
            </S.AttributeColumn>
            <S.AttributeColumn>
              <S.AttributeItem aria-label="player attribute rating">
                <S.CardAttribute type="attributeValue">
                  {playerDribbling}
                </S.CardAttribute>
                <S.CardAttribute type="attributeName">
                  {isGK ? 'REF' : 'DRI'}
                </S.CardAttribute>
              </S.AttributeItem>
              <S.AttributeItem aria-label="player attribute rating">
                <S.CardAttribute type="attributeValue">
                  {playerDefending}
                </S.CardAttribute>
                <S.CardAttribute type="attributeName">
                  {isGK ? 'SPE' : 'DEF'}
                </S.CardAttribute>
              </S.AttributeItem>
              <S.AttributeItem aria-label="player attribute rating">
                <S.CardAttribute type="attributeValue">
                  {playerPhysicality}
                </S.CardAttribute>
                <S.CardAttribute type="attributeName">
                  {isGK ? 'POS' : 'PHY'}
                </S.CardAttribute>
              </S.AttributeItem>
            </S.AttributeColumn>
          </S.AttributesContainer>
        )}
      </S.CardBottom>
    </S.Wrapper>
  </Link>
)

export default PlayerCard
