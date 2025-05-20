const initialState = {
    // Todos los productos del catálogo desde la BBDD
    Products: [],

    // Productos de la busqueda
    Search: [],

    // Todas las categorías desde la BBDD
    Categories: [],

    // Un auxiliar cuando se está editando una Categoría o Producto
    Edit: false,

    // Es el producto que se muestra en la ruta /products/:id
    producto: {
        name: "",
        img: "",
        brand: "",
        description: "",
        stock: 0,
        price: 0,
        id: 4000,
        colors: "",
        size: "",
        typology: "",
        reviews: []
    },

    // Review el producto
    review: [],

    // Un auxiliar para saber si ya tiene una cuenta creada o no 
    // previa confirmación desde la BBDD
    NoexisteUsuario: true,

    // Toda la info de un Usuario que recién crea una cuenta para
    // luego usar esa info en todas las demas rutas como su 
    // userId, name, lastName, mail, isAdmin...
    infoUser: undefined,

    // Todas las ordenes de un usuario comun, para el historial
    userHistory: [],

    // Auxiliar para saber si se encuentra logueado un usuario
    logIn: false,

    // Carrito fantasma para guardar los productId 
    cart_guest: [],

    // Carrito del Usuario logueado
    cart_user: {},

    // Informacion del usuario de un carrito, visto desde el admin
    info_cart_user: {},

    // Informacion de los productos de un carrito, visto desde el admin
    info_cart_user_products: {},

    // Al fallar el login evitar que pueda ingresar y se mantenga en /login
    fail: false,

    // Cantidad de objetos en el carrito
    Cantidad: 0,

    // Mostrar o no lo filtros cuando hay una búsqueda
    Filters: true,

    // Fecha para saber cual fue la ultima sesión o acciones 
    // antes de cerrar la ventana o navegadr
    Registro: 0,

    // La data completa de todas las ordenes que puede ver un admin
    Orders_table: []
};

let Aux = undefined;

function verificarStore() {
    var User = undefined;
    var Guest = undefined;
    if (typeof(Storage) !== "undefined") {
        if (localStorage.user) {
            User = JSON.parse(localStorage.getItem("user"));
        }
        if (localStorage.guest) {
            Guest = JSON.parse(localStorage.getItem("guest"));
        }

        // Para verificar la ultima sesion
        if(User === undefined || Guest === undefined) {
            return Aux;
        }

        var date_user = User.Registro;
        var date_guest = Guest.Registro;

        if (date_user > date_guest) {
            Aux = User;
            return Aux;
        } else {
            Aux = Guest;
            return Aux;
        }
    }
}

verificarStore();

function rootReducer(state = Aux === undefined ? initialState : Aux, action) {
    switch (action.type) {
        case "GET_ORDERS_ADMIN":
            return {
                ...state,
                Orders_table: action.payload
            }

        case "GET_CATALOGO":
            return {
                ...state,
                Products: action.payload,
                Filters: true,
            }

        case "GET_SEARCH":
            return {
                ...state,
                Search: action.payload,
                Filters: false
            }

        case "GET_CATEGORIES":
            return {
                ...state,
                Categories: action.payload,
                Edit: action.edit
            }

        case "GET_PRODUCTO":
            return {
                ...state,
                producto: action.payload
            }

        case "EDIT":
            return {
                ...state,
                Edit: action.edit
            }

        case "NEW_USER":
            return {
                ...state,
                infoUser: action.payload,
                NoexisteUsuario: action.existe,
                fail: action.error
            }

        case "NEW_USER_LOGIN":
            return {
                ...state,
                logIn: action.payload
            }

        case "NO_NEW_USER":
            return {
                ...state,
                NoexisteUsuario: action.existe,
            }

            // Encontrar problema descrito en el accion
        case "LOAD_CART":
            return {
                ...state,
                Cantidad: state.Cantidad + 1
            }

            // Hacer el dispatch de la acción dentro del componente de Cart...
        case "GET_ORDER":
            return {
                ...state,
                cart_user: action.payload,
            }

        case "GET_ORDER_USER":
            return {
                ...state,
                info_cart_user: action.payload
            }

        case "ADMIN_ORDER":
            return {
                ...state,
                info_cart_user_products: action.payload
            }

        case "LOG_OUT":
            return {
                ...state,
                infoUser: action.payload,
                logIn: action.logOut,
                Cantidad: action.cantidad
            }

        case "ERROR":
            return {
                ...state,
                fail: action.payload
            }

        case "LOAD_PHANTOM":
            return {
                ...state,
                cart_guest: state.cart_guest.concat(action.payload),
                Cantidad: state.Cantidad + 1
            }

        case "DELETE_GUEST_CART":
            return {
                ...state,
                cart_guest: action.payload,
                Cantidad: action.cantidad
            }

        case "TRANSFER":
            return {
                ...state
            }

        case "COMPLETED":
            return {
                ...state,
                cart_guest: action.payload,
                Cantidad: action.cantidad
            }

        case "DELETE_CART":
            return {
                ...state,
                Cantidad: action.payload
            }

        case "SAVE_DATE":
            return {
                ...state,
                Registro: action.payload
            }
        case "GET_REVIEWS":
            return {
                ...state,
                review: action.payload
            }

        case "MAIL_SEND":
            return {
                ...state
            }
        
        case "PUT_USER":
            return {
                ...state,
                infoUser: action.payload
            }

        case "GET_HISTORY":
            return {
                ...state,
                userHistory: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;