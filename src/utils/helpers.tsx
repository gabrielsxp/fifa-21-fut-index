import { ThemeProvider } from 'styled-components'
import { render, RenderResult } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import theme from 'styles/theme'

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

type WindowSizeProps = {
  width?: number
  height?: number
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

/**
 * Function to return a attribute readable name
 * @param attr
 * @return attr with first letter capitalized and with spaces. ex: f_k_accuracy = F. K. Accuracy
 */
export const attributeReadableName = (attr?: string) => {
  if (attr) {
    let names = attr.split('_')
    names = names.map((name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1)
    })
    return names.join(' ')
  }
  return ''
}
