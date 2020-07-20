const { uuid } = require("uuidv4");

const methodsList = {
  1: {
    name: "90210",
    rate: "6$",
    zipcode: "",
    bounders: "",
  },
  2: {
    name: "Tel Aviv",
    rate: "10$",
    zipcode: "",
    bounders: "",
  },
};

function addNewMethod(methodObj) {
  const id = uuid();
  methodsList[id] = {
    name: methodObj.methodName,
    rate: methodObj.methodRate,
    zipcode: methodObj.zipcode,
    radius: methodObj.radius,
    centerLat: methodObj.centerLat,
    centerLng: methodObj.centerLng,
  };
}

function getUserMethods(userObj) {
  //need to find suitable methods
  return methodsList;
}

module.exports = { addNewMethod, methodsList, getUserMethods };
