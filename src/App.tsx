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
    setExpectedMove(+expectedMove.toFixed(2))
    setMoveUpPrice(+(stockPrice + expectedMove).toFixed(2))
    setMoveDownPrice(+(stockPrice - expectedMove).toFixed(2))
  }

  return (
    <>
      {/* Title */}
      <Typography variant="h4" sx={{ margin: '10px 0 30px 0'}}>Calculate Expected Price of Stock by IV</Typography>
      {/* Input form */}
      <Container>
        <Box sx={{ margin: '20px' }}>
          <Box><TextField id="stock-price" label="Current Stock price" variant="standard" type="number" value={stockPrice ?? ''} onChange={(e) => {setStockPrice(parseFloat(e.target.value) || null); calculateExpectedMove();}}/></Box>
          <Box><TextField id="dte" label="Days to expiration" variant="standard" type="number" value={dte ?? ''} onChange={(e) => {setDte(parseInt(e.target.value) || null); calculateExpectedMove();}}/></Box>
          <Box><TextField id="implied-volatility" label="Implied Volatility" variant="standard" type="number" value={iv ?? ''} onChange={(e) => {setIv(parseFloat(e.target.value) || null); calculateExpectedMove();}}/></Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly', padding:'20px' }} >
          <Box sx={{ margin: '0 20px' }}>
            <Typography sx={{alignItems: 'center'}} variant="h5">Expected Move: {expectedMove}</Typography>
          </Box>
          <Box sx={{ margin: '0 20px' }}>
            <Typography variant="h5">Move Down Price: {moveDownPrice}</Typography>
            <Typography variant="h5">Move Up Price: {moveUpPrice}</Typography>
          </Box>
        </Box>
      </Container>

      {/* Display result */}
    </>
  )
}

export default App
