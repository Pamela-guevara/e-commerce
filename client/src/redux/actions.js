const axios = require("axios");

export function saveDate() {
    var d = new Date();
    var data = d.getTime()
    return { type: "SAVE_DATE", payload: data }
}

export function saveLocalStorage_user(data) {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.user) {
            localStorage.setItem("user", data);
        } else {
            localStorage.setItem("user", data);
        }
    }
};

export function saveLocalStorage_guest(data) {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.guest) {
            localStorage.setItem("guest", data);
        } else {
            localStorage.setItem("guest", data);
        }
    }
};

export function getOrdersAdmin() {
    return function (dispatch) {
        return axios.get("http://localhost:8080/orders/")
            .then(res => res.data)
            .then(data => (dispatch({ type: "GET_ORDERS_ADMIN", payload: data })))
    }
};

export function getOrdersFiltersAdmin(value) {
    return function (dispatch) {
        return axios.get("http://localhost:8080/orders/", {
            params: {
                status: value
            }
        })
            .then(res => res.data)
            .then(data => (dispatch({ type: "GET_ORDERS_ADMIN", payload: data })))
    }
};

export function updateOrderStatus(id, newStatus, prevStatus) {
    return function (dispatch) {
        return axios.put("http://localhost:8080/orders/" + id, {
            status: newStatus
        })
            .then(res => res.data)
            .then(() => { dispatch(getOrdersFiltersAdmin(prevStatus)) })
    }
}

export function getData() {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/products/")
            .then(res => res.data)
            .then(data => (dispatch({ type: "GET_CATALOGO", payload: data })))
    };
};

export function getSearch(value) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/products/search", {
            params: value
        })
            .then(res => res.data)
            .then(data => { dispatch({ type: "GET_SEARCH", payload: data }) })
    };
};

export function getCategories() {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/categories/")
            .then(res => res.data)
            .then(data => (dispatch({ type: "GET_CATEGORIES", payload: data, edit: false })))
    };
};

export function deleteCategories(id) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.delete("http://localhost:8080/categories/" + id)
            .then(res => res.data)
            .then(data => (dispatch(getCategories())))
    };
};

export function deleteProducto(id) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.delete("http://localhost:8080/products/" + id)
            .then(res => res.data)
            .then(data => (dispatch(getData())))
    };
};

export function editar() {
    saveDate();
    return { type: "EDIT", edit: true }
};

export function putCategories(id, category) {
    return function (dispatch) {
        dispatch(editar())
        return axios.put("http://localhost:8080/categories/" + id, {
            nameCategory: category.name,
            descriptionCategory: category.description
        })
            .then(res => res.data)
            .then(data => (dispatch(getCategories())))
    };
};

export function putProducto(idProduct, oldCategory, form) {
    return function (dispatch) {
        dispatch(editar())
        return axios.put("http://localhost:8080/products/" + idProduct, form)
            .then(res => res.data)
            .then(data => (dispatch(modifyCategory(idProduct, oldCategory, form.get('categories')))))
    };
};

export function modifyCategory(idProduct, lastCategory, newCategory) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.delete("http://localhost:8080/products/" + idProduct + "/category/" + lastCategory)
            .then(res => res.data)
            .then(data => (dispatch(addCategory(idProduct, newCategory))))
    }
}

export function postCategories(category) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.post("http://localhost:8080/categories/", {
            name: category.name,
            description: category.description
        })
            .then(res => res.data)
            .then(data => (dispatch(getCategories())))
    };
};

export function postProducto(form) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.post("http://localhost:8080/products/", form)
            .then(res => res.data)
            .then(data => (dispatch(addCategory(data.id, form.get('categories')))))
    };
};

export function addCategory(idProduct, idCategory) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.post("http://localhost:8080/products/" + idProduct + "/category/" + idCategory)
            .then(res => res.data)
            .then(data => (dispatch(getData())))
    }
}

export function getProducto(id) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/products/" + id)
            .then(res => res.data)
            .then(data => (dispatch({ type: "GET_PRODUCTO", payload: data })))
    };
};

export function getHistory(id) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/orders/history/" + id)
            .then(res => res.data)
            .then(data => (dispatch({type: "GET_HISTORY", payload: data})))
    }
}

// Revisar bien lo que regresa esta data... Va a ser util cuando se haga el carrito fantasma
export function postProductoToCart(userId, productId) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.post("http://localhost:8080/carts/" + userId, {
            idProduct: productId
        })
            .then(res => res.data)
            .then(data => { dispatch({ type: "LOAD_CART", payload: data }) })
    }
};

function newUser() {
    saveDate();
    return { type: "NEW_USER_LOGIN", payload: true }
};

export function postNewUser(form, products) {
    return function (dispatch) {
        dispatch(newUser())
        return axios.post("http://localhost:8080/users/", {
            name: form.name,
            mail: form.email,
            lastName: form.lastName,
            password: form.password,
        })
            .then(() => { dispatch(findUserByEmail(form.email, products)) })
    }
};

export function findUserByEmail(mail, products) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/users/find/" + mail)
            .then(res => res.data)
            .then(data => {
                dispatch(transferirCarrito(data.id, products))
                dispatch({
                    type: "NEW_USER",
                    payload: data,
                    existe: data ? true : false,
                    reset_mail: undefined,
                    error: false
                })
            })
    }
};

