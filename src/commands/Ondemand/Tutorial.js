'use strict';

const Command = require('../../Command.js');
const tutorials = require('../../resources/tutorials.json');
/**
 * Displays the response time for the bot and checks Warframe's servers to see if they are up
 */
class FrameProfile extends Command {
  /**
   * Constructs a callable command
   * @param {Genesis} bot The bot object
   */
  constructor(bot) {
    super(bot, 'warframe.misc.tutorial', 'tutorial', 'Get a Warframe Tutorial Video');
    this.regex = new RegExp(`^${this.call}\\s?(.+)?`, 'i');
    this.usages = [
      {
        description: 'Get a Warframe Tutorial Video',
        parameters: ['subject'],
      },
    ];
  }

  /**
   * Run the command
   * @param {Message} message Message with a command to handle, reply to,
   *                          or perform an action based on parameters.
   * @returns {string} success status
   */
  async run(message) {
    let query = message.strippedContent.match(this.regex)[1];
    if (query) {
      query = query.trim().toLowerCase();
      JSON.stringify(query);
      tutorials.forEach((tutorial) => {
        if (new RegExp(tutorial.regex, 'ig').test(query)) {
          this.messageManager.reply(message, `Warfame Tutorial | ${tutorial.name} : ${tutorial.url}`, true, true);
        }
      });
      return this.messageManager.statuses.SUCCESS;
    }
    this.messageManager.embed(message, {
      title: 'Available Tutorials',
      fields: [{ name: '_ _', value: tutorials.map(tutorial => tutorial.name).join('\n') }],
      footer: {
        icon_url: 'https://avatars1.githubusercontent.com/u/24436369',
        text: 'Data evaluated by Warframe Community Developers',
      },
    }, true, false);
    return this.messageManager.statuses.FAILURE;
  }
}

module.exports = FrameProfile;
