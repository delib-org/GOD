import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// capture all http responses and redirect to /login if unauthorized
(function (open) {
  // @ts-ignore
  XMLHttpRequest.prototype.open = function openRequest(m, u, a, us, p) {
    this.addEventListener('readystatechange', function cb() {
      if (this.status === 401 && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }, false);

    open.call(this, m, u, a, us, p);
  };
}(XMLHttpRequest.prototype.open));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