function yaExiste() {
    saveDate();
    return { type: "NO_NEW_USER" }
};

export function getUserId(mail) {
    return function (dispatch) {
        dispatch(yaExiste())
        return axios.get("http://localhost:8080/users/find/" + mail)
            .then(res => res.data)
            .then(data => (dispatch({
                type: "NO_NEW_USER",
                payload: data,
                existe: data ? false : true,
            })))
    }
};

export function getOrder(id) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/orders/" + id)
            .then(res => res.data)
            .then(data => (dispatch({ type: "GET_ORDER", payload: data })))
    }
};

function getUserById(id) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/users/" + id)
            .then(res => res.data)
            .then(data => (dispatch({ type: "GET_ORDER_USER", payload: data })))
    }
};

export function getOrderUser(id) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/orders/" + id)
            .then(res => res.data)
            .then(data => {
                dispatch({ type: "ADMIN_ORDER", payload: data });
                dispatch(getUserById(data.userId))
            })
    }
};

export function logOutUser() {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.delete("http://localhost:8080/users/logout")
            .then(() => (dispatch({ type: "LOG_OUT", payload: undefined, logOut: false, cantidad: 0 })))
    }
};

export function logInUser(Login, products) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.post("http://localhost:8080/users/login", {
            mail: Login.mail,
            password: Login.password,
        })
            .then(() => {
                dispatch(findUserByEmail(Login.mail, products));
                dispatch(newUser())
            })
            .catch(() => dispatch(failLogIn()))
    }
};

function failLogIn() {
    saveDate();
    return { type: "ERROR", payload: true }
};

export function cargarFantasma(data) {
    saveDate();
    return { type: "LOAD_PHANTOM", payload: data }
};

export function borrarFantasma() {
    saveDate();
    return { type: "DELETE_GUEST_CART", payload: [], cantidad: 0 }
};

export function borrarCarrito() {
    saveDate();
    return { type: "DELETE_CART", payload: 0 }
};

function intermedio() {
    return { type: "TRANSFER" }
}
export function transferirCarrito(userId, products) {
    return function (dispatch) {
        intermedio();
        saveDate();
        for (let i = 0; i < products.length; i++) {
            dispatch(postProductoToCart(userId, products[i].id))
        }
        dispatch({ type: "COMPLETED", payload: [], cantidad: 0 })
    }
};

export function postReview(review) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.post("http://localhost:8080/products/" + review.idProduct + "/reviews", {
            ...review
        })
            .then(res => res.data)
    }
}

export function getReviews(id) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/products/" + id + "/reviews")
            .then(res => res.data)
            .then(data => (dispatch({ type: "GET_REVIEWS", payload: data })))
    }
};

export function putUserOrder_precio(orderId, { total_price }) {
    return function (dispatch) {
        return axios.put("http://localhost:8080/orders/" + orderId, {
            total_price
        })
            .then(() => { dispatch(getOrder(orderId)) })
    }
};

export function putUserOrder_checkout(orderId, form) {
    return function (dispatch) {
        return axios.put("http://localhost:8080/orders/" + orderId, {
            address: form.street + '. ' + form.number + '. ' + form.city + '. ' + form.province,
            details: form.details
        })
            .then(() => { dispatch(getOrder(orderId)) })
    }
};

export function putUserOrder_status(orderId, status, userId) {
    return function (dispatch) {
        return axios.put("http://localhost:8080/orders/" + orderId, {
            status,
            userId
        })
            .then(() => { dispatch(getOrder(orderId)) })
    }
};

export function getLastOrder(userId) {
    return function (dispatch) {
        return axios.get("http://localhost:8080/orders/lastOrder/" + userId)
            .then(res => res.data)
            .then(data => { dispatch({ type: "GET_ORDER", payload: data }) })
    }
};

export function postMailUser(orderId, name, mail) {
    return function (dispatch) {
        return axios.post("http://localhost:8080/orders/" + orderId, {
            mail,
            name
        })
            .then(() => { dispatch({ type: "MAIL_SEND" }) })
    }
};

export function putUser(current) {
    return function (dispatch) {
        return axios.put(`http://localhost:8080/users/${current.id}/profile`, {
            name: current.name,
            lastName: current.lastName,
            mail: current.mail,
            password: current.password
        })
            .then(res => res.data)
            .then(data => { dispatch(getUser(current.id)) })
    }
};

export function getUser(userId) {
    return function (dispatch) {
        return axios.get(`http://localhost:8080/users/${userId}/profile`)
            .then(res => res.data)
            .then(data => { dispatch({ type: 'PUT_USER', payload: data }) })
    }
};

export function logInUser_Auth(id, products) {
    return function (dispatch) {
        dispatch(saveDate());
        return axios.get("http://localhost:8080/users/" + id)
            .then(res => res.data)
            .then(data => {
                dispatch(transferirCarrito(data.id, products))
                dispatch(
                    {
                        type: "NEW_USER",
                        payload: data,
                        existe: data ? true : false,
                        reset_mail: undefined,
                        error: false
                    })
                dispatch(newUser())
            })
    }
};