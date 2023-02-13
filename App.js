import Authentication from "./src/auth/Authentication";
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
    <>
      <Authentication />
      <FlashMessage position="top" />
    </>
  )
}

export default App;