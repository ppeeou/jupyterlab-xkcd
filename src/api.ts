
const toParams = (body) => Object.keys(body).map(k => `${k}=${body[k]}`).join('&');
const errorJSON = (err) => ({ code: 500, data: err });
const resultJSON = (data) => data.status != 200 ? ({ code: 500, data: data }) : ({ code: 0, data: data.json() });

const baseFetch = (method: string) => {
  method = method.toUpperCase();
  return (url, { body = null, headers = null } = {}) => {

    const options: RequestInit = { method };

    if (headers) {
      options.headers = headers;
    }

    if (method == 'GET' || method == 'DELETE') {
      if (body) {
        body = toParams(body);
        url = url[url.length - 1] == '?' ? url : url + '?';
        url = url + body;
      }

      return fetch(url, options)
        .then(resultJSON)
        .catch(errorJSON)
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options)
      .then(resultJSON)
      .catch(errorJSON);
  }
};

const getMethod = baseFetch('get');
const putMethod = baseFetch('put');
const deleteMethod = baseFetch('delete');
const postMethod = baseFetch('post');

export {
  getMethod,
  putMethod,
  deleteMethod,
  postMethod
}