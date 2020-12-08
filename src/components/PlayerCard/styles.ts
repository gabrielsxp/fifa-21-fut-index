import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { PlayerCardProps } from '.'

const cardVariantModifier = {
  normal: () => css`
    width: 22rem;
    height: 30.5rem;
  `,
  small: () => css`
    width: 9rem;
    height: 11rem;
  `
}

const cardFontVariantModifier: {
  [x: string]: (variant: string) => FlattenSimpleInterpolation
} = {
  rating: (variant: string) => css`
    font-size: ${variant === 'small' ? '1.4rem' : '3.2rem'};
    line-height: ${variant === 'small' ? '1.6rem' : '3.4rem'};
    text-align: center;
    letter-spacing: ${variant === 'small' ? '-0.1rem' : '-0.1rem'};
    font-weight: ${variant === 'small' ? 'bold' : '600'};
  `,
  position: (variant: string) => css`
    font-size: ${variant === 'small' ? '1rem' : '1.4rem'};
    line-height: ${variant === 'small' ? '1.2rem' : '1.6rem'};
    text-align: center;
  `,
  name: (variant: string) => css`
    font-size: ${variant === 'small' ? '1.1rem' : '1.6rem'};
    line-height: ${variant === 'small' ? '1.2rem' : '1.8rem'};
    font-weight: ${variant === 'small' ? 'normal' : 'bold'};
    text-align: center;
    text-transform: ${variant === 'small' ? 'none' : 'uppercase'};
    letter-spacing: ${variant === 'small' ? '0' : '-0.1rem'};
  `,
  attributeName: () => css`
    font-size: 1.6rem;
    line-height: 1.8rem;
    letter-spacing: -0.1rem;
    font-weight: normal;
  `,
  attributeValue: () => css`
    font-size: 1.6rem;
    line-height: 1.8rem;
    letter-spacing: -0.1rem;
    font-weight: bold;
  `
}

export const Wrapper = styled.div<Pick<PlayerCardProps, 'variant'>>`
  position: relative;
  ${({ variant }) => css`
    cursor: pointer;
    ${cardVariantModifier[variant as keyof typeof cardVariantModifier]};
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  `}
`

export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
export const CardTop = styled.div<Pick<PlayerCardProps, 'variant'>>`
  ${({ variant }) => css`
    position: absolute;
    top: ${variant === 'small' ? '2rem' : '4.2rem'};
    left: ${variant === 'small' ? '1.2rem' : '4rem'};
    width: 100%;
    display: grid;
    grid-template-columns: ${variant === 'small'
      ? '2.3rem calc(100% - 2.3rem)'
      : '3.5rem calc(100% - 3.5rem)'};
  `}
`

export const CardBottom = styled.div<Pick<PlayerCardProps, 'variant'>>`
  ${({ variant }) => css`
    position: absolute;
    top: ${variant === 'small' ? '7.6rem' : '16.5rem'};
    left: ${variant === 'small' ? '0rem' : '5rem'};
    width: 100%;
    max-width: 12rem;
    display: flex;
    flex-direction: column;
    padding: 0.1rem 0;
  `}
`

export const NameContainer = styled.div<Pick<PlayerCardProps, 'variant'>>`
  ${({ variant }) => css`
    border-bottom: ${variant === 'small' ? 'none' : '0.1rem solid #4d331f'};
  `}
`
export const AttributesContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  > :first-child {
    &:before {
      content: '';
      position: absolute;
      top: 60%;
      right: 50%;
      height: 5rem;
      transform: translate(-50%, -50%);
      width: 0.1rem;
      background-color: #4d331f;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 1.5rem;
      height: 0.1rem;
      background-color: #4d331f;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

export const AttributeColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`

export const AttributeItem = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 0.5rem;
  }
`

type CardAttributeProps = {
  type: string
  variant?: string
}

export const TopSideAttributes = styled.div`
  display: flex;
  flex-direction: column;
`

export const CardAttribute = styled.div<CardAttributeProps>`
  ${({ type, variant }) => css`
    ${cardFontVariantModifier[type!](variant ?? '')};
  `}
  height: max-content;
  color: #4d331f;
  margin: 0;
  padding: 0;
`

export const FlagContainer = styled.div<Pick<PlayerCardProps, 'variant'>>`
  ${({ variant }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    border-left: 0;
    border-right: 0;
    position: relative;
    padding: ${variant === 'small' ? '0.1rem' : '0.5rem 0.3rem'};
    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 3rem;
      height: 0.1rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4d331f;

      display: ${variant === 'small' ? 'none' : 'block'};
    }
    &:after {
      top: 0;
    }
    &:before {
      bottom: 0;
    }
  `}
`

export const FlagImage = styled.img<Pick<PlayerCardProps, 'variant'>>`
  ${({ variant }) => css`
    width: ${variant === 'small' ? '1.3rem' : '3rem'};
    height: auto;
  `}
`

export const ClubImage = styled.img<Pick<PlayerCardProps, 'variant'>>`
  ${({ variant }) => css`
    width: ${variant === 'small' ? '1.3rem' : '2.6rem'};
    height: ${variant === 'small' ? '1.3rem' : '2.6rem'};
    margin: 0 auto;
  `}
`
export const PlayerImage = styled.img<Pick<PlayerCardProps, 'variant'>>`
  ${({ variant }) => css`
    position: relative;
    width: 100%;
    height: auto;
    max-width: ${variant === 'small' ? '4.5rem' : '12rem'};
    bottom: ${variant === 'small' ? '-1.2rem' : '0.1rem'};
  `}
`
