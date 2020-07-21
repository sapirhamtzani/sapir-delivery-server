const { uuid } = require("uuidv4");
const fetch = require("node-fetch");

let admin = require("firebase-admin");
let serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sapir-delivery.firebaseio.com",
});

const db = admin.firestore();

async function getAllMethods() {
  let dataObj = {};
  const dataArray = await db.collection("methods").get();
  dataArray.forEach((doc) => {
    dataObj[doc.id] = doc.data();
  });
  return dataObj;
}

async function addNewMethod(methodObj) {
  const id = uuid();
  const methodsRef = db.collection("methods").doc(id);
  await methodsRef.set({
    name: methodObj.methodName,
    rate: methodObj.methodRate,
    zipcode: methodObj.zipcode,
    radius: methodObj.radius,
    centerLat: methodObj.centerLat,
    centerLng: methodObj.centerLng,
    methodId: id,
  });
}

async function getUserMethods(userObj) {
  let cords = {};
  let userList = {};
  const address = userObj.address;
  const zipcode = userObj.zipcode;
  const methodsList = await getAllMethods();

  const fetchRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyAcsAWJRVDJlbmQiQYGSeNhHTZlWaJ1MO4`
  );

  const { results } = await fetchRes.json();
  cords["lat"] = results[0].geometry.location.lat;
  cords["lng"] = results[0].geometry.location.lng;
  Object.keys(methodsList).forEach((key) => {
    const point = {
      latitude: Number(methodsList[key].centerLat),
      longitude: Number(methodsList[key].centerLng),
    };
    const insert = {
      latitude: Number(cords.lat),
      longitude: Number(cords.lng),
    };
    if (withinRadius(point, insert, Number(methodsList[key].radius))) {
      userList[key] = methodsList[key];
    }

    if (userObj.zipcode !== null && methodsList[key].zipcode === zipcode) {
      userList[key] = methodsList[key];
    }
  });
  return userList;
}

function withinRadius(point, interest, radios) {
  "use strict";

  let deg2rad = (n) => {
    return Math.tan(n * (Math.PI / 180));
  };

  let dLat = deg2rad(interest.latitude - point.latitude);
  let dLon = deg2rad(interest.longitude - point.longitude);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point.latitude)) *
      Math.cos(deg2rad(interest.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let d = radios * c;

  return d <= radios / 10000;
}

async function findMethod(methodId) {
  let method = {};
  const methodsRef = db.collection("methods");
  const methodsObj = await methodsRef.where("methodId", "==", methodId).get();
  if (methodsObj.empty) {
    return "";
  }

  methodsObj.forEach((doc) => {
    method = doc.data();
  });

  await db.collection("methods").doc(methodId).delete();
  return method;
}

module.exports = {
  addNewMethod,
  getUserMethods,
  findMethod,
  getAllMethods,
};
