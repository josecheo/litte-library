import {
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";



function SignUp({ form, classes, handleInputChange, handleCreateUser, error, isLoading }:any) {
  return (
    <>
      <Typography variant="h2" className={classes.subGreeting}>
        Crear tu cuenta
              </Typography>
      <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
          algo esta mal :(
                </Typography>
      </Fade>
      <TextField
        id="name"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        name='fullname'
        value={form.fullname}
        onChange={e => handleInputChange(e)}
        margin="normal"
        placeholder="Nombre Completo"
        type="text"
        fullWidth
      />
      <TextField
        id="email"
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={form.email}
        onChange={e => handleInputChange(e)}
        margin="normal"
        placeholder="Correo Electronico"
        type="email"
        name='email'
        fullWidth
      />
      <TextField
        id="password"
        name='password'
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={form.password}
        onChange={e => handleInputChange(e)}
        margin="normal"
        placeholder="Contraseña"
        type="password"
        fullWidth
      />
      <div className={classes.creatingButtonContainer}>
        {isLoading ? (
          <CircularProgress size={26} />
        ) : (
          <Button
            onClick={() =>
              handleCreateUser()
            }
            disabled={
              form.email.length === 0 ||
              form.password.length === 0 ||
              form.fullname.length === 0
            }
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.createAccountButton}
          >
            Crear tu cuenta
          </Button>
        )}
      </div>
 
    
    </>


  );
}

export default withRouter(SignUp);
