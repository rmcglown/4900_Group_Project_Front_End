import axios from 'axios';
// Change the API_URL to the correct location of the backend API before deploying the app
export const API_URL = 'http://127.0.0.1:8000';/* 'http://localhost:8000' http://127.0.0.1:8000 or  'https://yourPythonAnywhereName.pythonanywhere.com'*/

export class APIService {
  constructor() {
  }

  getBook(param_pk) {
    const url = `${API_URL}/api/books/${param_pk}/`;
    let jwtToken = localStorage.getItem('access');
    const headers = {Authorization: `JWT ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }
  
  getBookList() {
    const url = `${API_URL}/api/books/`;
    let jwtToken = localStorage.getItem('access');
    const headers = {Authorization: `JWT ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  authenticateLogin(credentials) {
    const url = `${API_URL}/api/`;
    return axios.post(url, credentials);
  }

  registerUser(credentials) {
     const url = `${API_URL}/register/`;
     credentials.customusername = credentials.username
     return axios.post(url, credentials);
  }

  getMyLoans() {
    const url = `${API_URL}/api/loans/mine/`;
    let jwtToken = localStorage.getItem('access');
    const headers = { Authorization: `JWT ${jwtToken}` };
    return axios.get(url, { headers: headers });
  }

  getMyFines() {
    const url = `${API_URL}/my-fines/`;
    return axios.get(url, { headers: this.authHeaders() });
  }


  payFine(loanId) {
  const url = `${API_URL}/api/loans/${loanId}/pay_fine/`;
  let jwtToken = localStorage.getItem('access');
  const headers = { Authorization: `JWT ${jwtToken}` };
  return axios.post(url, {}, { headers: headers });
  }

  addNewBook(bookData) {
    const url = `${API_URL}/api/books/`;
    let jwtToken = localStorage.getItem('access');
    const headers = {Authorization: `JWT ${jwtToken}`};
    return axios.post(url, bookData, {headers: headers});
  }

  updateBook(formData){
    const url = `${API_URL}/api/books/${formData.get("pk")}/`;
    let jwtToken = localStorage.getItem('access');
    const headers = {Authorization: `JWT ${jwtToken}`};
    return axios.put(url, formData, {headers: headers});
  }

  deleteBook(book_Pk){
    const url = `${API_URL}/api/books/${book_Pk}/`;
    let jwtToken = localStorage.getItem('access');
    const headers = {Authorization: `JWT ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }
  getCurrentUser(){
    const url = `${API_URL}/api/me/`;
    let jwtToken = localStorage.getItem('access');
    const headers = {Authorization: `JWT ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }
  getBookCopies(bookId) {
  const url = `${API_URL}/api/books/${bookId}/copies/`;
  let jwtToken = localStorage.getItem('access');
  const headers = { Authorization: `JWT ${jwtToken}` };
  return axios.get(url, { headers });
  }

  checkoutCopy(copyId) {
    const url = `${API_URL}/api/copies/${copyId}/checkout/`;
    let jwtToken = localStorage.getItem('access');
    const headers = { Authorization: `JWT ${jwtToken}` };
    return axios.post(url, {}, { headers });
  }



}
