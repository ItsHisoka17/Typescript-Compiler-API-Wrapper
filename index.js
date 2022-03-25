const Req = require('./RequestHandler/Request');

class API extends Req {
  constructor(){
    super();
  }
  /**
   *@param {string} code
  */
  async compile(c){
    if (!c||"string"!==typeof c){
      throw new TypeError("ERR_NULL_VALUE");
    }
    return this._request(this.compilerURL, "post", {typescript: c})
    .then(this.constructor.handleRecievedData);
  }
  /**
   *@param {string} code
  */
  async eval(c){
    if (!c||"string"!==typeof c){
      throw new TypeError("ERR_NULL_VALUE");
    }
    let res = await this._request(this.evalURL, "post", {c});
    let data = this.constructor.handleRecievedData(res);
    return data;
  }
};

module.exports = API;