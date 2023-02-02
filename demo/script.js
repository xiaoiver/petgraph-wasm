import init, { DiGraph, toposort } from "../pkg/petgraph_wasm.js";

await init();

const graph = new DiGraph();
// console.log(graph.nodeCount());

const n1 = graph.addNode("n1");
const n2 = graph.addNode("n2");
const n3 = graph.addNode("n3");

// console.log(n1, graph.nodeWeight(n1));
// console.log(n2, graph.nodeWeight(n2));
// console.log(n3, graph.nodeWeight(n3));

graph.addEdge(n2, n1, "e1");
graph.addEdge(n2, n3, "e2");

const sorted = toposort(graph);
sorted.forEach((id) => {
  console.log(graph.nodeWeight(id));
});
