import { API_URL } from "../config"

export const read = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/userone/customers/${userId}`, {
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
};

export const update = async (userId, token, user) => {
    try {
        const response = await fetch(`${API_URL}/userone/customers/update/${userId}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }    
};

export const updateUser = (user, next) => {
    if(typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
}

export const getOrderHistory = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/userone/customers/order/${userId}`, {
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
};

export const changeUserPassword = async (userId, token, user) => {
    try {
        const response = await fetch(`${API_URL}/userone/change-password/${userId}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }    
};  

export const forgotPassword = async email => {
    console.log("email: ", email);
    try {
        const response = await fetch(`${API_URL}/userone/forgot-password/`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        });
        console.log("forgot password response: ", response);
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const resetPassword = async resetInfo => {
    try {
        const response = await fetch(`${API_URL}/userone/reset-password/`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resetInfo)
        });
        console.log("forgot password response: ", response);
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};
