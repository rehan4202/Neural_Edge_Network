const EDGE_URL = 'http://localhost:8081';
const EDGE_FUNCTION_URL = 'http://localhost:9000';

export default class NeuralEdge {
  static async getStatic(path) {
    const res = await fetch(`${EDGE_URL}/${path}`);
    if (!res.ok) throw new Error(`Failed to load static: ${res.status}`);
    return res.text();
  }

  static async getDynamic(endpoint, params = {}) {
    const url = new URL(`${EDGE_FUNCTION_URL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load dynamic: ${res.status}`);
    return res.json();
  }
}
