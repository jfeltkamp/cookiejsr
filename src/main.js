import './styles/App.scss'
import App from './App.svelte'
import { mount } from 'svelte';

const app = mount(App, {
  target: document.getElementById('cookiesjsr')
})

export default app
