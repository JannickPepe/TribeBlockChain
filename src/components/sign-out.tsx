import { signOut } from "../lib/auth-client"; 

const SignOut = () => {
    return (
        <button
            className="bg-stone-800 text-white p-2 rounded-2xl"
            onClick={async () => {
                const res = await signOut();
                if (res?.error) {
                    throw new Error(res.error.message);
                }
                if (res?.success) {
                    console.log(res.success);
                    window.location.href = "/";
                }
            }}
        >
            Sign out
        </button>
    )
}

export default SignOut;