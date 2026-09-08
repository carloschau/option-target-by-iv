import { useState } from 'react'
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
      <Typography variant="h4" sx={{ margin: '10px 0 50px 0'}}>Calculate Expected Price of Stock by IV</Typography>
      {/* Input form */}
      <Container>
        <Box sx={{ margin: '20px' }}>
          <Box><TextField id="stock-price" label="Current Stock price" variant="standard" type="number" value={stockPrice ?? ''} onChange={(e) => {setStockPrice(parseFloat(e.target.value) || null); calculateExpectedMove();}}/></Box>
          <Box><TextField id="dte" label="Days to expiration" variant="standard" type="number" value={dte ?? ''} onChange={(e) => {setDte(parseInt(e.target.value) || null); calculateExpectedMove();}}/></Box>
          <Box><TextField id="implied-volatility" label="Implied Volatility" variant="standard" type="number" value={iv ?? ''} onChange={(e) => {setIv(parseFloat(e.target.value) || null); calculateExpectedMove();}}/></Box>
        </Box>
        <Box sx={{display: 'grid', placeItems: 'center', gridAutoFlow: 'column', justifyContent: 'space-evenly', marginTop: '50px'}} >
          <Box  >
            <Typography sx={{alignItems: 'center'}} variant="h5">Expected Move: {expectedMove}</Typography>
          </Box>
          <Box>
            <Typography variant="h5">Move Down Price: {moveDownPrice}</Typography>
            <br/>
            <Typography variant="h5">Move Up Price: {moveUpPrice}</Typography>
          </Box>
        </Box>
      </Container>

      {/* Display result */}
    </>
  )
}

export default App
