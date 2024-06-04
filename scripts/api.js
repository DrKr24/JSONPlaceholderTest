const statusNode = document.querySelector(".info__result-status");
const jsonNode = document.querySelector(".info__result-json");
const code = document.querySelector(".info__area");

async function get(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: response.status, data: error };
  }
}

async function post(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(JSON.parse(code.value)),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: "error", data: error.message };
  }
}

export async function patch(url) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(JSON.parse(code.value)),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: "error", data: error.message };
  }
}

export async function put(url) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(JSON.parse(code.value)),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: "error", data: error.message };
  }
}

export async function deleteApi(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: "error", data: error.message };
  }
}

const apiMethods = {
  GET: get,
  POST: post,
  DELETE: deleteApi,
  PATCH: patch,
  PUT: put,
};

export async function apiHandler(method, url) {
  const { status, data } = await apiMethods[method](url);
  statusNode.textContent = status;
  jsonNode.textContent = JSON.stringify(data, null, 2);
}
