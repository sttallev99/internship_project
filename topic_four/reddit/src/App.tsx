import Posts from "components/posts/Posts";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
