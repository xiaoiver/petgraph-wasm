A WASM binding of [petgraph](https://docs.rs/petgraph/0.6.2/petgraph/index.html).

# Test

Install [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) first.

```bash
# Test on node
$ wasm-pack test --node
```

# Benchmark

Build WASM targeted on Node.js first:

```bash
$ wasm-pack build ./ --target nodejs
```

Run benchmarks:

```bash
$ npm run benchmarks
```

## toposort

Compared with the implementation from [graphology](https://graphology.github.io/standard-library/dag.html#topologicalsort).

Dataset(netscience): 1589 Nodes & 2742 Edges.
Speed up ~3x.

```
Graphology x 92.36 ops/sec ±5.17% (63 runs sampled)
Petgraph WASM x 302 ops/sec ±22.95% (18 runs sampled)
Fastest is Petgraph WASM
```
