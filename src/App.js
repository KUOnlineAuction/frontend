import { BrowserRouter, Routes, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
// Pages
import Layout from './pages/Layout'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import PlaceAuction from './pages/PlaceAuction'
import Payment from './pages/Payment'
import Shipping from './pages/Shipping'
import BillingInfo from './pages/BillingInfo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="place_auction" element={<PlaceAuction />} />
          <Route path="payment" element={<Payment />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="billing_info" element={<BillingInfo />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
