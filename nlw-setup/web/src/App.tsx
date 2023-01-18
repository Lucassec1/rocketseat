import "./styles/global.css";

import { Habit } from "./components/Habit"

function App() {
  return (
    <div>
      <Habit completed={3} />
      <Habit completed={7} />
      <Habit completed={15} />
      <Habit completed={27} />
    </div>
  )
}

export default App