const axios = require("axios");

module.exports = ({ core, webhook, message, channel, iconUrl, username }) => axios({
    method: 'post',
    url: webhook,
    data: {
      channel,
      username,
      blocks: message.blocks,
      icon_url: iconUrl,
    },
  }).then((response) => {
    core.debug(`Slack Response ${response.data}`);
  });
