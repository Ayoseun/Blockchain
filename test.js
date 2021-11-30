const { ETXTBSY } = require('constants');
const Elixirdome = require('./elixirdome');

const elix = new Elixirdome();

//let us add a drug to the system
//add the code of the drug and then the generated serial number
elix.addNewDrug(000453,'SWDS7W68Q7S66');

//we can add more to this batch
elix.addNewDrug(000453,'SWDS7W68Q7S66');
elix.addNewDrug(000453,'SWDS7W68Q7S66');
elix.addNewDrug(000453,'SWDS7W68Q7S66');
elix.addNewDrug(000453,'SWDS7W68Q7S66');

elix.addNewDrug(000453,'SWDS7W68Q7S66');


console.log(elix.mineBlock());
console.log(elix.allchain());
//console.log(elix);
console.log(elix.prevbatchblockhashbarcode());
