import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { RootComponent } from 'components/RootComponent'
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
  document.getElementById('root'),
)
