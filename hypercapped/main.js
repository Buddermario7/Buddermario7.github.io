









mainupgrades = [0,0,0,0,0]
money = 0
cmoney = 1
pcapdeg = 0
capdeg = -1
function updateSoftcap() {
	c = Math.floor(Math.log10(money))
	if (c != capdeg) //if changing caps
		switch (c) {
			case 0:
				if (mainupgrades[0]) {
					document.getElementById("softcaptext").innerHTML = "Due to not buying food, your income is being reduced by "
					document.getElementById("softcapamt").innerHTML = 0
				}
				else {
					document.getElementById("softcaptext").innerHTML = "Due to buying food, your income is being reduced by "
					document.getElementById("softcapamt").innerHTML = 1
				}
				break;
			case 1:
				document.getElementById("softcaptext").innerHTML = "Due to taxes, your income is being reduced by "
				document.getElementById("softcapamt").innerHTML = Math.sqrt(money) - 2
			case 2:
				document.getElementById("softcaptext").innerHTML = "Due to inflation, your income is being reduced by 10 and then divided by "
				document.getElementById("softcapamt").innerHTML = Math.cbrt(money - 90);
			case 3:
				document.getElementById("softcaptext").innerHTML = "Due to inflation, your income is being reduced by 10 and then divided by "
				document.getElementById("softcapamt").innerHTML = Math.cbrt(money - 90);

		}
	updated = (c != capdeg)
	capdeg = c
	return updated
}

function isoft(amt) {
	a = amt
	if (capdeg == 0)
		a -= 1
	if (capdeg == 1)
		a -= Math.sqrt(money - 10)

	return a
}

function givemoney(amt) {
	oldmoney = money
	do {
		money += isoft(amt)
		if (updateSoftcap()) {
			money = Math.pow(10, Math.ceil(Math.log10(oldmoney)))
			if (money == 0) { money = 1; break }
			amt = isoft(amt) + oldmoney - money
		}
		else break;
	} while (1)
	
}

function cick() {
	givemoney(cmoney)

	updateSoftcap()
}

function tick() {
	updateSoftcap()
	document.getElementById("moneytext").innerHTML = money;
}

function start() {
	setInterval(tick, 50)
}