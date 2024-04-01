const accountService = require("../services/accountService");

module.exports.getAccount = async (req, res) => {
  let response = {};
  // console.log(req.query); 取get参数
  // console.log(req.body) 取post参数

  try {
    const responseFromService = await accountService.getAccount(req);
    response.status = 200;
    response.message = "account query successfully ";
    response.body = responseFromService;
  } catch (error) {
    console.error("Something went wrong in accountController.js", error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
