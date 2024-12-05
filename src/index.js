const addScriptPromise = new Promise(function (resolve, reject) {
  let s = document.createElement('script');
  s.src = "https://frontend-module.time-money.shop/v1/index.js";
  s.onload = () => resolve(window.tim);
  s.onerror = reject;
  s.defer = true;
  document.head.appendChild(s);
});

/**
 * @returns {Promise<{
 *   Client: function(options: {
 *   id: number,
 *   secret: string,
 *   isShowQrCode?: bool,
 *   ui?: object|null,
 * }): {
 *   getDocuments: function(documentTypes: Array<string>): Promise<{
 *   possport: {
 *    last_name: string,
 *    first_name: string,
 *    patronymic: string,
 *    series: string,
 *    number: string,
 *    birth_date: string,
 *    sex: string,
 *    birthplace: string,
 *    department_name: string,
 *    issue_date: string,
 *    department_number: string,
 *    registration_address: string,
 *   },
 *   INN: {
 *    number: string,
 *   }
 * }>
 * }
 * }>}
 */
export function loader() {
  return addScriptPromise
}
