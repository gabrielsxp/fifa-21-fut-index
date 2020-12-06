import * as S from './styles'
import { useState, useEffect } from 'react'
import { Player as PlayerProps } from 'generated/graphql'
import PlayerStat from 'components/PlayerStat'
import {
  ExpandedAccumulatorProps,
  generatePlayerFields
} from 'utils/playerMethods'
import PlayerStatusBar from 'components/PlayerStatusBar'

export type PlayerAttributesProps = {
  player: PlayerProps
}

type AttributesProps = { [x: string]: ExpandedAccumulatorProps }

const PlayerAttrbutes = ({ player }: PlayerAttributesProps) => {
  const [playerAttributes, setPlayerAttributes] = useState<AttributesProps>({})

  useEffect(() => {
    const { attributes } = generatePlayerFields(player)
    setPlayerAttributes(attributes)
  }, [player])

  return (
    <S.Wrapper>
      <S.Grid>
        {playerAttributes &&
          Object.keys(playerAttributes).map((attributeCategory, index) => {
            return (
              <S.AttributeSection key={index}>
                <S.TopAttributeWrapper>
                  <S.Heading>{attributeCategory}</S.Heading>
                  <PlayerStat
                    stat={playerAttributes[attributeCategory].weighted ?? 0}
                  />
                </S.TopAttributeWrapper>
                {playerAttributes[attributeCategory] &&
                  playerAttributes[attributeCategory].attrs.map(
                    (attribute, _index) => {
                      return (
                        <PlayerStatusBar
                          key={_index}
                          label={attribute.label}
                          stat={attribute.stat}
                          scheme="dark"
                        ></PlayerStatusBar>
                      )
                    }
                  )}
              </S.AttributeSection>
            )
          })}
      </S.Grid>
    </S.Wrapper>
  )
}

export default PlayerAttrbutes
