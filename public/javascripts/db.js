let MongoClient = require('mongodb').MongoClient

class StoreDB{
    constructor(){
        try {
            this.connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/billingsolutions";
            this._collections = {
                tblorders:'orders',
                tblimages:'tblImages',
                tblproductcategories:'tbl'
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @author SSW
     * @description this function is used for connecting to db
     */
    connect(){
        try {
            return new Promise((resolve, reject) => {
                const dbClient = new MongoClient(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                dbClient.connect((err,db)=>{
                    if(err)
                        reject(err);
                    else{
                        resolve(dbClient.db("billingsolutions"))
                    }
                })
                dbClient.close();
            })
        } catch (error) {
            console.error(error);
        }
    }


    update(){
        try {
            
        } catch (error) {
            console.error(error);
        }
    }

    delete(){
        try {
            
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new StoreDB();