// PriorityQueue class to manage the vertices and their priorities
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    // Add a vertex with a given priority to the queue
    enqueue(vertex, priority) {
        this.values.push({ vertex, priority });
        this.sort();
    }

    // Remove and return the vertex with the highest priority (smallest value)
    dequeue() {
        return this.values.shift();
    }

    // Sort the queue based on priority (smallest value first)
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    // Check if the queue is empty
    isEmpty() {
        return this.values.length === 0;
    }
}

// Utility method to draw the spanning tree
function drawSpanningTree(graph, backpointers) {
    const vertices = Object.keys(graph);
    const treeStructure = {};

    // Build tree structure
    for (let vertex in backpointers) {
        const parent = backpointers[vertex];
        if (!treeStructure[parent]) {
            treeStructure[parent] = [];
        }
        treeStructure[parent].push(vertex);
    }

    // Helper function for recursive drawing
    function drawNode(node, prefix = '', isLast = true) {
        const children = treeStructure[node] || [];
        console.log(prefix + (isLast ? '└── ' : '├── ') + node);

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            drawNode(child, newPrefix, i === children.length - 1);
        }
    }

    // Find the root (node with no parent)
    const root = vertices.find(v => !Object.keys(backpointers).includes(v));

    console.log(`Spanning Tree With Root ${root} :`);
    drawNode(root);
}



//===============================================================================================================================================================================
//                      Implementation
//===============================================================================================================================================================================



// Prim's algorithm to find the minimum spanning tree
function prim(graph, start) {
    // Get all vertices from the graph
    const vertices = Object.keys(graph);

    // Object to store the minimum cost to reach each vertex
    const costs = {};

    // Object to store the edges of the minimum spanning tree
    const backpointers = {};

    // Priority queue to manage vertices and their costs
    const priorityQueue = new PriorityQueue();

    // Set to keep track of visited vertices
    const visited = new Set();

    // Initialize costs: set start vertex to 0, all others to Infinity
    for (let v of vertices) {
        costs[v] = v === start ? 0 : Infinity;
        //enqueue vertex ,cost
        priorityQueue.enqueue(v, costs[v]);
    }

    // Continue until the priority queue is empty
    while (!priorityQueue.isEmpty()) {
        // Get the vertex with the smallest cost
        const { vertex, cost } = priorityQueue.dequeue();
        const  currentVertex=vertex;

        // If the vertex is already visited, skip it
        if (visited.has(currentVertex)) continue;

        // Mark the current vertex as visited
        visited.add(currentVertex);

        // Check all neighbors of the current vertex
        for (let [neighbor, weight] of Object.entries(graph[currentVertex])) {
            // Only consider unvisited neighbors
            if (visited.has(neighbor)) continue;

            // Calculate the new cost to reach this neighbor
            const newCost = Math.min(weight, costs[neighbor]);

            // If the new cost is less than the current known cost
            if (newCost < costs[neighbor]) {
                // Update the cost to reach this neighbor
                costs[neighbor] = newCost;

                // Set the current vertex as the backpointer for this neighbor
                backpointers[neighbor] = currentVertex;

                // Add the neighbor to the priority queue with the new cost
                priorityQueue.enqueue(neighbor, newCost);
            }
        }
    }

    // Return both the backpointers and the total cost
    return { backpointers, totalCost: Object.values(costs).reduce((sum, cost) => sum + cost, 0) };

}



// Example usage:
const graph = {
    A: { B: 4, H: 8 },
    B: { A:4,H:11,C:8 },
    H: { A:8,B:11,I:7,G:1 },
    I: { C:2,G:6,H:7 },
    C: { B:8,D:7,I:2,F:4},
    G: { I:6,H:1,F:2},
    D: { C:7,F:14,E:9},
    F: { C:4,G:2,E:10,D:14},
    E: { D:9,F:10 },

};

const { backpointers, totalCost } = prim(graph, 'A');
console.log("Minimum Spanning Tree Edges:", backpointers);
console.log("Total Cost:", totalCost);
drawSpanningTree(graph, backpointers);
