import express from 'express'
import cors from 'cors'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true , limit: "16K"}))
app.use(express.static('public'))
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.REQUEST_URL
             : 'http://localhost:5173',
}))

app.get('/', (req, res) => res.send('Welcome to the E-commerce API'))

// rountes import
import productsRouter from './routes/products.routes.js'
import addToCartRouter from './routes/addTocart.routes.js'

// routes declaration
app.use('/api/v1/products', productsRouter )
app.use('/api/v1/add-to-cart', addToCartRouter )

export {app}
