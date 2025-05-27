import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #4CAF50;
    --primary-light: #80E27E;
    --primary-dark: #087f23;
    --secondary: #FFA000;
    --secondary-light: #FFC947;
    --secondary-dark: #C67100;
    --danger: #F44336;
    --success: #4CAF50;
    --warning: #FF9800;
    --info: #2196F3;
    --light: #F5F5F5;
    --dark: #212121;
    --gray: #9E9E9E;
    --white: #FFFFFF;
    
    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --shadow-md: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    --shadow-lg: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    --shadow-xl: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    
    /* Transitions */
    --transition-fast: 0.2s all ease;
    --transition-medium: 0.3s all ease;
    --transition-slow: 0.5s all ease;
    
    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-round: 50%;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Nunito', 'Segoe UI', 'Roboto', sans-serif;
    background-color: #f9f9f9;
    color: var(--dark);
    transition: var(--transition-medium);
  }
  
  .page-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
  
  .page-exit {
    opacity: 1;
    transform: translateY(0);
  }
  
  .page-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 300ms, transform 300ms;
  }
  
  /* Botões com efeitos de hover e transições */
  .btn {
    transition: var(--transition-medium);
    position: relative;
    overflow: hidden;
    z-index: 1;
    border-radius: var(--radius-md);
    font-weight: 600;
    box-shadow: var(--shadow-sm);
  }
  
  .btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-round);
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: width 0.5s, height 0.5s;
  }
  
  .btn:hover::after {
    width: 250%;
    height: 300%;
  }
  
  .btn:active {
    transform: scale(0.97);
  }
  
  .btn-primary {
    background-color: var(--primary);
    border-color: var(--primary);
  }
  
  .btn-primary:hover {
    background-color: var(--primary-dark);
    border-color: var(--primary-dark);
  }
  
  .btn-secondary {
    background-color: var(--secondary);
    border-color: var(--secondary);
  }
  
  .btn-secondary:hover {
    background-color: var(--secondary-dark);
    border-color: var(--secondary-dark);
  }
  
  /* Cards com efeitos de hover */
  .card {
    transition: var(--transition-medium);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
  
  /* Animações de carregamento */
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .pulse {
    animation: pulse 2s infinite;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }
  
  /* Efeitos de imagem */
  .img-hover-zoom {
    overflow: hidden;
  }
  
  .img-hover-zoom img {
    transition: var(--transition-medium);
  }
  
  .img-hover-zoom:hover img {
    transform: scale(1.1);
  }
  
  /* Input com estilo personalizado */
  .form-control {
    transition: var(--transition-medium);
    border-radius: var(--radius-md);
    border: 2px solid #e0e0e0;
  }
  
  .form-control:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
  }
`;

export default GlobalStyles;
