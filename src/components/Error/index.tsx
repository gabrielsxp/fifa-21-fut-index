import * as S from './styles'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

const Error = () => (
  <S.Wrapper>
    <S.Text>OOOOPS!</S.Text>
    <S.Title>Something went wrong while fetching data from server !</S.Title>
    <S.Subtitle>We suggest to go back to home and try again.</S.Subtitle>
    <Link href="/" passHref>
      <Button mt={8} size="lg" colorScheme="green" as="a">
        Back to Home
      </Button>
    </Link>
  </S.Wrapper>
)

export default Error
