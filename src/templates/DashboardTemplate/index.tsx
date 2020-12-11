import * as S from './styles'
import Navbar from 'components/Navbar'
import Heading from 'components/Heading'
import { FavoriteBorder as FavoriteIcon } from '@styled-icons/material/FavoriteBorder'
import { CompareArrows as CompareIcon } from '@styled-icons/material/CompareArrows'
import { Exit as LogoutIcon } from '@styled-icons/icomoon/Exit'
type TeamTemplateProps = {
  children?: React.ReactNodeArray | React.ReactNode
}
import MediaMatch from 'components/MediaMatch'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { ReducersProps } from 'redux-local'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const TeamTemplate = ({ children }: TeamTemplateProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector(({ userReducer }: ReducersProps) => userReducer.user)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  const logout = () => {
    localStorage.clear()
    dispatch({
      type: 'SET_USER',
      payload: { user: null }
    })
    router.push('/')
  }

  return (
    <>
      <Navbar variant />
      <S.Wrapper>
        <MediaMatch greaterThan="medium">
          <S.SideMenu>
            <S.MenuContent>
              <Heading size="small">Options</Heading>
              <S.MenuLine />
              <Link href={`/user/favorites`}>
                <S.MenuItem>
                  <S.IconWrapper>
                    <FavoriteIcon />
                  </S.IconWrapper>{' '}
                  Favorites
                </S.MenuItem>
              </Link>
              <Link href={`/user/comparisons`}>
                <S.MenuItem>
                  <S.IconWrapper>
                    <CompareIcon />
                  </S.IconWrapper>{' '}
                  Comparisons
                </S.MenuItem>
              </Link>
              <S.MenuLine />
              <S.MenuItem onClick={() => logout()}>
                <S.IconWrapper>
                  <LogoutIcon />
                </S.IconWrapper>{' '}
                Logout
              </S.MenuItem>
            </S.MenuContent>
          </S.SideMenu>
        </MediaMatch>
        <div>{children}</div>
      </S.Wrapper>
    </>
  )
}

export default TeamTemplate
