const { application } = require('express')
const express =require('express')
const contenedor1 = require ('../../contenedor')
const productos = require ('../../productos.json')

const router = express.Router()

//Middleware
router.use(express.json())


// Routes
router.get('/', (req,res)=>{
    contenedor1.getAll().then((products) => res.send(products)) 
})

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    contenedor1.getById(id).then((products) => 

    {if (products==null) {
        res.send({error:'no se encontro'})
    } else {
        res.send(products)
    }}
    
    )
})

router.get('/productosRandom', (req,res)=>{
    contenedor1.getById(Math.floor(Math.random()*(3-1+1))+1).then((products) => res.send(products)) 
})

router.post('/',(req,res)=>{
    console.log(contenedor1);
    const {title, price, thumbnail}=req.body
    const newProduct = {
        title,
        price,
        thumbnail,
        id: productos.length+1
    }
    contenedor1.save(newProduct)
    return res.json(newProduct)
})

/* router.put('/:id', (req,res)=>{
    const { id } = req.params
    contenedor1.getById(id).then((products) => {
        if (products==null) {
            res.send({error:'no se encontro'})
        } else {
            contenedor1.deleteById(id)
            res.send('Producto eliminado')
        }
    })
}) */



router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    contenedor1.getById(id).then((products) => {
        
        if (products==null) {
        res.send({error:'no se encontro'})
    } else {
        contenedor1.deleteById(id)
        res.send('Producto eliminado')
    }

})
    
})

module.exports = router