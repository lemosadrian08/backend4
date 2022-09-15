const { application } = require('express')
const express =require('express')
const contenedor1 = require ('../../contenedor')
const productos = require ('../../productos.json')
const fs = require('fs')

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

router.put('/:id', (req, res) => {
    const { params: { id }, body: { title, price, thumbnail} } = req;
    if ( !title || !price || !thumbnail) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const productIndex = productos.findIndex((element) => element.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
    const newProduct = {
        ...productos[productIndex],
        title,
        price,
        thumbnail
    };


    contenedor1.update(productIndex, newProduct)
/*     productos[productIndex] = newProduct;
    console.log(productos); */



    return res.json({ success: true, result: newProduct});
    });



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