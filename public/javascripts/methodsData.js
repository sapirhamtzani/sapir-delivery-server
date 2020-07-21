const { uuid } = require("uuidv4");
const fetch = require("node-fetch");
const firebase = require('firebase');
require('firebase/database');

function checkData(){
  let data = firebase.database().ref('/methods/methodId');
  return data;
}
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

  const fetchRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyAcsAWJRVDJlbmQiQYGSeNhHTZlWaJ1MO4`
  );

  const { results } = await fetchRes.json();
  cords["lat"] = results[0].geometry.location.lat;
  cords["lng"] = results[0].geometry.location.lng;
  Object.keys(methodsList).forEach((key) => {
    if (
      checkIfCordInCircleBounders(
        Number(methodsList[key].centerLat),
        Number(methodsList[key].centerLng),
        Number(methodsList[key].radius),
        Number(cords.lat),
        Number(cords.lng)
      )
    )
      userList[key] = methodsList[key];
    if (userObj.zipcode !== null && methodsList[key].zipcode === zipcode)
      userList[key] = methodsList[key];
  });
  return userList;
}

function checkIfCordInCircleBounders(
  centerLat,
  centerLng,
  radius,
  cordLat,
  cordLng
) {
  let deg2rad = (n) => {
    return Math.tan(n * (Math.PI / 180));
  };

  let dLat = deg2rad(cordLat - centerLat);
  let dLon = deg2rad(cordLng - centerLng);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(centerLat)) *
      Math.cos(deg2rad(cordLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let d = radius * c;

  return d <= radius / 1000;
}

function findMethod(methodId) {
  const method = methodsList[methodId];
  if (method) {
    delete methodsList[methodId];
  }
  return method;
}

module.exports = { addNewMethod, methodsList, getUserMethods, findMethod,checkData };
