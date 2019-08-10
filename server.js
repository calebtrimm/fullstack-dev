const express = require('express');
const app = express();
// multer
const multer = require('multer');
const upload = multer({
  dest: __dirname + '/imgs/'
});
app.use('/imgs/', express.static(__dirname + '/imgs'));
// cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const stripe = require('stripe')('sk_test_hn6E4UrOxjretGtlHzuX1KyO00UJiT2v3H');

// reload magic
const reloadMagic = require('./reload-magic.js');
reloadMagic(app);
let passwords = {};
let sessions = {};
let userCarts = {};
let newItems = [];

class Item {
  constructor(item) {
    const parsedItem = JSON.parse(item);
    this.id = parsedItem.id;
    this.name = parsedItem.name;
    this.description = parsedItem.description;
    this.src = parsedItem.src;
    this.price = parsedItem.price;
    this.seller = parsedItem.seller;
  }
}

app.use('/', express.static('build'));
app.use('/', express.static('public'));

// Your endpoints go after this line
app.post('/login', upload.none(), (req, res) => {
  const username = req.body.username;
  const enteredPassword = req.body.password;
  let expectedPassword = passwords[username];
  if (enteredPassword === expectedPassword) {
    console.log('password matches');
    const sessionId = generateId();
    sessions[sessionId] = username;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.post('/signup', upload.none(), (req, res) => {
  if (req.body.username) {
  }
  const username = req.body.username;
  const enteredPassword = req.body.password;
  if (passwords[username]) {
    res.send(JSON.stringify({ success: false }));
    return;
  }
  passwords[username] = enteredPassword;
  userCarts[username] = [];
  const sessionId = generateId();
  sessions[sessionId] = username;
  res.cookie('sid', sessionId);
  console.log('passwords object', passwords);
  res.send(JSON.stringify({ success: true, userId: sessions[sessionId] }));
});

app.get('/session', (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessions[sessionId]) {
    res.send(JSON.stringify({ success: true }));
  } else res.send(JSON.stringify({ success: false }));
});

app.post('/sell-item', upload.single('img'), (req, res) => {
  console.log('body', req.body);
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const item = req.body.item;
  item.seller = username;
  item.id = generateId();
  const newItem = new Item(item);
  console.log('new item', newItem);
  newItems.push(newItem);
  console.log('New Items: ', newItems);
  res.send(JSON.stringify({ success: true, newItem }));
});

app.post('/add-to-cart', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const item = req.body.item;
  console.log(req.body.item);
  if (sessions[sessionId]) {
    userCarts[username].push(new Item(item));
    res.send(JSON.stringify({ success: true, item: item }));
  } else res.send(JSON.stringify({ success: false }));
});

app.post('/remove-from-cart', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const body = req.body.item;
  const item = new Item(body);
  const cart = userCarts[username];
  if (sessions[sessionId]) {
    const itemIdx = cart.findIndex(cartItem => {
      return cartItem.id === item.id;
    });
    cart.splice(itemIdx, 1);
    res.send(JSON.stringify({ success: true }));
  } else res.send(JSON.stringify({ success: false }));
});

app.get('/get-cart', (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  if (sessions[sessionId]) {
    // console.log('getting ', username + "'s cart: ", userCarts[username]);
    res.send(
      JSON.stringify({
        success: true,
        cart: userCarts[username]
      })
    );
  } else res.send(JSON.stringify({ success: false }));
});

app.get('/get-user-items', (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessions[sessionId]) {
    if (Object.keys(newItems).length > 0) {
      res.send({ success: true, newItems });
    } else res.send(JSON.stringify({ success: false }));
  }
});

app.post('/save-stripe-token', (req, res) => {
  (async () => {
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    });
    res.send({ customer });
  })();
});

app.get('/clear-cart', (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  if (sessions[sessionId]) {
    userCarts[username] = [];
    console.log('user cart ', userCarts[username]);
  }
});

const generateId = () => {
  return '' + Math.floor(Math.random() * 100000000);
};

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
