import { signInWithGoogle } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <button formAction={signInWithGoogle}>Log in</button>
    </form>
  );
}
