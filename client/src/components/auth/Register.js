import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

export default class Register extends Component {
  //component state
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };

    // To have access to "this" when not using arrow functions
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    //? short links possible b/cus of proxy setup
    axios.post('/api/users/register', newUser)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({
        errors: err.response.data
      }));
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text"
                    className={
                      classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                      })
                    }
                    placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name} </div>
                  )}
                </div>
                <div className="form-group">
                  <input type="email"
                    className={
                      classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                      })
                    } placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email} </div>
                  )}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password"
                    className={
                      classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                      })
                    } placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password} </div>
                  )}
                </div>
                <div className="form-group">
                  <input type="password"
                    className={
                      classnames('form-control form-control-lg', {
                        'is-invalid': errors.confirmPassword
                      })
                    } placeholder="Confirm Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword} </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
