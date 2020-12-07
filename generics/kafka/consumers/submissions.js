/**
 * name : submissions.js
 * author : Aman Jung Karki
 * created-date : 22-Nov-2020
 * Description : Submission consumer.
 */

//dependencies

const userProjectsHelper = require(MODULES_BASE_PATH + "/userProjects/helper");

/**
  * submission consumer message received.
  * @function
  * @name messageReceived
  * @param {String} message - consumer data
  * @returns {Promise} return a Promise.
*/


var messageReceived = function (message) {

  return new Promise(async function (resolve, reject) {

    try {
      
      let parsedMessage = JSON.parse(message.value);

      let submissionDocument = {
        "status" : parsedMessage.status,
        "submissionDetails._id" : ObjectId(parsedMessage._id)
      };
      
      if( parsedMessage.submissionDate ) {
        submissionDocument["submissionDate"] = parsedMessage.submissionDate;
      }

      await userProjectsHelper.updateTask(
        parsedMessage.projectId,
        parsedMessage.taskId,
        submissionDocument
      );

      return resolve("Message Received");
    } catch (error) {
      return reject(error);
    }

  });
};

/**
  * If message is not received.
  * @function
  * @name errorTriggered
  * @param {Object} error - error object
  * @returns {Promise} return a Promise.
*/

var errorTriggered = function (error) {

  return new Promise(function (resolve, reject) {

    try {
      
    //     let errorObject = {
    //     slackErrorName : gen.utils.checkIfEnvDataExistsOrNot("SLACK_ERROR_NAME"),
    //     color: gen.utils.checkIfEnvDataExistsOrNot("SLACK_ERROR_MESSAGE_COLOR"),
    //     message: `Kafka server is down on address ${error.address} and on port ${error.port} for notifications`
    //   }

    //   slackClient.sendMessageToSlack(errorObject)
      return resolve(error);
    } catch (error) {
      return reject(error);
    }

  });
};

module.exports = {
  messageReceived: messageReceived,
  errorTriggered: errorTriggered
};
