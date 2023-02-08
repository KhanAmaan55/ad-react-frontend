import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ListView from './pages/list_view/View';
import { AddItem } from './pages/add_item/AddItem';
import { EditItem } from './pages/edit_item/EditItem';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<ListView />}></Route>
          <Route exact path='/edit-student/:slug' element={<EditItem />}></Route>
          <Route exact path='/add-student' element={< AddItem />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
