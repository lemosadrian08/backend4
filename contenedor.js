const fs = require('fs')

class Contenedor {
    constructor(name){
        this.name=name
    }

    async save(informacion){
        try{
            const contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            const contenidoJson = JSON.parse(contenido)
            const ultimoIndice = contenidoJson.length - 1
            const ultimoId = contenidoJson[ultimoIndice].id
            informacion.id = ultimoId + 1
            const id = informacion.id
            contenidoJson.push(informacion)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson, null, 2))


            return id
        }
        catch(error){
            console.log(error.message);
        }
    } 
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            
            return contenidoJson
        }
        catch(error){
            console.log(error.message); 
        }
    }
    async getById(id){
        try {
            const contenido = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido);
            let contenidoDentroDelArray = null;
            contenidoJson.forEach(element => {
                if (element.id==id) {
                    contenidoDentroDelArray=element;
                }
            });
            return contenidoDentroDelArray;

        } catch (error) {
            console.log(error.message);
        }
    }
    async deleteById(id){
        try{
            const contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            const contenidoJson = JSON.parse(contenido)
            const productoIndex= contenidoJson.findIndex(element=>element.id=== +id)

            if (productoIndex<0){
                return console.log("error");
            }else{
                contenidoJson.splice(productoIndex,1)
               
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson, null, 2))
                return contenidoJson

            }


        }
        catch(error){
            console.log(error.message);
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(`./${this.name}`,[])
        }catch(error){
            console.log(error.message);
        }
    }
    async update(productIndex, newProduct){
        try{
            const contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            const contenidoJson = JSON.parse(contenido)
            contenidoJson[productIndex] = newProduct;

            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson, null, 2))
            
        } catch (error) {
            console.log(error.message);
        }
    }
    }


let contenedor1 = new Contenedor ("productos.json")
module.exports=contenedor1





/* const newInfo = {
    
        "id":1,
        "title":"It",
        "price":50
} */

/* contenedor1.save(newInfo).then( resolve=>{
    console.log(resolve);
}) */

/* contenedor1.getById(4).then(resolve=>{
    console.log(resolve);
}); */

/* contenedor1.getAll().then(resolve=>{
    console.log(resolve);
}); */
/* 
contenedor1.deleteById(5) */

/* contenedor1.deleteAll() */





















/* 

const fs = require ('fs/promises')

class Contenedor {
    constructor(name){
        this.name=name
    }

    async save(informacion){
        try{
            const contenido = await fs.readFile(`./${this.name}`, 'utf-8');
            const contenidoJson = JSON.parse(contenido)
            const ultimoIndice = contenidoJson.length - 1
            const ultimoId = contenidoJson[ultimoIndice].id
            informacion.id = ultimoId + 1
            const id = informacion.id
            contenidoJson.push(informacion)
            await fs.writeFile(`./${this.name}`, JSON.stringify(contenidoJson))


            return id
        }
        catch(error){
            console.log(error.message);
        }
    }
   
    async getAll(){
        try{
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            
            return contenidoJson
        }
        catch(error){
            console.log(error.message); 
        }
    }
    async getById(id){
        try {
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido);
            let contenidoDentroDelArray = null;
            contenidoJson.forEach(element => {
                if (element.id==id) {
                    contenidoDentroDelArray=element;
                }
            });
            return contenidoDentroDelArray;

        } catch (error) {
            console.log(error.message);
        }
    }
    async deleteById(id){
        try{
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            const nuevo = contenidoJson.filter((el)=>el.id!=id)

            await fs.writeFile(`./${this.name}`, JSON.stringify(nuevo))
        }
        catch(error){
            console.log(error.message);
        }
    }
    async deleteAll(){
        try{
            await fs.writeFile(`./${this.name}`,[])
        }catch(error){
            console.log(error.message);
        }
    }
    }


let contenedor1 = new Contenedor ("productos.json")
module.exports=contenedor1
const newInfo = {
    
        "id":1,
        "title":"It",
        "price":50
}

*/