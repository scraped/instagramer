let fs = require('fs');
let files = [];
let Client = require('instagram-private-api').V1;
let db = require('./../server/db/index');
const express = require('express');
let server = require('http').Server(express);
server.listen(3001);
let io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.emit('umessage', 123);
});

function addNewAccountsByCookiesFiles(accounts) {
  let list = [];
  files = fs.readdirSync('./../cookies/');
  for (let i = 0; i < files.length; i++) {
    let oldAccount = false;
    let file = files[i].replace(/\.[^/.]+$/, '');
    for (let j = 0; j < accounts.length; j++) {
      if (accounts[j].id === file) {
        oldAccount = true;
      }
    }
    if (oldAccount === false) {
      accounts.push({
        id: file
      });
    }
  }
  return [...accounts];
};

async function getAccountInterlocutors(account) {
  let interlocutors = await db.models.Interlocutor.findAll({
    attributes: ['id', 'lastMessage', 'unread', 'login'],
    raw: true,
    where: {
      accountId: account.id,
    },
  });
  return interlocutors;
}

async function getAccountCookies(account) {
  // console.log(`./../cookies/${account.id}.json`);
  const data = {}
  let device = new Client.Device(account.id);
  let storage = new Client.CookieFileStorage(`../cookies/${account.id}.json`);
  data.session = new Client.Session(device, storage);
  data.instagramId = await data.session.getAccountId();
  return data;

}

async function getFeeds(account) {
  let feed = new Client.Feed.Inbox(account.session);
  let results = await feed.get();
  return results;
}

async function generateEmptyInterlocutors(results, account) {
  for (let t of results) {
    let interlocutor = account.interlocutors.findIndex((i) => {
      return i.login === t._params.title;
    });
    if (interlocutor === -1) {
      let newInterlocutor = await db.models.Interlocutor.create({
        login: t._params.title,
        accountId: account.id,
      });
      newInterlocutor.thread = t;
      account.interlocutors.push(newInterlocutor);
    } else {
      account.interlocutors[interlocutor].thread = t;
    }
  }
}

(async () => {
  let accounts = await db.models.Account.findAll({
    attributes: ['id', 'password'],
    raw: true,
  });
  for (;;) {
    accounts = await addNewAccountsByCookiesFiles(accounts);
    for (let i = 0; i < accounts.length; i++) {
      let account = accounts[i];
      try {
        account.interlocutors = await getAccountInterlocutors(account);
        if (!account.session) {
          const session = await getAccountCookies(account);
          account.session = session.session;
          account.instagramId = session.instagramId;
        }

        const results = await getFeeds(account);
        await generateEmptyInterlocutors(results, account);
      } catch (e) {
        console.log(4, e);
        continue;
      }
      for (let interlocutor of account.interlocutors) {
        // console.log(interlocutor);
        let tFeed;
        let items;
        try {
          tFeed = new Client.Feed.ThreadItems(account.session, interlocutor.thread._params.threadId);
          items = await tFeed.get();
        } catch (e) {
          console.log(2);
          console.log(e);
          continue;
        }
        // console.log(items);
        let hasNewMessage = false;
        for (let j = 0; j < items.length; j++) {
          if (items[j]._params.itemType == 'text' &&
            items[j]._params.userId != account.instagramId &&
            items[j]._params.created > interlocutor.lastMessage) {
            hasNewMessage = true;
            let text = items[j]._params.text.replace(/\\/g, '');
            try {
              let data = {
                accountId: account.id,
                interlocutorId: interlocutor.id,
                text: text,
                sender: 'interlocutor',
              };
              let message = await db.models.Message.create(data);
              // console.log(data);
              io.emit('umessage', message);
            } catch (e) {
              continue;
              console.log(3);
              console.log(e);
            }
          }
          if (hasNewMessage) {
            let lastMessage = items[0]._params.created;
            try {
              await db.models.Interlocutor.update({
                lastMessage: lastMessage,
                unread: 1,
              }, {
                where: {
                  id: interlocutor.id,
                },
              });
            } catch (e) {
              continue;
              console.log(4);
              console.log(e);
            }

            // interlocutor.lastMessage = items[0]._params.created;
          }
        };
      }
    }
  };
})();
