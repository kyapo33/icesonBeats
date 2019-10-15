import { API_URL } from "../config"

export const createCategory = async (userId, token, category)=> {
    try {
        const response = await fetch(`${API_URL}/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return response.json();
    }
    catch (err) {
        console.log(err);
    }
};

export const createProduct = async (userId, token, product) => {
    try {
        const response = await fetch(`${API_URL}/product/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(product)
        });
        return response.json();
    }
    catch (err) {
        console.log(err);
    }
};

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
};

export const deleteCategory = async (categoryId, userId, token) => {
    try {
        const response = await fetch(`${API_URL}/category/delete/${categoryId}/${userId}`, {
            method: "DELETE",
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
};

export const listOrders = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/order/list/${userId}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/product?limit=undefined&order=desc`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const deleteProduct = async (productId, userId, token) => {
    try {
        const response = await fetch(`${API_URL}/product/delete/${productId}/${userId}`, {
            method: "DELETE",
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
};

export const getProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/product/${productId}`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const updateProduct = async (productId, userId, token, product) => {
    try {
        const response = await fetch(`${API_URL}/product/edit/${productId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(product)
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};