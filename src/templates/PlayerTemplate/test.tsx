import { render, screen } from '@testing-library/react'

import PlayerTemplate from '.'

describe('<PlayerTemplate />', () => {
  it('should render the heading', () => {
    const { container } = render(<PlayerTemplate />)

    expect(screen.getByRole('heading', { name: /PlayerTemplate/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
