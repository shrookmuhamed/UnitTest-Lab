const it = require("ava").default;
const chai = require("chai");
var expect = chai.expect;
const startDB = require('../helpers/db');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { addUser } = require('../index');
const User = require('../models/user');
const sinon = require("sinon");
const utils = require('../helpers/utils')
const { getAllUsers, getSingleUser, deleteUser } = require('../index');

it.before(async (t)=>{
    t.context.mongod = await MongoMemoryServer.create();
    process.env.MONGOURI = t.context.mongod.getUri('users');
    await startDB();
}

);

it.after(async (t)=>{
 await t.context.mongod.stop({doCleanUp: true});
})
it("create use succesfully", async (t) => {
  // setup
  const request = {
    body: {
      firstName: "shrouk",
      lastName: "muhamed",
      age: 24
    },
  };
  const expectedResult = {
    fullName: "shrouk muhamed",
    age: 24
  };

  sinon.stub(utils, 'getFullName').callsFake((fname, lname)=>{
    expect(fname).to.be.equal(request.body.firstName);
    expect(lname).to.be.equal(request.body.lastName);
    return 'shrouk muhamed'
  })
  const actualResult = await addUser(request);
  const result = {
    ...expectedResult,
    __v: actualResult.__v,
    _id: actualResult._id
  }
  expect(actualResult).to.be.a('object');
  expect(actualResult._doc).to.deep.equal(result);
  t.teardown(async ()=>{
    await User.deleteMany({
        fullName: request.body.fullName,
    })
  })
  t.pass();
});

it("get all users successfully", async (t) => {
    
    const users = await User.find({});
    const result = await getAllUsers();
    expect(result).to.deep.equal(users);
    t.pass();
  });
  
  it("get single user successfully", async (t) => {
   
    const newUser = new User({
      fullName: "shrouk muhamed",
      age: 24
    });
    await newUser.save();
    
    const result = await getSingleUser({ params: { id: newUser._id } });
    expect(result._id).to.deep.equal(newUser._id);
    t.pass();
  });
  
  it("delete user successfully", async (t) => {
    
    const newUser = new User({
        fullName: "guihad yousri",
        age: 24
    });
    await newUser.save();
  
    await deleteUser({ params: { id: newUser._id } });
  
    const user = await User.findById(newUser._id);
    expect(user).to.be.null;
    t.pass();
  });
  
