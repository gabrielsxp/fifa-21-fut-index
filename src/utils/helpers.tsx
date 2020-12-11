/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from 'styled-components'
import { render, RenderResult } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import theme from 'styles/theme'
import { ApolloError } from '@apollo/client/errors'
import { GraphQLError } from 'graphql/error/GraphQLError'

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

export const getApolloErrors = (errors: GraphQLError[]) => {
  console.log('cheguei: ', errors)
  return errors.reduce((acc: string[], error: GraphQLError) => {
    const extensions = error?.extensions
    const exception = extensions?.exception
    const messages = exception?.data?.message.map((m: any) => m.messages[0])

    console.log('messages:', messages)

    const m = messages.map((a: any) => {
      return a.message
    })

    console.log(m)

    acc = acc.concat(...m)
    return acc
  }, [])
}
