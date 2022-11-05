import '../styles/globals.css';
import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, Contract, Server } from '../context'
import Body from '../Components/Body';
import NavigationBar from '../Components/NavigationBar';


function MyApp({ Component, pageProps }) {

  return (
    <div className="App text">
      <Provider>
        <Contract>
          <Server>  
            <NavigationBar></NavigationBar>
              <Body/>
              <Component {...pageProps} />
          </Server>
        </Contract>
      </Provider>
    </div>
  )
}

export default MyApp
