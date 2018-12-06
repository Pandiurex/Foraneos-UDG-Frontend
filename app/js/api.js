const host = 'https://api.foraneos-udg.ml/api/';

class API {
  static async get(route, token = undefined) {
    let json;
    let status;

    try {
      const response = await fetch(`${host}${route}`, {
        method: 'GET',
        headers: {
          token,
        },
      });
      status = await response.status;
      const jsonPromise = await response.json();
      json = await jsonPromise;
    } catch (error) {
      return error;
    }

    return {
      status,
      data: json,
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
      data: json,
    };
  }

  static async post(route, body, token = undefined) {
    const response = await fetch(`${host}/${route}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });

    const status = await response.status;
    const json = await response.json();

    return {
      status,
      data: json,
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
    const json = await response.json();

    return {
      status,
      data: json,
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

  static async login({ email, password }, token = undefined) {
    console.log(email);
    console.log(password);
    const response = await fetch(`${host}/auth/login`, {
      method: 'POST',
      body: new URLSearchParams({ email, password }),
      headers: {
        token,
      },
    });
    const status = await response.status;
    const json = await response.json();

    return {
      status,
      data: json,
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
      data: json,
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
      data: json,
    };
  }
}

export default API;
