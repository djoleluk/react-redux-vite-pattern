import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import Home from '../pages/home/Home'
// Import other components as needed

export default function Router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
} 