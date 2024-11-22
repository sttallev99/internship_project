import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { Provider } from 'react-redux'
import { store, persistor } from 'store'
import { PersistGate } from 'redux-persist/integration/react'

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
