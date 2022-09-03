const express = require("express")
const expressWs = require("express-ws")
const router = express.Router()
expressWs(router)

// 存储数据
let lemurArr = [], monkeyArr = [];

router.ws("/lemur", ws => {
  ws.on('message', (data) => {
    lemurArr.push(data)
    ws.send(data);
  })
})

router.ws("/monkey", ws => {
  ws.on('message', (data) => {
    monkeyArr.push(data)
    ws.send(data);
  })
})

// 发送给monkey
router.ws("/lemurData", ws => {
  let timer = null;
  ws.on('close', () => {
    timer && clearInterval(timer)
  })
  timer = setInterval(() => {
    if (lemurArr.length) {
      let first  = lemurArr[0];
      lemurArr.splice(0, 1);
      ws.send(first);
    }
  }, 650)
})

// 发送给lemur
router.ws("/monkeyData", ws => {
  let timer = null;
  ws.on('close', () => {
    timer && clearInterval(timer)
  })
  timer = setInterval(() => {
    if (monkeyArr.length) {
      let first = monkeyArr[0];
      monkeyArr.splice(0, 1);
      ws.send(first);
    }
  }, 650)
})

module.exports = router;