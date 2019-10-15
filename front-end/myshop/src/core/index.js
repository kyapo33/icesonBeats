import { API_URL } from "../config"

export const getProducts = async (sortBy) => {
    try {
        const response = await fetch(`${API_URL}/product?sortBy=${sortBy}&order=desc&limit=0`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const getCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/category`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const getProductByCategory = async (categoryId, sortBy) => {
    try {
        const response = await fetch(`${API_URL}/category/${categoryId}?sortBy=${sortBy}&order=desc&limit=0`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const getBraintreeToken = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/pay/braintree/getToken/${userId}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }    
}

export const processPayment = async (userId, token,paymentData) => {
    try {
        const response = await fetch(`${API_URL}/pay/braintree/payment/${userId}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }    
}

export const createOrder = async (userId, token, orderData) => {
    try {
        const response = await fetch(`${API_URL}/order/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ order: orderData })
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }    
}

export const sendContact = async data => {
    try {
        const response = await fetch(`${API_URL}/userone/contact`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }    
}