import { CustomInput } from "../CustomInput";
import { Button } from "../Button";
import styles from "../AuthForm/AuthForm.module.scss";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeModal,
  loginUser,
  selectAuthError,
  selectAuthLoading,
  setModalView,
} from "../../app/authSlice";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Введите корректный email"),
  password: z.string().min(1, "Пароль обязателен"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const handleSwitchToRegister = () => {
    dispatch(setModalView("register"));
  };

  const handleLogin = async (formData: LoginFormData) => {
    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      dispatch(closeModal());
    }

    if (loginUser.rejected.match(result)) {
      console.log("Что то пошло не так");
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(handleLogin)}>
      <div className={styles.authForm__wrapper}>
        <CustomInput
          type="email"
          placeholder="Email"
          iconName="icon-email"
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <CustomInput
          type="password"
          placeholder="Пароль"
          iconName="icon-password"
          errorMessage={errors.password?.message}
          {...register("password")}
        />
      </div>

      {error && <span className={styles.authForm__errorText}>{error}</span>}
      <Button type="submit" isLoading={isLoading}>
        Войти
      </Button>
      <button
        type="button"
        className={styles.authForm__switchButton}
        onClick={handleSwitchToRegister}
      >
        Регистрация
      </button>
    </form>
  );
};
