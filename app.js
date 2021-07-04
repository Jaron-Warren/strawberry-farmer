let strawberries = 0
let clickMultiplier = 0
let autoFarmers = 0
let autoFarmInterval
const clickcounter = document.getElementById('clickcounter')
const bucketcost_elem = document.getElementById('bucketcost')
const cartcost_elem = document.getElementById('cartcost')
const farmhandcost_elem = document.getElementById('farmhandcost')
const robotfarmercost_elem = document.getElementById('robotfarmercost')

let clickUpgrades = {
  bucket: {
    name: 'Bucket',
    price: 20,
    quantity: 0,
    multiplier: 2,
    icon: 'mdi-pail'
  },
  cart: {
    name: 'Cart',
    price: 1000,
    quantity: 0,
    multiplier: 20,
    icon: 'mdi-wheel-barrow'
  }
}

let automaticUpgrades = {
  farmhand: {
    name: 'Farmhand',
    price: 200,
    quantity: 0,
    autoclick: 1,
    icon: 'mdi-account-child-circle'
  },
  robotfarmer: {
    name: 'Robot Farmer',
    price: 2000,
    quantity: 0,
    autoclick: 5,
    icon: 'mdi-robot'
  }
}

function clickit() {
  strawberries += clickMultiplier + 1
  update_strawberry_count()
}

function update_strawberry_count() {
  clickcounter.innerText = strawberries.toString()
}

function buy_upgrade(upgradetype, upgradename) {
  let upgrade = eval(upgradetype)[upgradename]
  if (strawberries >= upgrade.price) {
    console.log(`purchased '${upgradename}'!`)
    strawberries -= upgrade.price
    if (!upgrade.autoclick) {
      upgrade.price += Math.ceil(upgrade.price / 5 * upgrade.multiplier / 5 + 50)
      upgrade.multiplier += Math.ceil(upgrade.multiplier / 2 + upgrade.quantity / 2 * 1.1 - 1.5)
      upgrade.quantity++
      clickUpgrader()
    } else {
      upgrade.price += Math.ceil(upgrade.price / 5 * upgrade.autoclick / 5 + 200)
      if (upgradename == 'farmhand') {
        upgrade.autoclick += Math.ceil(upgrade.autoclick + 1)
        console.log('upgraded farmhand')
      } else {
        upgrade.autoclick += Math.ceil(upgrade.autoclick + 5)
        console.log('upgraded robot farmer')
      }
      upgrade.quantity++
      automaticFarmerUpgrader()
      autoFarmersUpdate()
    }
    update_strawberry_count()
    drawPrices()
    drawUpgrades()
  } else {
    console.log('we require more strawberries!')
  }
}

function clickUpgrader() {
  for (let key in clickUpgrades) {
    if (clickUpgrades[key].quantity >= 1) {
      clickMultiplier += clickUpgrades[key].multiplier
    }
  }
}

function automaticFarmerUpgrader() {
  for (let key in automaticUpgrades) {
    if (automaticUpgrades[key].quantity >= 1) {
      autoFarmers += automaticUpgrades[key].autoclick
    }
  }
}

function autoFarmersUpdate() {
  clearInterval(autoFarmInterval)
  autoFarmInterval = setInterval(farmersPickThemBerries, 1000)
  console.log('autofarming started')
}

function farmersPickThemBerries() {
  console.log('strawberries +' + autoFarmers)
  strawberries += autoFarmers
  update_strawberry_count()
}

function drawPrices() {
  robotfarmercost_elem.innerText = automaticUpgrades.robotfarmer.price.toString()
  farmhandcost_elem.innerText = automaticUpgrades.farmhand.price.toString()
  bucketcost_elem.innerText = clickUpgrades.bucket.price.toString()
  cartcost_elem.innerText = clickUpgrades.cart.price.toString()
}

function drawUpgrades() {
  let templet = ''
  templet += `
  <div>
  <h5 class="border-bottom text-center">Pick multiplier: ${clickMultiplier}
    <span title="farmers = strawberies per second" class="pl-5">Farmers: ${autoFarmers}</span>
  </h5>
</div>
`
  for (let key in clickUpgrades) {
    if (clickUpgrades[key].quantity > 0)
      templet += `<div class="col-5 mdi ${clickUpgrades[key].icon}">${clickUpgrades[key].name}s</div>
    <div class="col-5">${clickUpgrades[key].quantity}</div>`
  }
  for (let key in automaticUpgrades) {
    if (automaticUpgrades[key].quantity > 0)
      templet += `<div class="col-5 mdi ${automaticUpgrades[key].icon}">${automaticUpgrades[key].name}s</div>
    <div class="col-5">${automaticUpgrades[key].quantity}</div>
    `
  }
  document.getElementById('upgrades').innerHTML = templet
}

drawPrices()
drawUpgrades()