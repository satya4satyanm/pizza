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

        this.state = {
            pizzas: [],
            orders: [],
            orderObj: {
            "username": user.username,
            "address": { "street": "bnpura" },
            "items": ['p1','p2'],
            "delivered": false}
        }

        this.placeOrder = this.placeOrder.bind(this);
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

    placeOrder() {
        fetch(`${config.apiUrl}/orders/placeOrder`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(this.state.orderObj)
            })
            .then(r => r.json())
            .then(data => {
                console.log('data returned:', data)
            });
    }

        
    getAllPizzas() {
        return (<ul>
           { 
                this.state.pizzas.map(function(item, i){
                    return <li>{item.description}</li>
                })
           }
        </ul>)
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1><Link to="/login">Logout</Link>
                {/* <p>You're logged in with React!!</p> */}
                {/* <h3>All registered users:</h3> */}
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {/* {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                } */}
                {user.role == "admin" &&
                    <div>
                        <h2>Orders List</h2>
                        <table border="2">
                            {this.state.orders.map((order, index) =>
                                <tr><td>
                                    {order.createdDate}
                                </td><td>
                                    {order.orderId}
                                </td></tr>
                            )}
                        </table>
                    </div>
                }
                {
                    user.role == "user" && 
                    <form><ul>
                        {this.state.pizzas.map((pizza, index) =>
                            <li key={pizza.name}>
                                {pizza.description} <input type="checkbox" value={pizza.name} />
                            </li>
                        )}
                    </ul>
                    <input type="button" onClick={this.placeOrder} value="Place Order"></input>
                    </form>
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