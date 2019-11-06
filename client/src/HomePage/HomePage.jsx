import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pizzas: []
        }
    }

    componentDidMount() {
        this.props.getUsers();

        let t = this;
        fetch(`${config.apiUrl}/pizzas/getAllPizzas`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          })
            .then(r => r.json())
            .then(data => {
                this.setState({
                    pizzas : data
                })
                console.log('data returned:', data)
            });

    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
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
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
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
                }
                {user.role == "admin" &&
                    <div>See orders</div>
                }
                {
                    user.role == "user" && 
                    <ul>
                        {this.state.pizzas.map((pizza, index) =>
                            <li key={pizza.name}>
                                {pizza.description}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
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