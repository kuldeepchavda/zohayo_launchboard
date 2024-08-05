
function getObjectKeys(object, finalObj = {}) {
  // const finalObj = {}
  for (let key in object) {
    if (typeof object[key] == "object") {
      getObjectKeys(object[key], finalObj);
    } else {
      // finalObj.key = object[key]
      finalObj[key] = object[key];
      //   console.log(`${key} : ${object[key]}`);
    }
}
return finalObj;
}
module.exports  = getObjectKeys