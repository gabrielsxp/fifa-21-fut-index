import { render, screen } from '@testing-library/react'

import TeamTemplate from '.'

describe('<TeamTemplate />', () => {
  it('should render the heading', () => {
    const { container } = render(<TeamTemplate />)

    expect(screen.getByRole('heading', { name: /TeamTemplate/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
