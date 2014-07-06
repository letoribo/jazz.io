express = require('./')
app = express().http().io()
var teoria = require('teoria');
var Express = require('express');
var ap = Express();
/*ap.set('title', 'Jazz Time');
console.log(ap.get('title'))*/

app.io.route('ready', function(req){
  Room = req.data;
  req.io.join(Room)
  req.io.room(Room).broadcast('announce', {
    message: 'New client in the ' + Room + ' room. '
  })
})

// Broadcast all received notes.

app.io.route('time', function(req){
  app.io.room('jazz').broadcast('notes', {notes: req.data})
  /*var n = req.data.b;
  var scientific = teoria.note.fromMIDI(n).scientific(); console.log(scientific);*/
});

// Broadcast mididata.

app.io.route('mididata', function(req) {// console.log(req.data);
  app.io.room('jazz').broadcast('midi', req.data)
})

app.use(express.static(__dirname + '/static'));
var port = Number(process.env.PORT || 7077);
app.listen(port)