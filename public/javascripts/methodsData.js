const { uuid } = require("uuidv4");
const fetch = require("node-fetch");


const firebase = require("firebase");
require("firebase/firestore");
firebase.initializeApp({
  type: "service_account",
  project_id: "sapir-delivery",
  private_key_id: "e6b5512829908c6e015ec266486aa5094d057165",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDgQ+DAD3T59riQ\n+15TK523J3LR9Mfhy49/KQs7Lqo7pbRZx770PASVDJ6c7cC7yjAhHJP7W0vp0R4C\nTAPbsQL0awDP8PyVrmri9fqsmuBBHGC9gB6RwlnsfxK5dURqzZguoXu66Ol7coAA\najtGoJY0+ilTpugxlmoljT/I9zua1KLn4OTvM2SGhNuHmrLdsjFLK4BJj7WJsU7G\nh6DAchqqsnrBtfWLSO9QvHb5hZXXX//iMWHSDz/32j+h2TGcS/4EfI3YgEg3pwYr\nSseHCFjYWluKQnUnC0UHSl65FjJcpW7A3xfISxwF2mTRpMCPXkJXHESqOJIbKsfu\nQCq5PdszAgMBAAECggEAAYao7TgqVoAKtE+/Cp5dumyIjswGL4j8zO214onJ20fW\nX6Vj8HVoTU/Cnm98JZG3bZj9FF9At6vMPSlXXFO00Dr1Uz8CmdR1AJRcBFz5N6xq\nO+Ts0FOEY1bLfmbVgd+zHDA5o5LZawfIX7hZVVRh4h4WFIkqlOPMjQBWXjIvN0cP\n+MAaBjnEfUaZUSZct0xVLkFa7rzgTSXmL8BajZjiok7dBHJv2gQvwow2VIHzbYk7\nIeJel0pt5jk27V4Ao9j4TtEcJOPTkyKH7tiUzM6ihj+TCrZPA+5RDQXXssr9Tj2a\n+qpz9esSfP+ySia5BXEVEhdLLGhpEC3BNcgk9pC98QKBgQD7chWbFyHhLZZAQVws\n7BOMDfLnvZbE/ql5Ml0n1nOG+x8boLgmwGTxseC5IcvaxKrWchYx93meZDjslL/U\nihqFSexlgy3koNnnJ2BG5K+pfW4wRog4dGMYVKzcFdSakP/BqMesXrcrrJnLFFCa\n/PJBrXo7I8d+MByt3NrrRZiDSQKBgQDkU8L8+VUNlH4seWYW5GsokpGtu8odwkwL\nvaviPJapDoYC+v5sAXb1ElIRXOWblTb/tQmaCcv3jW5y5QvDZmk3lvksHCywBYDx\noSeWC0zz+hdzGWDXIhsOptzoTeaQK6BiKOJG2jIGXSJuzYQeGv0JNEkeJrEh1z+z\nbSmKhJVumwKBgGsBZ/RyabacYd7CcemkJcVqgj7gzfLTtWegaUh02QFOiTSGtxe2\ntL6uxkXC/jABlfpg3tUwzg7788Wqn+BhTVv/05x3sOYlFdZrSWuiEqd8e5IL0hjE\nXw+RqWaX27xTjKProd3XCPiLIX/tC0iJ8MbGfsgAN/uZmfrbjEanfXoRAoGBAKUo\n6czv1lRCa5pkHjLE+7aXfwU655LrLvL3OlQmG50iQlH5mPwrew7/N5oTposKPoRt\nQgrIt1/UUGaPxBiOBeIONSNxJeoVsRYXynjAp+N7rma1ntU/eG76yKTJZNQ4moUm\nqbcysijkSbn4s27LeumjhphmyI6AEzYI6pmmGimtAoGBALMu9YxDQEHBngStcjeV\nnpgikMcXZM4/lX3wQPzD2BJFZI6J/8froN/XBzZyAZWbNsO1IzeCbp7tywehZesu\nM5k6EgxN2YJwA77XRmHBYv8xsnGX7lDwrwnWRVqjXcBCX2Kfi48zGCehWHNACcbN\nfrNP9c6dtHygBmov27zhq0Nz\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-8s6yx@sapir-delivery.iam.gserviceaccount.com",
  client_id: "114175171535067618558",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8s6yx%40sapir-delivery.iam.gserviceaccount.com",
});


const db = firebase.firestore();

async function checkData() {
  let querySnapshot= db.collection("methods").get();
  return querySnapshot;
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

module.exports = {
  addNewMethod,
  methodsList,
  getUserMethods,
  findMethod,
  checkData,
};
