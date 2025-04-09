import { Link, useNavigate } from "react-router-dom";
import { UserAuthLayout } from "../../../components/auth/UserAuthLayout";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import auth1 from "../../../assets/compressed/auth1.webp";
import auth2 from "../../../assets/compressed/auth2.webp";
import auth3 from "../../../assets/compressed/auth3.webp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { constant } from "../../../constants/constant";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginData = z.infer<typeof LoginSchema>;

const images = [auth1, auth2, auth3];
export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginData> = async (formData: LoginData) => {
    const response = await axios.post(`${constant.BASE_URL}/login`, {...formData , fcmToken : 
      "Abdefg123456" });
    console.log("Response from API:", response.data.data.accessToken);
    const { success ,data} = response.data;
    if (success) {  
      localStorage.setItem('accessToken', response.data.data.accessToken);
      navigate("/");
    } else {
      console.error("Login failed", data);
    }
  };

  return (
    <UserAuthLayout page="Sign In"  images={images} authType="login">
      <div className="flex flex-col gap-3 2xl:gap-6 max-h-screen">
          <div className='flex flex-col gap-1 flex-wrap'>
              <h1 className="text-xl 2xl:text-2xl font-secondary">Hey FlickStar 🌟</h1>
              <h2 className="text-xl 2xl:text-2xl font-secondary">Welcome Back 👋</h2>
          </div>
          <div className='flex flex-col gap-1 flex-wrap'>
              <h3 className='text-white/70 text-sm 2xl:text-lg'>On FlickStar, your content earns, your passion grows, and your voice is heard.</h3>
              <h4 className='text-white text-sm 2xl:text-lg'>Enter email or phone number to start</h4>
          </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-xl shadow-lg space-y-3 w-full mt-4 2xl:mt-0"
      >
        <div className="flex flex-col space-y-1 md:space-y-2">
          <label className="text-xs">Username, email or phone number</label>
          <Input
            type="email"
            placeholder="example@email.com"
            className="outline-none"
            {...register("email")}
            required
          />
          {errors.email && (
            <span className="text-red-500 text-xs  md:text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-1 md:space-y-2">
        <label className="text-xs">Password</label>
          <Input
            type="password"
            placeholder="At least 8 characters"
            {...register("password")}
            required
          />
          {errors.password && (
            <span className="text-red-500 text-xs  md:text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="text-right text-sm">
          <Link
            to="/forgot-password"
            className="text-violet-500 hover:text-primary-dark transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full h-10 mt-5 flex justify-center items-center bg-violet-500 border-none cursor-pointer rounded-lg text-white"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      </div>
    </UserAuthLayout>
  );
};
