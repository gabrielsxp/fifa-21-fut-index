import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/helpers'
import data from './mock'
import DecksCarousel from '.'

describe('<DecksCarousel />', () => {
  it('should render a carousel with many cards and a dark theme', () => {
    renderWithTheme(
      <DecksCarousel
        items={data}
        title="Selection Boxes"
        subtitle="All Special Packs released"
        color="dark"
      />
    )

    expect(
      screen.getByRole('heading', { name: /Selection Boxes/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Selection Boxes/i })
    ).toHaveStyle({
      color: '#d5057f'
    })
    expect(
      screen.getByRole('heading', {
        name: /All Special Packs released/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /All Special Packs released/i
      })
    ).toHaveStyle({ color: '#FAFAFA' })
    expect(screen.getAllByRole('link')).toHaveLength(5)
    expect(screen.getByLabelText(/Carousel Container/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/next packs/i)).toHaveStyle({
      color: '#d5057f'
    })
    expect(screen.getByLabelText(/previous packs/i)).toHaveStyle({
      color: '#d5057f'
    })
  })
})
