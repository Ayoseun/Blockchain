const sha256 = require('js-sha256');
const writer = require('fs');

var QRCode = require('qrcode')




function Elixirdome(){

    this.chain = [];
    this.newDrugs =[];
   this.createNewBatchBlock(1,'0');

}

Elixirdome.prototype.allchain = function(){
     const response ={
      "chain": this.chain,
      "length" :this.chain.length
    };
    return response;
}

Elixirdome.prototype.getPrevBlock = function(){
    const lastChain = this.chain.length-1;
    return this.chain[lastChain];
}

Elixirdome.prototype.addNewDrug = function(code,serialNumber){
    let newDrug = {
        "drugcode" : code,
        "serial":serialNumber
    };
     this.newDrugs.push(newDrug);
}

Elixirdome.prototype.createNewBatchBlock = function(proof,previousBatchBlockHash){
    //this object is used to store the data
    let  newBatchBlock ={
        //this is to get the batch block number
         "BlockNumber":this.chain.length + 1,
        //this is to append the date to the block
         "Timestamp":Date.now(),
        //this adds all new drugs pending to be added into the block
         "Drugs":this.newDrugs,
        //the nonce is to validate the block
         "Proof":proof,
        //this is the previous batch block hash
        "previousBatchBlockHash":previousBatchBlockHash
             };
//this is to clear out all pending data once we have compiled all data
this.newDrugs = [];
//this is to add the new block into the chain
this.chain.push(newBatchBlock);
//return new batch as result
return newBatchBlock;


}

//check proof of chain
  Elixirdome.prototype. proof=function (prevProof){
    //new proof number
    let newProof =1;
    //math calculation to hash
  var hashOperation = sha256(JSON.stringify(newProof**30-prevProof**30));
    //while loop to find the hash that has a four leading zero
    while (hashOperation.substring(0,4)!== '0000') {
      //increase the proof until we get the number that provides the hash with leading zero
      
      newProof++;
      //call the hash again
      hashOperation =sha256(JSON.stringify(newProof**30-prevProof**30));
      //ppconsole.log(hashOperation);
     
    }
    //return to get that leading proof
    return newProof;
    
    
  }

//mine a block
Elixirdome.prototype. mineBlock= function() {
    //get previous block
    var prevBlock = this.getPrevBlock();
    //get the proof of the previous block
    var prevProof = prevBlock.Proof;
    //console.log(prevProof);
    var prevproofInt = parseInt(prevProof);
    //calculate new proof using old proof
    var proof = this.proof(prevproofInt)
    //confirm previous hash
    var prevHash = this.hash(prevBlock);
    //pass all this to block
    const block = this.createNewBatchBlock(proof,prevHash);
    //console.log(proof);
    //call the block
    this.save(this.chain);
     return (block);
  }
  
  //hash a block
 Elixirdome.prototype. hash = function(block) {
    //this is the new drug object
    const dataAsString = JSON.stringify(block);
    const hash = sha256(dataAsString);
    return hash;
  }

   //method to check the chain valdity
  Elixirdome.prototype. checkChainVaild = function(chain){
    const prev = this.chain[0];
    const blockIndex = 1;
     while (blockIndex < chain.length) {
     const blck = chain[blockIndex]; 
     if(blck.previousBatchBlockHash != this.hash(prev)){
        return false;
     };
     prev = blck;
     blockIndex += 1;
  }
 return true;
 }


 //get the previous hash keys
 Elixirdome.prototype.prevbatchblockhashbarcode = function(){
   const prevBlock = this.getPrevBlock();
   const prevBlockHash = prevBlock.previousBatchBlockHash;
   let a = JSON.stringify(prevBlockHash);
   QRCode.toFile('filename.png', a.toString(), {
  color: {
    dark: '#00F',  // Blue dots
    light: '#0000' // Transparent background
  }
}, function (err) {
  if (err) throw err
  console.log('Qr created')
})
   return prevBlockHash;
 }

//this method is to save the data to file
 Elixirdome.prototype.save =function(data){
  writer.writeFile('./chain.json',JSON.stringify(data,null,4), err =>{
    if(err){
        console.log('failed');
    }else{
       console.log('successfully written to database');
    }
   });
 }
 

 Elixirdome.prototype.generate = function(code){
 
 
  
 }

module.exports = Elixirdome;
