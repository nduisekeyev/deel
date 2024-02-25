import { useState } from "react";
import "./App.css";
import Autocomplete from "./components/Autocomplete";
import { useFetchUsers } from "./hooks/useFetchUsers";

function App() {
  const [init, setInit] = useState<boolean>(false);
  const { users, loading } = useFetchUsers(init);

  const handleInputClick = (item: boolean) => {
    setInit(item);
  };

  return (
    <div className="App">
      <h1>Search for User</h1>

      <Autocomplete
        suggestions={users}
        loading={loading}
        onInputClick={handleInputClick}
      />
    </div>
  );
}

export default App;
