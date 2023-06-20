import { SigninForm } from "@/components/SignIn";
import { SignupForm } from "@/components/Signup";
import { useState } from "react";
import { useRouter } from 'next/router'

const signStateKey = {
  SIGNIN: "SIGNIN", SIGNUP: "SIGNUP"
}

export default function Home() {
  const [signState, setSignState] = useState(signStateKey.SIGNIN)

  return (
    <main
      className={`min-h-screen font-primary`}
    >
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center pt-8">
              <img src='/ms-icon-310x310.png' className="w-10 h-10 rounded-full" />
              <div className="tabs">
                <a className={`tab tab-bordered ${signState === signStateKey.SIGNUP ? `tab-active` : ""}`}
                  onClick={
                    () => {
                      setSignState(signStateKey.SIGNUP);
                    }
                  }>Sign up</a>
                <a className={`tab tab-bordered ${signState === signStateKey.SIGNIN ? `tab-active` : ""}`}
                  onClick={
                    () => { { setSignState(signStateKey.SIGNIN) } }}
                >Sign in</a>
              </div>
            </div>
            {
              signState === signStateKey.SIGNIN ? <>
                <SigninForm switchToSignup={() => setSignState(signStateKey.SIGNUP)} /> </> :
                <> <SignupForm switchToSignin={() => setSignState(signStateKey.SIGNIN)} /> </>
            }
          </div>
        </div>
      </section>
    </main>
  )
}
