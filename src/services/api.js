const API_ROOT = `http://localhost:3001/api/v1`;

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
  };
};

const login = data => {
    return fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data)
    }).then(res => res.json());
};

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/profile`, {
      headers: headers()
    }).then(res => {
      return res.json();
    });
};

const createNewUser = userData => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: userData})
    }
    return fetch(`${API_ROOT}/users`, options)
    .then(resp => {
        console.log("created", resp)
        return resp.json()
    });
}

const plaidAuth = userData => {
  return fetch(`${API_ROOT}/plaidlogin`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(userData)
  }).then(res => res.json());
}

const fetchTransactions = accessToken => {
  console.log(accessToken)
  return fetch(`${API_ROOT}/get-transactions`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(accessToken)
  }).then(res => res.json());
}

const fetchCreatedTransactions = () => {
  return fetch(`${API_ROOT}/transactions`, {
    method: "GET",
    headers: headers()
  }).then(res => res.json());
}
const fetchBudgets = () => {
  return fetch(`${API_ROOT}/budgets`, {
    method: "GET",
    headers: headers()
  }).then(res => res.json());
}


export const api = {
    auth: {
      login,
      getCurrentUser,
      createNewUser,
      plaidAuth,
      fetchTransactions,
      fetchCreatedTransactions,
      fetchBudgets
    },
};