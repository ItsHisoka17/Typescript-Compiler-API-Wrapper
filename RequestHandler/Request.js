const fetch = require('node-superfetch');
const requestP = require('node-fetch')
const constants = require('../Utils/constants.js');
const chalk = require('chalk');

class TSAPI {
  constructor(){
    console.log(constants["CONNECTION_PENDING"]);
    (function(){
      return new Promise((res, rej) => setTimeout(res, 3000));
    })()
    .then(() => {
    let statusCheck = this.constructor._makeConnection();
    if (!statusCheck){
 console.warn(chalk.red(constants["CONNECTION_ERROR"]));
    } else { console.log(chalk.green(constants["CONNECTION_SUCCESS"]))
    }
    });
  }
  get baseURL(){
    return constants["BASE_URL"];
  }
  get compilerURL(){
    return constants["COMPILER_URL"];
  }
  get evalURL(){
    return constants["EVAL_URL"];
  }
  static _makeConnection(){
    let res;
      return fetch.get(this.prototype.baseURL)
      .then((request) => {
        console.log(request.status);
        if (request.status===200){
          res = true;
        } else {
          res = false;
        }
        return res;
      }).catch((e) => {
        console.error(e);
      });
  }
  static handleRecievedData(request){
    let res = request;
    if (res.status!==200){
        throw new Error('CONNECTION_FAILURE');
      };
      let unparsedC = res.receivedEmittion;
      let parsed;
      try {
        parsed = JSON.parse(unparsedC);
      } catch (e) {
        console.error(e);
      }
      return parsed;
  }
  async _request(url, method, data = {}){
    if (method&&"string"===typeof method){
      switch(method.toLowerCase()){
        case 'get': {
          let d = await fetch.get(url);
          return d;
          break;
        }
        case 'post': {
          return requestP(url, {method, body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' }
}).then((res)=> {
            return res.text().then((t)=>{return {receivedEmittion: t, status: res["status"]}});
})
          break;
        }
      }
    }
  }
};

module.exports = TSAPI;