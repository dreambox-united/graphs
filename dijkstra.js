// Define a graph using an adjacency list
const graph = {
    A: { B: 1, C: 2 },       // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
    B: { A: 1, C: 2, D: 1 }, // ... and so on for other nodes
    C: { A: 4, B: 2, D: 1 },
    D: { B: 1, C: 1 }
};

function dijkstra(graph, start) {
    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};
    let previous = {};

    // A set to keep track of all visited nodes
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);

    // Initially, set the shortest distance to every node as Infinity
    for (let node of nodes) {
        distances[node] = Infinity;
    }

    // The distance from the start node to itself is 0
    distances[start] = 0;

    // Loop until all nodes are visited
    while (nodes.length) {
        // Sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => distances[a] - distances[b]);
        let closestNode = nodes.shift();

        // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
        if (distances[closestNode] === Infinity) break;

        // Mark the chosen node as visited
        visited.add(closestNode);

        // For each neighboring node of the current node
        for (let neighbor in graph[closestNode]) {
            // If the neighbor hasn't been visited yet
            if (!visited.has(neighbor)) {
                // Calculate tentative distance to the neighboring node
                let newDistance = distances[closestNode] + graph[closestNode][neighbor];

                // If the newly calculated distance is shorter than the previously known distance to this neighbor
                if (newDistance < distances[neighbor]) {
                    // Update the shortest distance to this neighbor
                    previous[neighbor]=closestNode;
                    distances[neighbor] = newDistance;
                }
            }
        }
    }

    //@link: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
    /*
    1  S ← empty sequence
    2  u ← target
    3  if prev[u] is defined or u = source:          // Do something only if the vertex is reachable
    4      while u is defined:                       // Construct the shortest path with a stack S
    5          insert u at the beginning of S        // Push the vertex onto the stack
    6          u ← prev[u]                           // Traverse from target to source
     */


    const source = start;//"A"
    const target = 'D'
    const S = [];  //  S ← empty sequence stack
    let u = target //  u ← target
    if (previous[u] !== undefined || u === source) //if prev[u] is defined or u = source:
    {
        //  while u is defined:
        while (u) {
            // insert u at the beginning of S
            S.push(u)
            u = previous[u];
        }
    }
    console.log(`Tracking Route from ${source} to ${target}`)
    while (S.length > 0) {
        console.log(`Walk to ${S.pop()}`)
    }








    console.log(`Distance MATRIX FROM dijkstra`)
    // Return the shortest distance from the start node to all nodes
    return distances;
}

// Example: Find shortest distances from node A to all other nodes in the graph
console.log(dijkstra(graph, "A")); // Outputs: { A: 0, B: 1, C: 3, D: 4 }
