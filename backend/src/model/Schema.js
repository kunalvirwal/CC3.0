const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name:{type : String, required: true},
    phno:{type : Number, required: true},
    email:{type : String, required: true},
    aadhar:{type : String, required: true},
    voterID:{type : String, required: true},
    ward:{type : String, required: true},
    upvotes:{type: [String]}  // stores issue IDs
});

const Person = mongoose.model("Person", personSchema);  // collection person

const issueSchema = new Schema({
    senderID:{type : String, required: true},
    senderWard:{type : String, required: true},
    issueWard:{type : String, required: true},
    heading:{type : String, required: true},
    body:{type : String},
    upvotes:{type : Number, required: true},
    completed:{type : Boolean, required: true},
    tags:{ type: [String], required: true },
    messages:{ type : [{
        sender: { type: String, required: true },
        content: { type: String, required: true },
        sentAt: { type: String, required: true }        
    }]} 
}) 

const Issue = mongoose.model("Issue", issueSchema);  // collection person

const wardSchema = new Schema({
    wardName: { type: String, required: true },
    tags: { type: [String], required: true },
    wardCouncillor: { type: String, required: true }
})

const Ward = mongoose.model("Ward", wardSchema);  // collection person

const wardListSchema = new Schema({
    wardName: { type: String, required: true }
})

const WardList = mongoose.model("WardList", wardSchema);  // collection person


module.exports={
    Person,
    Issue,
    Ward,
    WardList
}
