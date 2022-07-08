/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import africa from "./../assets/img/test3.jpg";
export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">



      <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url(" + africa + ")",
          }}
        />
      <div class= "container">
      <div className="header relative pt-16 items-center flex h-screen max-h-860-px">
          <div className="container mx-auto items-center flex flex-wrap">
            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
              <div className="pt-40 sm:pt-0">
                <h1 className="text-white font-semibold text-5xl">
                  Increasing Access.Get Data 
             </h1>
                <p className=" text-white mt-4 text-lg text-Black-200">
                  <strong>
                   Start prediction to see futur  the patient health situation. Intelligence artificilelle 


 </strong>  </p>
                <div className="mt-12">
                  <a
                    href="http://localhost:3000/auth/login"
                    target="_blank"
                    className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    Start prediction
                </a>

                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

    

   

    
   
      <Footer />
    </>
  );
}
