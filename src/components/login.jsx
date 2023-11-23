"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputField from "./input";
import Button from "./Button";
import { useState, useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("Login")=="true")
      router.push('/dashboard')
    // Simulate a delay (e.g., fetching data from an API)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer on component unmount or when loading is done
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (login) localStorage.setItem("Login", "true");
  }, [login]);
  const handleLogin = async () => {
    setLoading(true);
    setmsg("");
    if (email == "AhmedDubai" && password == "Ahmed123") {
      setLogin(true);
      router.push("/dashboard");
    } else {
      setmsg("Wrong Credentials");
    }
    setLoading(false);
  };

  return (
    <div className="  bg-white ">
      <div className="w-1/3 mx-auto flex flex-col bg-white justify-center items-center py-5 px-22 gap-5">
        <Image alt="logo" width={300} height={300} src={"/assets/logo.png"} />

        <InputField
          setValue={setEmail}
          value={email}
          placeholder={"Enter you Username"}
          Label={"User Name"}
        />
        <InputField
          setValue={setPassword}
          value={password}
          placeholder={"*********"}
          Label={"Password"}
        />
        <div
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></div>
        <p
          style={{
            fontSize: 12,
            fontFamily: "Roboto-Bold",
            color: "red",
            width: "100%",
            alignSelf: "center",
          }}
        >
          {msg}
        </p>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <Button
            onPress={() => {
              handleLogin();
            }}
            Label={"LOGIN"}
          />
        )}
      </div>
    </div>
  );
}
