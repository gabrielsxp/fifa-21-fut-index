import * as S from './styles'
import Logo from 'components/Logo'
import { Container } from 'components/Container'
import Search from 'components/Search'
import MediaMatch from 'components/MediaMatch'
import { MenuAltRight } from '@styled-icons/boxicons-regular/MenuAltRight'
import { useState, useEffect } from 'react'
import useScrollPosition from '@react-hook/window-scroll'
import { useWindowSize } from 'utils/helpers'
import Link from 'next/link'

export type NavbarProps = {
  variant?: boolean
}
type NavbarPositionProps = 'fixed' | 'absolute'

const Navbar = ({ variant = false }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [navbarPosition, setNavbarPosition] = useState(
    'absolute' as NavbarPositionProps
  )
  const [navbarBorder, setNavbarBorder] = useState('none')
  const [navbarColor, setNavbarColor] = useState('transparent')
  const [navbarTop, setNavbarTop] = useState<number>(0)
  const scrollY = useScrollPosition(30)
  const { width } = useWindowSize()

  useEffect(() => {
    if (typeof width === 'number') {
      if (scrollY > 70 && width > 599) {
        const position = 'fixed' as NavbarPositionProps
        setNavbarPosition(position)
        setNavbarTop(0)
        setNavbarBorder('1px solid rgba(244, 5, 49, 0.3)')
        setNavbarColor('#38a9ff')
      } else if (scrollY > 70 && width <= 599) {
        const position = 'fixed' as NavbarPositionProps
        setNavbarPosition(position)
        setNavbarTop(0)
        setNavbarBorder('1px solid rgba(255, 255, 255, 0.3)')
        setNavbarColor('transparent')
      } else if (scrollY <= 70 && width > 599) {
        const position = 'absolute' as NavbarPositionProps
        setNavbarPosition(position)
        setNavbarTop(variant ? 0 : 70)
        setNavbarBorder('1px solid rgba(255, 255, 255, 0.3)')
        setNavbarColor('transparent')
      } else {
        const position = 'fixed' as NavbarPositionProps
        setNavbarPosition(position)
        setNavbarTop(0)
        setNavbarBorder('1px solid rgba(255, 255, 255, 0.3)')
        setNavbarColor('#38a9ff')
      }
    } else {
      const position = 'absolute' as NavbarPositionProps
      setNavbarPosition(position)
    }
  }, [scrollY, width, variant])

  return (
    <S.Wrapper variant={variant}>
      <MediaMatch lessThan="medium">
        <S.MobileMenu
          data-testid="menu-mobile-wrapper"
          aria-hidden={isMobileMenuOpen}
          className={isMobileMenuOpen ? 'display-mobile-menu' : ''}
        >
          <S.MobileMenuWrapper>
            <Link href="/" passHref>
              <S.NavLink aria-hidden={isMobileMenuOpen} dark>
                Home
              </S.NavLink>
            </Link>
            <Link href="/posts" passHref>
              <S.NavLink aria-hidden={isMobileMenuOpen} dark>
                Browse Posts
              </S.NavLink>
            </Link>
          </S.MobileMenuWrapper>
        </S.MobileMenu>
      </MediaMatch>
      {!variant && (
        <MediaMatch greaterThan="medium">
          <S.TopBar variant={variant}>
            <Container>
              <S.TopBarWrapper>
                <Logo />
              </S.TopBarWrapper>
            </Container>
          </S.TopBar>
        </MediaMatch>
      )}
      <S.BottomBar
        style={{
          position: navbarPosition,
          top: navbarTop,
          backgroundColor: navbarColor,
          borderBottom: navbarBorder
        }}
        variant={variant}
      >
        <Container>
          <S.NavWrapper>
            <S.ContentWrapper>
              <MediaMatch greaterThan="medium">
                {variant && <Logo />}
              </MediaMatch>
              <MediaMatch greaterThan="medium">
                <Link href="/" passHref>
                  <S.NavLink variant={variant}>Home</S.NavLink>
                </Link>
                <Link href="/posts" passHref>
                  <S.NavLink variant={variant}>Browse Posts</S.NavLink>
                </Link>
              </MediaMatch>
              <MediaMatch lessThan="medium">
                <Logo />
              </MediaMatch>
            </S.ContentWrapper>
            <Search variant={variant} />
            <MediaMatch lessThan="medium">
              <S.IconWrapper
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant={variant}
              >
                <MenuAltRight aria-label="menu icon" />
              </S.IconWrapper>
            </MediaMatch>
          </S.NavWrapper>
        </Container>
      </S.BottomBar>
    </S.Wrapper>
  )
}

export default Navbar
