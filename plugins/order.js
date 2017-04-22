const pizzapi = require('dominos')
module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention'], (bot, message) => {
      console.log('test')
      bot.reply(message, `We are looking for nearby stores`)
      var string = "";
      pizzapi.Util.findNearbyStores('11 Times Square, New York, NY 10036', 'Delivery', (storeData) => {
      storeData.result.Stores.filter(function(store) {
        return store.IsOpen && store.IsOnlineNow && store.IsOnlineCapable
      }).map(function(store){
        string+=store.StoreID + ' ' + store.AddressDescription + "\n";
      })
      bot.reply(message, string);
    })
  });
  },
  help: {
    command: 'order',
    text: `Say "I want a pizza" and I'll look for a store`
  }
}
