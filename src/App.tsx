import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Box, Button, Container, CssBaseline, Link, Snackbar, TextField, Typography } from '@mui/material'



function App() {
  const [stockPrice, setStockPrice] = useState<number | null>(null)
  const [dte, setDte] = useState<number | null>(null)
  const [iv, setIv] = useState<number | null>(null)
  const [expectedMove, setExpectedMove] = useState(0)
  const [moveUpPrice, setMoveUpPrice] = useState(0)
  const [moveDownPrice, setMoveDownPrice] = useState(0)

  function calculateExpectedMove() {
    if (stockPrice == null || dte == null || iv == null) {
      return
    }

    const expectedMove = stockPrice * iv *0.01 * Math.sqrt(dte / 365)
    setExpectedMove(expectedMove)
    setMoveUpPrice(stockPrice + expectedMove)
    setMoveDownPrice(stockPrice - expectedMove)
  }

  return (
    <>
      {/* Title */}
      <Typography variant="h3">Calculate Expected Price of Stock by IV</Typography>
      {/* Input form */}
      <Container>
        <TextField id="stock-price" label="Current Stock price" type="number" value={stockPrice ?? ''} onChange={(e) => {setStockPrice(parseFloat(e.target.value) || null); calculateExpectedMove();}}/>
        <TextField id="dte" label="Days to expiration" type="number" value={dte ?? ''} onChange={(e) => {setDte(parseInt(e.target.value) || null); calculateExpectedMove();}}/>
        <TextField id="implied-volatility" label="Implied Volatility" type="number" value={iv ?? ''} onChange={(e) => {setIv(parseFloat(e.target.value) || null); calculateExpectedMove();}}/>        
      </Container>

      {/* Display result */}
      <Box>
        <Typography variant="h5">Expected Move: {expectedMove}</Typography>
        <Typography variant="h5">Move Down Price: {moveDownPrice}</Typography>
        <Typography variant="h5">Move Up Price: {moveUpPrice}</Typography>
      </Box>
    </>
  )
}

export default App
