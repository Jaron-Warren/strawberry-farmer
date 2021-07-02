let strawberries = 0
const clickcounter = document.getElementById('clickcounter')

let clickUpgrades = {
  bucket: {
    price: 25,
    quantity: 0,
    multiplier: 1.1
  },
  cart: {
    price: 200,
    quantity: 0,
    multiplier: 2
  }
}

let automaticUpgrades = {
  farmhand: {
    price: 300,
    quantity: 0,
    autoclick: 1
  },
  robotfarmer: {
    price: 1000,
    quantity: 0,
    autoclick: 5
  }
}

function clickit() {
  strawberries++
  update_strawberry_count()
}

function update_strawberry_count() {
  clickcounter.innerText = strawberries.toString()
}

function buy_upgrade(upgradename) {
  let upgrade = automaticUpgrades[upgradename].price
  if (strawberries >= upgrade) {
    console.log(`purchased '${upgradename}'!`)
    strawberries -= upgrade
    update_strawberry_count()
  } else {
    console.log('we require more strawberries!')
  }
}