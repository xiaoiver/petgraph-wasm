const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
const dataset = require("./datasets/netscience.json");

const { DirectedGraph } = require("graphology");
const { topologicalSort } = require("graphology-dag/topological-sort");
const { DiGraph, toposort } = require("../pkg/petgraph_wasm");

// add tests
suite
  .add("Graphology", function () {
    const graph = new DirectedGraph();

    dataset.edges.forEach(({ source, target }) => {
      graph.mergeEdge(source, target);
    });
    topologicalSort(graph);
  })
  .add("Petgraph WASM", function () {
    const g = new DiGraph();

    const idMap = {};
    dataset.nodes.forEach(({ id }) => {
      idMap[id] = g.addNode({ id });
    });

    dataset.edges.forEach(({ source, target }) => {
      g.addEdge(idMap[source], idMap[target]);
    });

    toposort(g);
  })
  // add listeners
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });

// Graphology x 92.67 ops/sec ±4.62% (62 runs sampled)
// Petgraph WASM x 355 ops/sec ±30.94% (16 runs sampled)
// Fastest is Petgraph WASM
