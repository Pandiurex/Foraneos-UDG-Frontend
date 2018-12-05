class API {
  constructor() {
    this.host = 'https://api.foraneos-udg.ml/api/';
  }

  static async getAll(route, token = undefined) {
    let json;
    let status;

    try {
      const response = await fetch(`https://api.foraneos-udg.ml/api/${route}`, {
        method: 'GET',
        headers: {
          token,
        },
      });
      console.log(response);
      status = await response.status;
      const jsonPromise = await response.json();
      console.log(jsonPromise);
      json = await jsonPromise;
    } catch (error) {
      return error;
    }

    return {
      status,
      response: json,
    };
  }

  async get(route, id) {
    let json;
    let status;

    try {
      const response = await fetch(`${this.host}/${route}/${id}`, {
        method: 'GET',
      });
      status = await response.status;
      const jsonPromise = await response.json();
      json = await jsonPromise;
    } catch (error) {
      return error;
    }

    return {
      status,
      response: json,
    };
  }

  async insert(route, body, token = undefined) {
    const response = await fetch(`${this.host}/${route}`, {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: {
        token,
      },
    });
    const status = await response.status;
    const jsonPromise = await response.json();
    const json = await jsonPromise;

    return {
      status,
      response: json,
    };
  }

  async update(route, body, id, token = undefined) {
    const response = await fetch(`${this.host}/${route}/${id}`, {
      method: 'PUT',
      body: new URLSearchParams(body),
      headers: {
        token,
      },
    });
    const status = await response.status;
    const jsonPromise = await response.json();
    const json = await jsonPromise;

    return {
      status,
      response: json,
    };
  }

  async delete(route, id, token = undefined) {
    const response = await fetch(`${this.host}/${route}/${id}`, {
      method: 'DELETE',
      headers: {
        token,
      },
    });
  }

  async login(email, password) {
    const response = await fetch(`${this.host}/auth/login`, {
      method: 'POST',
      body: new URLSearchParams({ email, password }),
    });
    const status = await response.status;
    const jsonPromise = await response.json();
    const json = await jsonPromise;

    return {
      status,
      response: json,
    };
  }

  async logout(token) {
    const response = await fetch(`${this.host}/auth/logout`, {
      method: 'GET',
      headers: {
        token,
      },
    });
    const status = await response.status;
    const jsonPromise = await response.json();
    const json = await jsonPromise;
    return {
      status,
      response: json,
    };
  }

  async activeSession(token) {
    const response = await fetch(`${this.host}/auth/session`, {
      method: 'GET',
      headers: {
        token,
      },
    });
    const status = await response.status;
    const jsonPromise = await response.json();
    const json = await jsonPromise;
    return {
      status,
      response: json,
    };
  }
}

export default API;
