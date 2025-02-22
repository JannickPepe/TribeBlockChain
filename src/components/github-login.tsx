import { signIn } from "../lib/auth-client";

const GithubSignIn = () => {
    return (
        <button
            className="bg-stone-800 outline outline-offset-2 outline-2 outline-cyan-700 px-3 py-1.5 rounded-2xl"
            onClick={async () => {
                const res = await signIn();
                if (res?.error) {
                    console.error(res.error);   
                }
                if (res?.success) {
                    console.log(res.success);
                }
            }}
        >
            Sign in with GitHub
        </button>
    )
}

export default GithubSignIn;