import * as S from './styles'

export type PlayerStatProps = {
  stat: number
  label?: string
  scheme?: 'light' | 'dark'
}

const getPlayerStatType = (stat: number) => {
  if (stat < 50) {
    return 'red'
  } else if (stat >= 50 && stat < 70) {
    return 'orange'
  } else if (stat >= 70 && stat < 90) {
    return 'light-green'
  } else {
    return 'green'
  }
}

const PlayerStat = ({ stat, label, scheme = 'light' }: PlayerStatProps) => {
  return (
    <S.MainWrapper>
      {!!label && (
        <S.Label aria-label="Player Stat Name" scheme={scheme}>
          {label}
        </S.Label>
      )}
      <S.Wrapper aria-label="Player Stat Badge" type={getPlayerStatType(stat)}>
        {stat}
      </S.Wrapper>
    </S.MainWrapper>
  )
}

export default PlayerStat
