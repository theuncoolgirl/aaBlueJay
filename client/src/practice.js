let res = [
  [
    1594382400000,
    1.1,
    2.2,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1594382483839,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1600000000000,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1600000000000,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1600000000000,
    3.7,
    6.8,
    3.3,
    4.4
  ],
  [
    1600000000000,
    4.6,
    6.8,
    2.4,
    4.4
  ]
]

export const newRes = res.map(marketData => {
  return {
    date: new Date(marketData[0]) + ''.split('T')[0],
    open: marketData[1],
    high: marketData[2],
    low: marketData[3],
    close: marketData[4]
  }
})
// console.log(newRes)
// var t = new Date(1370001284000);
// var formatted = t.format("dd.mm.yyyy");
// console.log(t)
