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

function findMethod(methodId) {
  const method = methodsList[methodId];
  if (method) {
    let removeIndex = methodsList
      .map(function (item) {
        return item.id;
      })
      .indexOf(methodId);
    methodsList.splice(removeIndex, 1);
    console.log("backend", methodsList);
  }
  return method;
}

module.exports = { addNewMethod, methodsList, getUserMethods, findMethod };
