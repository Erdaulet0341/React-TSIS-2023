import { Link } from 'react-router-dom'
import s from './Login.module.css'

const Login = (props) =>{

    let type = props.type

    if(type === 'client') type = "/client-registration"
    else type = "/seller-registration"

    return (
        <div className={s.main}>
      <form>
        <div className={s.container}>
          <h1>Login</h1>
          <p>Enter email and password for login</p>
          
          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="example@mail.com"
            name="username"
            id="username"
            required
          />


          <label for="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="**********"
            name="pwd"
            id="pwd"
            required
          />

          <button type="submit">Login</button>
        </div>
        <div className={s.already}>
          <p>
            Don't have an Account? <Link className={s.link} to={type}>Register</Link>.
          </p>
        </div>
      </form>
    </div>
    )
}

export default Login