import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options, params) {
  let requestURL = url;
  if (window.localStorage.pucmg_tcc_access_token) {
    options.headers['x-access-token'] = window.localStorage.getItem('pucmg_tcc_access_token');
  }
  if (params) {
    const fullUrl = new URL(`http:/${url}`);
    fullUrl.search = new URLSearchParams(params);
    const apiUrl = fullUrl.href.split('http:/')[1];
    requestURL = apiUrl;
  }

  return fetch(requestURL, options)
    .then(checkStatus)
    .then(parseJSON);
}
