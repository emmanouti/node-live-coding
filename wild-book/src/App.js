import Wilder from "./components/Wilder.js";
import './App.css';

function App() {
  const profileInfo = [{name: "Jane Doe", description: "The student description is right here ! I love to code.", skills: ["HTML", "CSS"]}, {name: "Paul William", description: "The student description is right here ! I've done many things.", skills: ["JavaScript", "CSS"]}, {name: "Sydney Kingston", description: "The student description is right here ! I am a geek.", skills: ["Python", "PHP", "React"]}]
  return (
    <div className="App">
      <header className="header">
        <h1>Wilder Book</h1>
      </header>
      <h2>Meet the wilders !</h2>
      <div className="cards_container">
        {profileInfo.map((e) => <Wilder name={e.name} description={e.description} skills={e.skills}/>)}
      </div>
      <footer>
        <div className="footer">
          <p>&copy; 2022 WILD CODE SCHOOL</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
