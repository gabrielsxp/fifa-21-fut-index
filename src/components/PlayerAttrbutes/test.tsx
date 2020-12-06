import { render, screen } from '@testing-library/react'

import PlayerAttrbutes from '.'

describe('<PlayerAttrbutes />', () => {
  it('should render the heading', () => {
    const { container } = render(<PlayerAttrbutes />)

    expect(screen.getByRole('heading', { name: /PlayerAttrbutes/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
