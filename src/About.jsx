import React from "react";
import LoginFooter from "./LoginFooter";
function About() {
  return (
    <div className="overflow-y-auto no-scrollbar h-[68vh] lg:h-auto md:h-auto sm:h-auto">
      <a
        href="#"
        class=" pointer-events-none mx-auto my-10 lg:my-10 sm:my-5 md:my-5 block w-[90vw] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to DoMore!
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Get ready to supercharge your productivity with [Your Application
          Name]! Whether you're tackling tasks, organizing projects, or
          achieving your goals, we're here to help you stay focused and
          motivated every step of the way.
        </p>
        <h1 className="mt-5">Our Mission</h1>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          At DoMore, our mission is to simplify task management and enhance
          efficiency in your daily routine. We understand the challenges of
          balancing work, personal life, and everything in between. That's why
          we've created a robust yet user-friendly todo app that adapts to your
          unique needs, making it easier for you to prioritize, plan, and
          accomplish your tasks effortlessly.
        </p>
        <h1 className="mt-5">Why Choose DoMore?</h1>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          We stand out from the rest with our commitment to user-centric design,
          reliability, and continuous improvement. Our dedicated team is always
          listening to your feedback and innovating to bring you the best todo
          app experience possible.
        </p>
        <h1 className="mt-5">Get Start Today</h1>
        <p class="font-normal text-gray-700 dark:text-gray-400">
        Join thousands of users who have already transformed the way they manage their tasks. Sign up for free today and take control of your productivity with DoMore.
        </p>
      </a>
      <LoginFooter/>
    </div>
  );
}

export default About;
