import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class RegisterComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillRecieveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };


    axios
    .post('/api/users/register', newUser)
    .then(res => 
      console.log(res.data))
    .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;


    return (
      <div class="register">
        <div class="container">

          <div class="row">
            <div class="col-md-8 m-auto">
              <h1 class="display-4 text-center">Sign Up</h1>
              <p class="lead text-center">Create your Read With Me account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    class={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div class="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div class="invalid-feedback">{errors.email}</div>
                  )}

                  <small class="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div class="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div class="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// RegisterComponent.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// }


// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors
// });

export default RegisterComponent;