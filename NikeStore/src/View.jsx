import React, { useContext, useEffect, useState } from "react";
import Context from "./context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./assets/config";
export default function View() {
  const { shoes, userEmail } = useContext(Context);
  const { id } = useParams();
  const [view, setView] = useState({});
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate()
  function unDoPopup(){
    setPopUp(!popUp)
  }
  async function buttonhandler() {
    if (!userEmail) {
       unDoPopup()
    }
    else{
        const userRef = doc(db, "user", userEmail);

try {
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    const updatedData = {
        ...userSnapshot.data(), 
        cart: arrayUnion(id) 
      };

    await updateDoc(userRef, updatedData);
    navigate('/cart')
  } else {
    console.log("User not found!");
  }
} catch (error) {
  console.error("Error updating cart:", error);
}
    }
  }
  useEffect(() => {
    const target = shoes.find((element) => String(element.id) === String(id));

    setView(target);
  }, [shoes, id]);
  if (!view) {
    return <div></div>;
  }
  return (
    <>
      {popUp && (
        <div>
          <div className="absolute top-0 w-screen h-screen flex justify-center z-10 bg-black opacity-50"></div>
            <div className="absolute top-0 w-screen h-screen flex justify-center items-center z-20 ">
                <div className="w-[250px] p-2 pb-6 h-[100px] bg-gray-300 rounded-md flex flex-col justify-between">
                    <div className="flex w-full justify-end">
                        <img width="12px" onClick={unDoPopup} className=" cursor-pointer" src="https://th.bing.com/th/id/R.121b472279241cbae5482b00281c7b96?rik=7crjy9CBsY%2ffuA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_414234.png&ehk=AQURW5NjTCW5XZieKHkZUV95jgXYj96y83vbdC1%2fI3Y%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    </div>
                    <div className="flex  w-full justify-center ">
                        <Link to="/login">
                        <div className="py-2 px-4 cursor-pointer rounded-md bg-gray-400 " > Log in </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      )}
      <Link to="/" className=" absolute top-0 pt-2 pl-2 font-bold">
        Home
      </Link>
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="w-[400px] max-[400px]:w-[200px] cursor-pointer">
          <div className="h-[400px] max-[400px]:h-[200px] w-[400px] max-[400px]:w-[200px] object-cover">
            <img src={view.img} alt="" />
          </div>
          <div className=" flex justify-between py-3">
            <div>{view.name}</div>
            <div>${view.price}</div>
          </div>
          <div className="flex justify-center pb-3">
            <button
              onClick={buttonhandler}
              className="bg-gray-300 hover:bg-gray-400 rounded-[15px] p-3"
            >
              Add to Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
