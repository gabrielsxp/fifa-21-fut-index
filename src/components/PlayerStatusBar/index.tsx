import * as S from './styles'

export type PlayerStatusBarProps = {
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

const PlayerStatusBar = ({
  stat,
  label,
  scheme = 'light'
}: PlayerStatusBarProps) => {
  return (
    <S.MainWrapper>
      {!!label && (
        <S.Label aria-label="Player Stat Name" scheme={scheme}>
          <span>{label}</span>
          <span>{stat}</span>
        </S.Label>
      )}
      <S.Wrapper>
        <S.Fill
          aria-label="Player Stat Bar"
          type={getPlayerStatType(stat)}
          stat={stat}
        />
      </S.Wrapper>
    </S.MainWrapper>
  )
}

export default PlayerStatusBar
