import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/images")
      .then((res) => {
        setData(res.data[1].image);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [count]);
  const handlechange = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3000/upload", formData)
      .then((res) => {
        console.log(res.data); // Axios automatically parses the JSON response
        setData(res.data); // Set the data with the response
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  return (
    <>
      <input
        type="file"
        id="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={handlechange}>Upload</button>
      <div>
        <img
          src={`http://localhost:3000/images/${data}`}
          alt="uploaded"
          style={{ width: "100px", margin: "10px" }}
        />
      </div>
    </>
  );
}

export default App;
