import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormBody from "../components/LogIn/FormBody.component";
import FormButtons from "../components/LogIn/FormButtons.component";
import {
  fetchAllImages,
  verifyUserLogin,
} from "../store/actions/logIn.actions";

const LogIn = () => {
  const userUniqueId = useSelector((state) => state.auth.userUniqueId);
  const step = useSelector((state) => state.logIn.step);
  const noOfSteps = useSelector((state) => state.logIn.noOfSteps);
  const password = useSelector((state) => state.logIn.password);
  const username = useSelector((state) => state.logIn.username);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllImages());
  }, [dispatch]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let stringPassword = "";
    for (let pass of password) {
      stringPassword = stringPassword + pass;
    }
    const userInfo = {
      username,
      loginId: userUniqueId,
      timestamp: Date.now(),
      pattern: stringPassword,
    };
    dispatch(verifyUserLogin(userInfo));
  };

  const heading = step === 0 ? "LogIn To Account" : "Password";

  return (
    <div className="mt-32 mx-auto md:mt-36 bg-white shadow-[2px_4px_12px_rgba(0,0,0,0.2)] max-w-[480px] md:mx-auto shadow-gray-400 rounded-xl   p-8 relative">
      <form action="" className="w-4/5 mx-auto" onSubmit={onSubmitHandler}>
        <div className="header flex flex-col items-center justify-center">
          <h1 className="text-[color:var(--color-primary)] text-3xl font-semibold mb-2">
            {heading}
          </h1>
          <div className="h-[0.30rem] w-12 bg-[color:var(--color-primary)] rounded-full"></div>
        </div>

        <div className="body">
          <FormBody />
        </div>

        <div className="footer mt-8 flex justify-around">
          <FormButtons />
        </div>
      </form>
      {!step && (
        <div className="text-center mt-6">
          <Link to="/accountrecovery">
            <p className="text-[color:var(--color-primary)] text-sm">
              Forgotten passowrd?
            </p>
          </Link>
        </div>
      )}
      {step !== 0 && (
        <div className=" px-3 py-1 text-white absolute top-2 right-2 text-sm font-bold bg-[color:var(--color-primary)] rounded-lg">
          {step}
          <span> / </span>
          {noOfSteps}
        </div>
      )}
    </div>
  );
};

export default LogIn;
