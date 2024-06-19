import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase.util";
import LoginNav from "./loginNav";
import LoginFooter from "./LoginFooter";
import { useState, useEffect } from "react";
import GOOGLELOGO from "/public/google.png";

function LoginPageBody() {
  const [quotes, setQuotes] = useState([]);
  const [quotee, setQuotee] = useState({ quote: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" });
  const signInUser = () => {
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
    document.title = "DoMore - Home";
  };
  const show = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  // quotes
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes");
        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }
        const data = await response.json();
        setQuotes(data.quotes); // Store fetched quotes in state
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    loadQuotes();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const random = () => {
    if (quotes.length > 0) {
      const select = Math.floor(Math.random() * quotes.length);
      const selectedQuote = quotes[select];
      setQuotee({ quote: selectedQuote.quote, author: selectedQuote.author }); // Update state with random quote
    }

  };

  return (
    <>
      <div className="text-center my-[10vh] lg:my-[16vh] md:my-[16vh] sm:my-[16vh]">
        <h1 className="lg:text-[4em] md:text-[4em] sm:text-[4em] text-[3rem] font-bold ">
          DoMore &rarr; Just Do It🎯
        </h1>

        <div onClick={random} className="cursor-pointer my-5 mx-auto block lg:max-w-sm sm:max-w-sm md:max-w-sm p-6 w-[90vw] bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <q>{quotee.quote}</q>
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 text-right">
            <i>-{quotee.author}</i>
          </p>
        </div>

        <button
          onClick={signInUser}
          className="mx-auto flex justify-center items-center text-lg rounded-xl shadow-[0_10px_15px_-8px_gray] bg-blue-500 p-3 font-bold text-white round-md hover:scale-110 transition-all duration-200 ease-in-out"
        >
          sign in with
          <img
            className="size-8 mx-1 rounded-full"
            src={GOOGLELOGO}
            alt=""
          />
        </button>
      </div>
    </>
  );
}

export default LoginPageBody;
