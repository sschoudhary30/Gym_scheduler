import classes from './Nav.module.css'
import logo from '../../assets/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const l = location.state && location.state.name;

  const checkMe = () => {
    navigate(`/`)
  }
  return (
    <div className={classes.body}>
        <img src={logo} alt='' className={classes.img}/>
        <h3 className={classes.name}>Trainme</h3>
        {
          (location.state)?<h3 className={classes.name_of}>{l}</h3>
          :<button className={classes.cr} onClick={checkMe}>CREATE ACCOUNT</button>
        }
    </div>
  )
}

export default Nav