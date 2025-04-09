import GoogleIcon from "../../../assets/compressed/google.svg?react";
import   AppleIcon  from "../../../assets/compressed/apple.svg?react";
import  FacebookIcon  from "../../../assets/compressed/facebook.svg?react";
import  XIcon  from "../../../assets/compressed/twitter.svg?react";

const SocialLogin = () => {
  return (
    <div className="flex justify-between items-center gap-4">
      <a href="/google-login" aria-label="Sign in with Google">
        <GoogleIcon className="w-7 h-7 rounded-full cursor-pointer transition-transform hover:scale-110">
            <title>Google</title>
        </GoogleIcon>
      </a>
      <a href="/apple-login" aria-label="Sign in with Apple">
        <AppleIcon className="w-7 h-7 rounded-full cursor-pointer transition-transform hover:scale-110" >
            <title>Apple</title>
        </AppleIcon>
      </a>
      <a href="/facebook-login" aria-label="Sign in with Facebook">
        <FacebookIcon className="w-7 h-7 rounded-full cursor-pointer transition-transform hover:scale-110">
            <title>Facebook</title>
        </FacebookIcon>
      </a>
      <a href="/twitter-login" aria-label="Sign in with X (formerly Twitter)">
        <XIcon className="w-7 h-7 rounded-full cursor-pointer transition-transform hover:scale-110">
            <title>X</title>
        </XIcon>
      </a>
    </div>
  );
};

export default SocialLogin;
