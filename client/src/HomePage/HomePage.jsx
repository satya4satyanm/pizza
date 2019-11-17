import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';
import { authHeader } from '../_helpers';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        const { user } = this.props;
        this.selectedPizzas = [];
        this.state = {
            pizzas: [],
            orders: [],
            orderObj: {
            "username": user.username,
            "address": { "street": "bnpura" },
            "items": [],
            "delivered": false}
        }

        this.placeOrder = this.placeOrder.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.delivered = this.delivered.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();

        let t = this;
        fetch(`${config.apiUrl}/pizzas/getAllPizzas`, {
            method: 'GET',
            headers: authHeader()
          })
            .then(r => r.json())
            .then(data => {
                this.setState({
                    pizzas : data
                })
            });


        fetch(`${config.apiUrl}/orders/getOrders`, {
            method: 'GET',
            headers: authHeader()
            })
            .then(r => r.json())
            .then(data => {
                this.setState({
                    orders : data
                })
                console.log('data returned:', data)
            });
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    addToCart(e) {
        this.selectedPizzas.push(JSON.parse(e.target.getAttribute("data-p")));
        debugger;
        this.updateState();
    }

    updateState() {
        this.setState(prevState => {
            let orderObj = Object.assign({}, prevState.orderObj); 
            orderObj["items"] = this.selectedPizzas;                              
            return { orderObj };                        
            })
    }

    removeFromCart(e) {
        this.selectedPizzas.splice(e.target.getAttribute("data-p"), 1);
        this.updateState();

    }

    placeOrder() {
        debugger;

        fetch(`${config.apiUrl}/orders/placeOrder`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(this.state.orderObj)
            })
            .then(
                r => r.json()
            )
            .then(data => {
                console.log('data returned:', data)
                this.selectedPizzas=[];
                this.updateState();
            });
    }


    delivered(e) {
        var val = e.target.getAttribute("data-value");
        fetch(`${config.apiUrl}/orders/removeOrder`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({orderId: val})
            })
            .then(
                r => r.json()
            )
            .then(data => {
                console.log('data returned:', data)
                if(data.success == 1) {
                    var items = this.state.orders;
                    items.splice(items.findIndex(function(i){
                        return i.orderId === val;
                    }), 1);

                    this.setState({
                        orders: items
                    })
                }
            });
    }

    render() {
        const { user, users } = this.props;
        return (
            
            <div>
                
                <div className="jumbotron" style={{"padding":"20px"}} >
                    <h1 className="float-left">Pizza Hunt App</h1>
                    <Link className="float-right" to="/login">Logout</Link>
                    <p className="float-right" style={{"marginRight":"20px"}} >Hi {user.firstName}! </p>
                    <div style={{"clear": "both"}}></div>
                </div>
                
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
               
                {user.role == "admin" &&
                    <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm">
                        <h2>Orders List</h2>
                        <p>Check if delivered.</p>
                        <table><tbody>
                            {this.state.orders.map((order, index) =>
                                <tr key={order.orderId}><td>
                                    {order.createdDate}
                                </td><td>
                                    {order.orderId}
                                </td>
                                <td>
                                <input type="button" onClick={this.delivered} value="-" data-value={order.orderId} />
                                </td>
                                </tr>
                            )}
                        </tbody></table>
                    </div>
                    <div className="col-sm">
                        <h2>Manage Pizzas</h2>
                    </div>
                    <div className="col-sm">
                        <h2>Manage Stores</h2>
                    </div>
                    </div>
                    </div>
                }
                {
                    user.role == "user" && 
                    <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm">
                            <h2>Pizza List</h2>
                            <form><table><tbody>
                                {this.state.pizzas.map((pizza, index) =>
                                    <tr key={pizza.name}><td>
                                        {pizza.description} 
                                        </td>
                                        <td>
                                            <img src="p.jpg"/>
                                        </td>
                                        <td>
                                        ${pizza.price} 
                                        </td>
                                        <td>
                                        <input type="button" data-p={JSON.stringify(pizza)} onClick={this.addToCart} value="+"></input>
                                        </td>
                                    </tr>
                                )}
                            </tbody></table>
                            {/* <input type="button" onClick={this.addToCart} value="Add to cart"></input> */}
                            </form>
                        </div>
                        <div className="col-sm">
                            <h2>Cart</h2>
                            <div className="alert alert-success">{"success"}</div>
                            <table><tbody>
                                {this.selectedPizzas.map((pizza, index) =>
                                    <tr key={index}><td>
                                        {pizza.name} 
                                        </td>
                                        <td>
                                        ${pizza.price} 
                                        </td>
                                        <td>
                                        <input type="button" data-p={pizza} onClick={this.removeFromCart} value="-"></input>
                                        </td>
                                    </tr>
                                )}
                                <tr><td>Total</td><td>$
                                {
                                    this.selectedPizzas.reduce((a, b) => a + (b["price"] || 0), 0)
                                }</td><td></td></tr>
                            </tbody></table>
                            <p> </p>
                            <input type="button" onClick={this.placeOrder} value="Place Order"></input>
                        </div>
                    </div>
                    </div>
                }
                <p>
                    
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}



const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };