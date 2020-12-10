import { render, screen } from '@testing-library/react'

import PlainComparison from '.'

describe('<PlainComparison />', () => {
  it('should render the heading', () => {
    const { container } = render(<PlainComparison />)

    expect(screen.getByRole('heading', { name: /PlainComparison/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
