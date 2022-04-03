import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AboutUs } from "../components/AboutUS/AboutUs";
import { AddPet } from "../components/AddPet/AddPet";
import { UploadFile } from "../components/AddPost/AddPost";
import { Confirm } from "../components/ConfirmRegisration/Confirm";
import { Donations } from "../components/Donations/Donations";
import { Header } from "../components/Header/Header";
import { Login } from "../components/Login/Login";
import { Pet } from "../components/PetsProfile/PetsProfile";
import { Post } from "../components/Post/Post";
import { PostList } from "../components/PostList/PostList";
import { Registration } from "../components/Registration/Registration";
import { Update } from "../components/UpdadeUser/UpdadeUser";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { init } from "../redux/actions/authActions";
import { IState } from "../redux/store";

export function RootRouter() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: IState) => state.authReducer.isLoggedIn
  );

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route path="/post/:postId">
          <Post />
        </Route>
        <Route path="/aboutUs" component={AboutUs} />
        <Route path="/donations" component={Donations} />
        <Route path="/registration" component={Registration} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/login" component={Login} />
        <Route path="/userProfile">
          {isLoggedIn ? <UserProfile /> : <Redirect to={"/login"} />}
        </Route>
        <Route path="/addpet">
          {isLoggedIn ? <AddPet /> : <Redirect to={"/login"} />}
        </Route>
        <Route path="/pet/:petId">
          <Pet />
        </Route>
        <Route path="/addpost">
          {isLoggedIn ? <UploadFile /> : <Redirect to={"/login"} />}
        </Route>
        <Route path="/update">
          {isLoggedIn ? <Update /> : <Redirect to={"/login"} />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
