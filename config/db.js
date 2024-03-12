import mongoose from "mongoose";

const conectarDB = async () => {
    try {
          const db = await mongoose.connect('mongodb+srv://Daniel37:Daniel37Shady@cluster0.1velbz5.mongodb.net/bys?retryWrites=true&w=majority&appName=Cluster0', 
          {
          //  useNewUrlParser: true,
          //  useUnifiedTopology: true,
          
          });
          const url = `${db.connection.host}:${db.connection.port}`;
          console.log(`MongoDB conectado en: ${url}`);
    } catch(error){
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
};

export default conectarDB;