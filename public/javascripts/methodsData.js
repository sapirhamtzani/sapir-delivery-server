const { uuid } = require("uuidv4");
const fetch = require("node-fetch");

const methodsList = {
  1: {
    name: "90210",
    rate: "6$",
    zipcode: "",
    radius: "400",
    centerLat: "32.09477268566945",
    centerLng: "34.77666432381626",
  },
  2: {
    name: "Tel Aviv",
    rate: "10$",
    zipcode: "",
    radius: "",
    centerLat: "",
    centerLng: "",
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

async function getUserMethods(userObj) {
  let cords = {};
  let userList = {};
  const address = userObj.address;
  const zipcode = userObj.zipcode;

  // (async () => {
  //   const response = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=AIzaSyAcsAWJRVDJlbmQiQYGSeNhHTZlWaJ1MO4`
  //   );
  //   const { results } = await response.json();
  //   cords["lat"] = results[0].geometry.location.lat;
  //   cords["lng"] = results[0].geometry.location.lng;
  //   Object.keys(methodsList).forEach((key) => {
  //     if (
  //       checkIfCordInCircleBounders(
  //         methodsList[key].centerLat,
  //         methodsList[key].centerLng,
  //         methodsList[key].radius,
  //         cords.lat,
  //         cords.lng
  //       )
  //     )
  //       userList[key] = methodsList[key];
  //     if (userObj.zipcode !== null && methodsList[zipcode] === zipcode)
  //       userList[key] = methodsList[key];
  //   });
  // })();

  const fetchRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyAcsAWJRVDJlbmQiQYGSeNhHTZlWaJ1MO4`
  );

  const { results } = await fetchRes.json();
  return { userObj, results };
  cords["lat"] = results[0].geometry.location.lat;
  cords["lng"] = results[0].geometry.location.lng;
  return cords;
  // Object.keys(methodsList).forEach((key) => {
  //   if (
  //     checkIfCordInCircleBounders(
  //       methodsList[key].centerLat,
  //       methodsList[key].centerLng,
  //       methodsList[key].radius,
  //       cords.lat,
  //       cords.lng
  //     )
  //   )
  //     userList[key] = methodsList[key];
  //   if (userObj.zipcode !== null && methodsList[key].zipcode === zipcode)
  //     userList[key] = methodsList[key];
  // });
  // return userList;
}

function checkIfCordInCircleBounders(
  centerLat,
  centerLng,
  radius,
  cordLat,
  cordLng
) {
  //pitagoras
  const vec = Math.sqrt(
    Math.pow(Number(cordLat) - Number(centerLat), 2) +
      Math.pow(Number(cordLng) - Number(centerLng), 2)
  );
  return vec <= Number(radius);
}

function findMethod(methodId) {
  const method = methodsList[methodId];
  if (method) {
    delete methodsList[methodId];
  }
  return method;
}

module.exports = { addNewMethod, methodsList, getUserMethods, findMethod };
