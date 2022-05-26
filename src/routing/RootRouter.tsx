import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AboutUs } from "../components/AboutUS/AboutUs";
import { AddPet } from "../components/AddPet/AddPet";
import { UploadFile } from "../components/AddPost/AddPost";
import { Confirm } from "../components/ConfirmRegisration/Confirm";
import { Donations } from "../components/Donations/Donations";
import { Header } from "../components/Header/Header";
import { Login } from "../components/Login/Login";
import { Modal } from "../components/Modal/Modal";
import { PetHome } from "../components/PetHome/PetHome";
import { Pet } from "../components/PetsProfile/PetsProfile";
import { Post } from "../components/Post/Post";
import { FavoritePosts } from "../components/PostList/FavotitePosts";
import { PostList } from "../components/PostList/PostList";
import { Registration } from "../components/Registration/Registration";
import { Update } from "../components/UpdadeUser/UpdadeUser";
import { IdUser } from "../components/UserProfile/IdUser";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { init } from "../redux/actions/authActions";
import { IState } from "../redux/store";

export function RootRouter() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: IState) => state.authReducer.isLoggedIn
  );

  const isLog = localStorage.getItem("access");
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <>
      <Header />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<PostList />} />

        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/userProfile"
          element={!isLog ? <Navigate replace to="/login" /> : <UserProfile />}
        />

        <Route
          path="/addpet"
          element={!isLog ? <Navigate replace to="/login" /> : <AddPet />}
        />

        <Route
          path="/favorite"
          element={
            !isLog ? <Navigate replace to="/login" /> : <FavoritePosts />
          }
        />

        <Route path="/pet/:petId" element={<Pet />} />

        <Route path="/users/:usserId" element={<IdUser />} />

        <Route
          path="/addpost"
          element={!isLog ? <Navigate replace to="/login" /> : <UploadFile />}
        />

        <Route
          path="/update"
          element={!isLog ? <Navigate replace to="/login" /> : <Update />}
        />

        <Route
          path="/pethome"
          element={!isLog ? <Navigate replace to="/login" /> : <PetHome />}
        />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/img/:postId" element={<Modal />} />
        </Routes>
      )}
    </>
  );
}
