<script>
  import RouteGenerator from "./route-generator";
  import { onMount } from "svelte";

  let route = RouteGenerator.generate();
  let distance = RouteGenerator.getDistance(route);

  onMount(() => {
    //console.log(RouteGenerator.getDistance(route));
  });

  function generateNewRoute(event) {
    route = RouteGenerator.generate();
    distance = RouteGenerator.getDistance(route);
    console.log(route);
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .campground,
  .distance,
  .trailhead {
    margin: 8px;
    font-weight: bold;
  }

  .campground {
    /* padding: 10px; */
  }

  .distance {
    font-size: 12px;
  }

  .trail {
    height: 10px;
    width: 1px;
    border-left: dashed black 1px;
    display: block;
    margin: auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Glacier National Park</h1>
  <h2>Backcountry Route Generator</h2>
  <button on:click={generateNewRoute}>Generate</button>
  <div class="trailhead">Start at {route[0].trailHead.code} trailhead</div>
  {#each route as item}
    <span class="trail" />
    <div class="distance">{item.distance} mi</div>
    <span class="trail" />
    <div class="campground">{item.code}</div>
  {/each}
  <div>Total Distance: {distance} miles</div>
</main>
