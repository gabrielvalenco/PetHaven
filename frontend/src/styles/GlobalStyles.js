import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Brand Colors */
    --primary: #4CAF50;
    --primary-light: #80E27E;
    --primary-dark: #087f23;
    --secondary: #FFA000;
    --secondary-light: #FFC947;
    --secondary-dark: #C67100;
    
    /* Status Colors */
    --danger: #F44336;
    --success: #4CAF50;
    --warning: #FF9800;
    --info: #2196F3;
    
    /* Light Theme Colors */
    --light-bg: #f9f9f9;
    --light-bg-secondary: #ffffff;
    --light-bg-accent: #f0f0f0;
    --light-text: #212121;
    --light-text-secondary: #555555;
    --light-border: #e0e0e0;
    --light-card-bg: #ffffff;
    --light-input-bg: #ffffff;
    --light-navbar-bg: #ffffff;
    --light-footer-bg: #212121;
    --light-footer-text: #f5f5f5;
    
    /* Dark Theme Colors */
    --dark-bg: #121212;
    --dark-bg-secondary: #1e1e1e;
    --dark-bg-accent: #2a2a2a;
    --dark-text: #f5f5f5;
    --dark-text-secondary: #b0b0b0;
    --dark-border: #333333;
    --dark-card-bg: #1e1e1e;
    --dark-input-bg: #2d2d2d;
    --dark-navbar-bg: #1a1a1a;
    --dark-footer-bg: #0a0a0a;
    --dark-footer-text: #f5f5f5;
    
    /* Shadows */
    --light-shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --light-shadow-md: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    --light-shadow-lg: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    --light-shadow-xl: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    
    --dark-shadow-sm: 0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.6);
    --dark-shadow-md: 0 3px 6px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.7);
    --dark-shadow-lg: 0 10px 20px rgba(0,0,0,0.7), 0 6px 6px rgba(0,0,0,0.8);
    --dark-shadow-xl: 0 14px 28px rgba(0,0,0,0.8), 0 10px 10px rgba(0,0,0,0.9);
    
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
  
  /* Apply theme variables based on data-theme attribute */
  body {
    --bg: var(--light-bg);
    --bg-secondary: var(--light-bg-secondary);
    --bg-accent: var(--light-bg-accent);
    --text: var(--light-text);
    --text-secondary: var(--light-text-secondary);
    --border: var(--light-border);
    --card-bg: var(--light-card-bg);
    --input-bg: var(--light-input-bg);
    --navbar-bg: var(--light-navbar-bg);
    --footer-bg: var(--light-footer-bg);
    --footer-text: var(--light-footer-text);
    --shadow-sm: var(--light-shadow-sm);
    --shadow-md: var(--light-shadow-md);
    --shadow-lg: var(--light-shadow-lg);
    --shadow-xl: var(--light-shadow-xl);
  }
  
  body[data-theme='dark'] {
    --bg: var(--dark-bg);
    --bg-secondary: var(--dark-bg-secondary);
    --bg-accent: var(--dark-bg-accent);
    --text: var(--dark-text);
    --text-secondary: var(--dark-text-secondary);
    --border: var(--dark-border);
    --card-bg: var(--dark-card-bg);
    --input-bg: var(--dark-input-bg);
    --navbar-bg: var(--dark-navbar-bg);
    --footer-bg: var(--dark-footer-bg);
    --footer-text: var(--dark-footer-text);
    --shadow-sm: var(--dark-shadow-sm);
    --shadow-md: var(--dark-shadow-md);
    --shadow-lg: var(--dark-shadow-lg);
    --shadow-xl: var(--dark-shadow-xl);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Nunito', 'Segoe UI', 'Roboto', sans-serif;
    background-color: var(--bg);
    color: var(--text);
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
    border-radius: var(--radius-md);
    font-weight: 600;
    box-shadow: var(--shadow-sm);
    position: relative;
    overflow: hidden;
    padding: 0.5rem 1.25rem;
  }
  
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    filter: brightness(1.05);
  }
  
  .btn:active {
    transform: translateY(0);
    filter: brightness(0.95);
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
    background-color: var(--card-bg);
    border-color: var(--border);
  }
  
  .card:hover {
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
    border: 2px solid var(--border);
    background-color: var(--input-bg);
    color: var(--text);
  }
  
  .form-control:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
    background-color: var(--input-bg);
    color: var(--text);
  }
  
  /* Theme-specific styles */
  .navbar {
    background-color: var(--navbar-bg) !important;
    box-shadow: var(--shadow-sm);
  }
  
  .navbar .navbar-brand, .navbar .nav-link {
    color: var(--text);
    text-decoration: none !important;
  }
  
  /* Remove underline de todos os links */
  a, a:hover, a:focus, a:active {
    text-decoration: none !important;
  }
  
  .navbar-toggler {
    border-color: transparent;
    padding: 0.25rem;
  }
  
  .navbar-toggler:focus {
    box-shadow: none;
    outline: 2px solid var(--primary-light);
  }
  
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(76, 175, 80, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
  
  footer {
    background-color: var(--footer-bg) !important;
    color: var(--footer-text) !important;
  }
  
  /* Theme toggle button styles */
  .theme-toggle {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-round);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-medium);
    background-color: transparent;
    border: none;
    color: var(--text);
    font-size: 1.2rem;
  }
  
  .theme-toggle:hover {
    background-color: rgba(128, 128, 128, 0.1);
  }
  
  /* Additional theme-specific styles */
  .text-themed {
    color: var(--text) !important;
  }
  
  .bg-themed {
    background-color: var(--bg) !important;
  }
  
  .bg-themed-secondary {
    background-color: var(--bg-secondary) !important;
  }
  
  .bg-themed-accent {
    background-color: var(--bg-accent) !important;
  }
  
  .border-themed {
    border-color: var(--border) !important;
  }
  
  /* Seções com background temático */
  .section-themed {
    background-color: var(--bg-accent);
    color: var(--text);
    transition: var(--transition-medium);
  }
  
  /* Melhorias para botões */
  .btn-group-responsive {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .btn-themed {
    background-color: var(--primary);
    border-color: var(--primary);
    color: white;
  }
  
  .btn-themed:hover {
    background-color: var(--primary-dark);
    border-color: var(--primary-dark);
    color: white;
  }
  
  .btn-themed-secondary {
    background-color: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
  }
  
  .btn-themed-secondary:hover {
    background-color: var(--primary);
    color: white;
  }
`;

export default GlobalStyles;
