import {
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import google from "../../images/google.svg";


function signIn({ form, classes, handleInputChange, handleSubmit, error, isLoading }:any) {
  return (
    <>
     
      <Fade in={error}>
        <Typography color="secondary" className={classes.errorMessage}>
          Algo está mal con su nombre de usuario o contraseña :(
      </Typography>
      </Fade>
      <TextField
        id="email"
        name='email'
        InputProps={{
          classes: {
            underline: classes.textFieldUnderline,
            input: classes.textField,
          },
        }}
        value={form.email}
        onChange={e => handleInputChange(e)}
        margin="normal"
        placeholder="Correo electrónico"
        type="email"
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
      <div className={classes.formButtons}>
        {isLoading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          <Button
            disabled={
              form.email.length === 0 || form.password.length === 0
            }
            onClick={() =>
              handleSubmit()
            }
            variant="contained"
            color="primary"
            size="large"
          >
            Entrar
          </Button>
        )}

      </div>
    </>
  );
}

export default withRouter(signIn);
