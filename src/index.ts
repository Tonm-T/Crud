import 'reflect-metadata'
import { AppDataSource } from './data-source'
import dotenv from 'dotenv'
import Server from './server/server'
import { error } from 'console'

dotenv.config()

const server = new Server()
server.listen()

AppDataSource.initialize()
.then(async(conection) => {
    if(conection){
        console.log('*** connection with database successs ****')
    }
}).catch((error) => console.log(error +'Error conection with data base' + error))
