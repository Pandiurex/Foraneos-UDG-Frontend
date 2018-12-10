const host = 'https://api.foraneos-udg.ml/api/';

class API {
  static async get(route, hash = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'GET',
      headers: {
        hash,
      },
    });

    const { status } = response;
    const json = await response.json();

    return {
      status,
      data: json,
    };
  }

  static async getImage(route, hash = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'GET',
      headers: {
        hash,
      },
    });


    const { status } = response;
    const json = await response.blob();

    console.log(json);

    return {
      status,
      data: json,
    };
  }

  static async post(route, body, hash = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        hash,
      },
    });

    const { status } = response;
    const json = await response.json();

    return {
      status,
      data: json,
    };
  }

  static async postFile(route, body, hash = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'POST',
      body,
      headers: {
        hash,
      },
    });

    const { status } = response;
    const json = await response.json();

    return {
      status,
      data: json,
    };
  }

  static async update(route, body, hash = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'PATCH',
      body,
      headers: {
        'Content-Type': 'application/json',
        hash,
      },
    });

    const { status } = response;
    const json = await response.json();

    return {
      status,
      data: json,
    };
  }

  static async updateFile(route, body, hash = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'PATCH',
      body,
      headers: {
        hash,
      },
    });

    const { status } = response;
    const json = await response.json();

    return {
      status,
      data: json,
    };
  }

  static async delete(route, body = {}, hash = undefined) {
    const response = await fetch(`${host}${route}`, {
      method: 'DELETE',
      body,
      headers: {
        'Content-Type': 'application/json',
        hash,
      },
    });

    const { status } = response;
    const json = await response.json();


    return {
      status,
      data: json,
    };
  }
}

export default API;
