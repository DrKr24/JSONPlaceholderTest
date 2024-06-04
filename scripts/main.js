import { apiHandler } from "./api.js";

const urlString = document.querySelector(".url-string");
const entitySelect = document.querySelector(".entity-select");
const methodSelect = document.querySelector(".method-select");
const countEntityInput = document.querySelector(".input-count");
const idInput = document.querySelector(".input-params");
const buttonClear = document.querySelector(".button-clear");
const buttonSend = document.querySelector(".url-button");
const code = document.querySelector(".info__area");
const statusNode = document.querySelector(".info__result-status");
const jsonNode = document.querySelector(".info__result-json");

let id = 0;
let count = 1;
let entity = "posts";
let userIdParams = `?${entity.slice(0, -1)}Id=${id}`;
let entityBreakpoint = `/${entity}`;
let countEntity = `/${count}`;
let method = "GET";
let url = `https://jsonplaceholder.typicode.com${entityBreakpoint}${countEntity}`;

updateUrlString();

function updateUrlString() {
  id = 0;
  userIdParams = `?${entity.slice(0, -1)}Id=${id}`;
  idInput.value = 0;
  url = `https://jsonplaceholder.typicode.com${entityBreakpoint}${countEntity}`;
  urlString.textContent = url;
}

function paramsHandler(event) {
  const { value } = event.target;
  const numericalValue = Number(value);
  id = numericalValue;
  userIdParams = `?${entity.slice(0, -1)}Id=${id}`;
  if (numericalValue) {
    count = 1;
    countEntity = `/${count}`;
    countEntityInput.value = "1";
    url = `https://jsonplaceholder.typicode.com${entityBreakpoint}${userIdParams}`;
    urlString.textContent = url;
  } else {
    updateUrlString();
  }
}

function entityHandler(event) {
  const { value } = event.target;
  entity = value;
  entityBreakpoint = `/${entity}`;
  updateUrlString();
}

function methodHandler(event) {
  code.value = "";
  countEntityInput.removeAttribute("disabled");
  idInput.setAttribute("disabled", "");
  countEntity = `/${count}`;
  updateUrlString();
  const { value } = event.target;
  method = value;
  switch (value) {
    case "GET":
      idInput.removeAttribute("disabled", "");
      break;
    case "POST":
      countEntity = "";
      countEntityInput.setAttribute("disabled", "");
      code.value = `{
  "title": "foo",
  "body": "bar",
  "userId": 1
}`;
      updateUrlString();
      break;
    case "PATCH":
      code.value = `{
  "title": "foo",
  "body": "bar",
  "userId": 1
}`;
      updateUrlString();
      break;
    case "PUT":
      code.value = `{
  "title": "foo",
  "body": "bar",
  "userId": 1
}`;
      updateUrlString();
      break;
  }
}

function entityCountHandler(event) {
  const { value } = event.target;
  count = value;
  countEntity = `/${count}`;
  updateUrlString();
}

function clearHandler() {
  entitySelect.selectedIndex = 0;
  methodSelect.selectedIndex = 0;
  countEntityInput.value = 1;
  count = 1;
  entity = "posts";
  entityBreakpoint = `/${entity}`;
  countEntity = `/${count}`;
  code.value = "";
  statusNode.textContent = "000";
  jsonNode.textContent = "";
  updateUrlString();
}

entitySelect.addEventListener("change", entityHandler);
methodSelect.addEventListener("change", methodHandler);
countEntityInput.addEventListener("input", entityCountHandler);
idInput.addEventListener("input", paramsHandler);
buttonClear.addEventListener("click", clearHandler);
buttonSend.addEventListener("click", () => apiHandler(method, url));
