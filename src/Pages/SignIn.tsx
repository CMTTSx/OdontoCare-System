import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import myBackgroundImage from '../assets/backgroundImage.png';
import { login } from '../services/auth';

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('testedemonstracaocsm@outlook.com');
  const [password, setPassword] = React.useState('te$tedemo123');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Função para alternar visibilidade da senha
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Prevenir perda de foco ao clicar no ícone
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verifica se já está autenticado
    const existingToken = sessionStorage.getItem('@airbnb-Token');
    if (existingToken) {
      navigate('/paginaInicial');
      return;
    }

    // Validação
    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha para continuar!');
      return;
    }

    try {
      setLoading(true);

      // Faz login
      await login({ email: email.trim(), password });

      navigate('/paginaInicial');
    } catch (err: any) {      
      // Mensagem de erro específica
      if (err.response?.status === 401) {
        setError('Email ou senha incorretos.');
      } else if (err.response?.status === 403) {
        setError('Usuário desativado. Contate o administrador.');
      } else if (err.response?.status === 500) {
        setError('Erro no servidor. Tente novamente mais tarde.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Erro de conexão. Verifique sua internet.');
      } else {
        setError('Houve um problema com o login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Login ao pressionar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSignIn(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Lado esquerdo - Imagem de fundo */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${myBackgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Lado direito - Formulário */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Entrar
            </Typography>

            <Box 
              component="form" 
              noValidate 
              onSubmit={handleSignIn} 
              onKeyPress={handleKeyPress}
              sx={{ mt: 1, width: '100%' }}
            >
              {/* Campo Email */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="seu@email.com"
              />

              {/* Campo Senha com botão de visibilidade */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Digite sua senha"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Checkbox Lembrar-me */}
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                label="Lembrar-me"
              />

              {/* Botão Entrar */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 48 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <Typography>Entrar</Typography>
                )}
              </Button>

              {/* Mensagem de erro */}
              {error && (
                <Typography 
                  color="error" 
                  sx={{ 
                    mt: 2, 
                    textAlign: 'center',
                    backgroundColor: '#ffebee',
                    padding: '8px',
                    borderRadius: '4px'
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}