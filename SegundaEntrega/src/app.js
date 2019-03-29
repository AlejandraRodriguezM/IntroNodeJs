const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const bodyParser=require('body-parser')
const funciones=require('./funciones')

let flag=true;
let flagEstudianteInscrito=true;

//ruta de la carpeta public
const directoriopublico=path.join(__dirname,'../public');
app.use(express.static(directoriopublico));

//ruta de la carpeta partials
const directoriopartials=path.join(__dirname,'../partials');

//hbs
app.set('view engine','hbs');
hbs.registerPartials(directoriopartials);

//body-parser
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    //res.render('index')

})

app.get('/crearcurso', (req,res)=>{
    res.render('crearcurso',{
        flag_crearcurso:flag
    })
})

app.post('/crearcurso', (req,res)=>{
   
    // let mod;
    // if(req.body.Modalidad===undefined){
    //     mod='-'
    // }else{
    //     mod=req.body.Modalidad
    // }

    let curso={
        id:req.body.Idcurso,
        nombre:req.body.Nombrecurso,
        modalidad:req.body.Modalidad,
        valor:req.body.Valor,
        descripcion:req.body.Descripcion,
        intensidad:req.body.Intensidad,
        estado:'disponible'
    }
    flag=funciones.crearCurso(curso)
    
    if(flag){
         res.redirect('/listarcursoscoord')
    }else{
         res.redirect('/crearcurso');
    }

})

//para listar cursos por parte del coordinador
app.get('/listarcursoscoord', (req,res)=>{
    funciones.listarCursos()
    
    res.render('listarcursoscoord',{
        listCursos:listaCursos
    })
})


app.get('/cursosdisponibles', (req,res)=>{
    cursosDisponibles=funciones.listarCursosDisponibles()
    
    res.render('cursosdisponibles',{
        listCursos:cursosDisponibles
    })
})

app.get('/inscribir', (req,res)=>{
    cursosDisponibles=funciones.listarCursosDisponibles()
    
    res.render('inscribir',{
        listCursos:cursosDisponibles,
        flagEstudianteInscrito:flagEstudianteInscrito
    })
})

app.post('/inscribir', (req,res)=>{
    
    let registroestudiante={
        documento:req.body.documento,
        nombre:req.body.nombre,
        correo:req.body.correo,
        telefono:req.body.telefono,
        curso:req.body.curso
    }

    flagEstudianteInscrito=funciones.crearEstudiante(registroestudiante)

    if(flagEstudianteInscrito){
        res.redirect('/inscribir')
    }else{
        res.redirect('/inscribir')
    }
    
    res.send('inscrito')
})

app.listen(3000,()=>{
    console.log('Escuchando en el puerto 3000')
})

