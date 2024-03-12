import Estilista from "../models/Estilista.js";
import generarJWT from "../helpers/generarJWT.js";



const registrar = async (req, res) =>{

    console.log(req.body);
    const  { email, } = req.body;

    // Prevenir clientes duplicados
    const existeCliente = await Estilista.findOne({email});

    if (existeCliente) {
       const error = new Error("Cliente ya registrado");
       return res.status(400).json({msg: error.message});
    }
    try {
        //Guardar un nuevo Estilista
        const estilista  = new Estilista (req.body);
        const estilistaGuardada = await estilista.save();
        res.json(estilistaGuardada);
    } catch (error) {
        console.log(error);
    }

};
const perfil = (req, res) => {
    res.json({msg:"Mostrando perfil..."});
};

const confirmar = async (req, res) => {
    //console.log(req.params.token);

    const { token } = req.params
    const clienteConfirmar = await Estilista.findOne({token});

  if(!clienteConfirmar) {
    const error = new Error ("token no valido"); 
    return res.status(404).json({msg: error.message});
  }

try {
   clienteConfirmar.token = null;
   clienteConfirmar.confirmado = true

   await clienteConfirmar.save();

    res.json({msg: "cliente confirmado correctamente..."});


} catch{error}{
    console.log(error);
}
};
const autenticar =  async (req, res) => {
    const { email, password } = req.body
    //comprobar si un cliente existe
    const cliente = await Estilista.findOne({ email });

if(!cliente) {
    const error = new Error ("cliente no exite"); 
    return res.status(404).json({msg: error.message});
  }

  //Comprobar si el cliente esta confirmado
  if (!cliente.confirmado) {
    const error = Error ('Tu cuenta no ha si confirmado');
    return res.status(403).json({msg: error.message});
  }

  //Autenticar el cliente
  if (await cliente.comprobarPassword (password)) {
    console.log(cliente);
  //Autenticar 
   res.json({token: generarJWT(cliente.email)});

  } else {
    const error = Error ('El password es incorrecto');
    return res.status(403).json({msg: error.message});
  }
};

export {registrar, perfil, confirmar, autenticar};