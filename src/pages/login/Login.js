import { useState } from "react";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { BookServices } from '../../services/book-service'
import useStyles from "./styles";
import logo from "./books.svg";
import { useUserDispatch, loginUser } from "../../context/UserContext";
import SignUp from './signUp'
import SignIn from './signIn'
function Login(props) {
  const classes = useStyles();
  const userDispatch = useUserDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const bookServices = BookServices.getInstance()

  const [form, setform] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setform({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    bookServices.auth(form).subscribe((data) => {
      if (data.data.codigo === "0") {
        setError(true)
      } else {
        loginUser(
          userDispatch,
          data.data.email,
          data.data.password,
          props.history,
          setIsLoading,
          setError,
        )
      }
    },
      (error) => console.log(error)
    );
  }

  const handleCreateUser = () => {
    bookServices.createUser(form).subscribe((data) => {
      setActiveTabId(0)
    },
      (error) => console.log(error)
    );
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Litte Library</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Entrar" classes={{ root: classes.tab }} />
            <Tab label="Registrar" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <>
              <SignIn
                error={error}
                isLoading={isLoading}
                form={form}
                classes={classes}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              ></SignIn>
            </>
          )}
          {activeTabId === 1 && (
            <SignUp
              error={error}
              isLoading={isLoading}
              form={form}
              classes={classes}
              handleInputChange={handleInputChange}
              handleCreateUser={handleCreateUser}
            >
            </SignUp>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2021-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://www.linkedin.com/in/jose-alvarez-41380a199/" rel="noopener noreferrer" target="_blank">JoseCheo</a>, FrontEnd Develop
        </Typography>
      </div>
    </Grid>

  );
}

export default withRouter(Login);
