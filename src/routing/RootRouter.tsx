import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AboutUs } from "../components/AboutUS/AboutUs";
import { AddPet } from "../components/AddPet/AddPet";
import { Confirm } from "../components/ConfirmRegisration/Confirm";
import { Donations } from "../components/Donations/Donations";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Login } from "../components/Login/Login";
import { Pet } from "../components/PetsProfile/PetsProfile";
import { Post } from "../components/Post/Post";
import { PostList } from "../components/PostList/PostList";
import { Registration } from "../components/Registration/Registration";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { init } from "../redux/actions/authActions";

export function RootRouter() {
  const dispatch = useDispatch();

  const isLog = localStorage.getItem("access");

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
          {isLog ? <UserProfile /> : <Redirect to={"/login"} />}
        </Route>
        <Route path="/addpet">
          {isLog ? <AddPet /> : <Redirect to={"/login"} />}
        </Route>
        <Route path="/pet/:petId">
          <Pet />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
