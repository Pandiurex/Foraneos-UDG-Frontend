const host = 'https://api.foraneos-udg.ml/api/';

class API {
  static async get(route, token = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'GET',
      headers: {
        token,
      },
    });

    const { status } = response;
    const json = await response.json();

    return {
      status,
      data: json,
    };
  }

  static async post(route, body, token = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'POST',
      body,
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

  static async update(route, body, id, token = undefined) {
    const response = await fetch(`${host}${route}/${id}`, {
      method: 'PATCH',
      body,
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

  static async delete(route, id, token = undefined) {
    const response = await fetch(`${host}${route}/${id}`, {
      method: 'DELETE',
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

  static async deleteWithBody(route, body, token = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'DELETE',
      body,
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

  static async login(body, token = undefined) {
    const response = await fetch(`${host}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body,
    });

    const status = await response.status;
    const json = await response.json();


    return {
      status,
      data: json,
    };
  }

  static async logout(token) {
    const response = await fetch(`${host}auth/logout`, {
      method: 'DELETE',
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
}

export default API;
