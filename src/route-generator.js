
const trailHeads = [
  { code: 'COE', name: 'Coal Creek' },
  { code: 'NCE', name: 'Nyack Creek' }
]

const sites = [
  { code: 'COA', trailHeads: [{ code: 'COE', distance: 6.6 }, { code: 'NCE', distance: 10.7 }], adjacent: [{ code: 'BEA', distance: 11.0 }] },
  { code: 'LNY', trailHeads: [{ code: 'COE', distance: 10.7 }, { code: 'NCE', distance: 5.8 }], adjacent: [{ code: 'UPN', distance: 9.0 }] },
  { code: 'BEA', adjacent: [{ code: 'UPN', distance: 9.7 }, { code: 'COA', distance: 11.0 }] },
  { code: 'UPN', adjacent: [{ code: 'LNY', distance: 9.0 }, { code: 'BEA', distance: 9.7 }] },
]

export default class RouteGenerator {

  static getDistance(route) {
    let totalDistance = 0
    route.forEach(x => {
      totalDistance += x.distance
    })
    return totalDistance.toFixed(1)
  }

  printSummary(route) {
    let th = route[0].trailHead
    let printOut = []
    route.forEach((x, i) => {
      if (i === 0) {
        printOut.push(`${th.name} Trailhead > ${x.code}: ${x.distance}`)
      } else {
        printOut.push(`> ${x.code}: ${x.distance}`)
      }
    })
    console.log(printOut.join(' ') + ` || total distance: ${getDistance(route)}`)
  }

  static getSteps(route) {
    let steps = []
    if (route.length < 2) {
      return steps
    }

    route.forEach((x, i) => {
      if (i === route.length - 1) {
        return
      }
      steps.push(`${x.code} > ${route[i + 1].code}`)
    })
    return steps
  }

  static duplicateStep(previousSite, adjacentSite, route) {
    let steps = this.getSteps(route)
    if (route.filter(x => x.code === adjacentSite.code).length == 2) {
      return true
    }
    if (steps.some(x => x === `${previousSite.code} > ${adjacentSite.code}`)) {
      return true
    }
  }

  static getRandomFirstSite() {
    let trailHead = trailHeads[Math.floor(Math.random() * trailHeads.length)]
    let possibleSites = sites.filter(x => x.trailHeads && x.trailHeads.some(y => y.code === trailHead.code))
    let firstSite = possibleSites[Math.floor(Math.random() * possibleSites.length)]
    firstSite.trailHead = trailHead
    firstSite.distance = firstSite.trailHeads.find(x => x.code === trailHead.code).distance
    return firstSite
  }

  static generate() {
    let route = [this.getRandomFirstSite()]

    let running = true
    let i = 1
    while (running) {
      let previousSite = route[(i - 1)]
      let adjacentSite = previousSite.adjacent[Math.floor(Math.random() * previousSite.adjacent.length)]
      if (!this.duplicateStep(previousSite, adjacentSite, route)) {
        let site = JSON.parse(JSON.stringify(sites.find(x => x.code == adjacentSite.code)))
        site.distance = adjacentSite.distance
        route.push(site)
        if (site.trailHeads) {
          running = false
        }
        i++
      }
    }

    let lastSitecode = route[route.length - 1].code
    let lastSite = sites.find(x => x.code === lastSitecode)
    route.push({ code: `${lastSite.trailHeads[0].code} Trailhead`, distance: lastSite.trailHeads[0].distance })

    return route
  }
}



/* while (routes.length < 5) {
    let route = generateRoute()

    let strRoute = JSON.stringify(route)
    let duplicateRoute = routes.some(x => {
        return JSON.stringify(x) === strRoute
    })

    if (!duplicateRoute) {
        routes.push(route)
    }
}

routes.sort((a, b) => {
    if (getDistance(a) > getDistance(b)) {
        return 1
    }
    return -1
})

routes.forEach(x => {
    printSummary(x)
}) */

