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
import Dialog from '@material-ui/core/Dialog';
import SignUp from './signUp'
import SignIn from './signIn'





function Login(props: { history: any; }) {
  const classes = useStyles();
  const userDispatch = useUserDispatch();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [activeTabId, setActiveTabId] = useState<any>(0);
  const bookServices = BookServices.getInstance()
  const [isOpen, setIsOpen] = useState<any>(false)
  const [form, setform] = useState<any>({
    fullname: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target
    setform({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    bookServices.auth(form).subscribe((data:any) => {
      setIsLoading(false)
      if (data.data.codigo === "0") {
        setError(true)
      } else {
        loginUser(
          userDispatch,
          data.data[0],
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
    setIsLoading(true)
    bookServices.createUser(form).subscribe(() => {
      setIsLoading(false)
      setIsOpen(true)
      setActiveTabId(0)
      setTimeout(() => {
        setIsOpen(false)
      }, 1000);

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

      {isOpen && (
        <Dialog aria-labelledby="customized-dialog-title" open={isOpen}>
          <div style={{ width: '300px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Bienvenido !!
          </div>
        </Dialog>
      )}
    </Grid>

  );
}

export default withRouter(Login);
