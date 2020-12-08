import * as S from './styles'
import SectionBackground from 'components/SectionBackground'
import { useEffect, useState } from 'react'
import { Container } from 'components/Container'
import { Player as PlayerProps } from 'generated/graphql'
import { Nation as NationProps } from 'generated/graphql'
import { Team as TeamProps } from 'generated/graphql'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import {
  getPlayersGroupedByPosition,
  PlayerGroupAccumulatorProps
} from 'utils/teamMethods'

export type TeamHeaderProps = {
  team?: TeamProps | NationProps
}

const TeamHeader = ({ team }: TeamHeaderProps) => {
  const [barChartData, setBarChartData] = useState<
    PlayerGroupAccumulatorProps[]
  >([])
  useEffect(() => {
    if (team?.players) {
      const players = team?.players ?? []
      const chartData = getPlayersGroupedByPosition(players as PlayerProps[])
      setBarChartData(chartData)
    }
  }, [team?.players])

  return (
    <S.Wrapper>
      <SectionBackground reduced onTop>
        <Container>
          <S.Grid>
            <S.PlayerMainStatsContainer>
              <S.PlayerNameContainer>
                <S.Image
                  alt={`${team?.name} team image`}
                  src={team?.image?.url ?? '/img/notfound_player.webp'}
                ></S.Image>
                <S.PlayerMainInfoWrapper>
                  <S.Heading aria-label="player name">{team?.name}</S.Heading>
                </S.PlayerMainInfoWrapper>
              </S.PlayerNameContainer>
              <S.Line />
              <S.CommonStatsContainer>
                <S.CommomStat>Total Players:</S.CommomStat>
                <S.CommomStat>{team?.players?.length ?? 0}</S.CommomStat>
              </S.CommonStatsContainer>
            </S.PlayerMainStatsContainer>
            <S.PlayerMainStatsContainer>
              <S.SectionHeading>
                Total players on each position
              </S.SectionHeading>
              <S.ChartWrapper>
                <ResponsiveContainer>
                  <BarChart
                    width={500}
                    height={300}
                    data={barChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#38a9ff" />
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartWrapper>
            </S.PlayerMainStatsContainer>
            <S.PlayerMainStatsContainer>
              <S.SectionHeading>Average overall by position</S.SectionHeading>
              <S.ChartWrapper>
                <ResponsiveContainer>
                  <BarChart
                    width={500}
                    height={300}
                    data={barChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averageOverall" fill="#38a9ff" />
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartWrapper>
            </S.PlayerMainStatsContainer>
          </S.Grid>
        </Container>
      </SectionBackground>
    </S.Wrapper>
  )
}

export default TeamHeader
