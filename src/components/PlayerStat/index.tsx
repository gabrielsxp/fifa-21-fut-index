import * as S from './styles'

export type PlayerStatProps = {
  stat: number
  label?: string
  scheme?: 'light' | 'dark'
  transparency?: number
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

const PlayerStat = ({
  stat,
  label,
  scheme = 'light',
  transparency = 1
}: PlayerStatProps) => {
  return (
    <S.MainWrapper aria-label="status badge">
      {!!label && (
        <S.Label aria-label="Player Stat Name" scheme={scheme}>
          {label}
        </S.Label>
      )}
      <S.Wrapper
        transparency={transparency}
        aria-label="Player Stat Badge"
        type={getPlayerStatType(stat)}
      >
        {stat}
      </S.Wrapper>
    </S.MainWrapper>
  )
}

export default PlayerStat
