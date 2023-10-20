import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Register.module.scss";

export default function Register({ seeLoginForm }) {
  const [feedback, setFeedBack] = useState("");
  const [feedbackGood, setFeedBackGood] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const yupSchema = yup.object({
    username: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit contenir au minimum 2 caractères")
      .max(12),
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Vous devez saisir un email valide"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Mot de passe trop court")
      .max(10, "Mot de passe trop long"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password", "")],
        "Les mots de passe ne correspondent pas"
      ),
  });

  const defaultValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    setIsSubmitted(true);
    setFeedBack("");
    console.log(values);
    const response = await fetch("http://localhost:8000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const newUser = await response.json();
      if (newUser.message) {
        setFeedBack(newUser.message);
        setIsSubmitted(false);
      } else {
        setFeedBackGood(newUser.messageGood);
        reset(defaultValues);
        setTimeout(() => {
          seeLoginForm();
        }, 3000);
      }
    }
  }

  return (
    <div className="flex-fill d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb10">
          <label htmlFor="username" className="mb10">
            Username
          </label>
          <input type="text" id="username" {...register("username")} />
          {errors?.username && (
            <p className={`${styles.feedback}`}>{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="email" className="mb10">
            Email
          </label>
          <input type="email" id="email" {...register("email")} />
          {errors?.email && (
            <p className={`${styles.feedback}`}>{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="password" className="mb10">
            Password
          </label>
          <input type="password" id="password" {...register("password")} />
          {errors?.password && (
            <p className={`${styles.feedback}`}>{errors.password.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb10">
          <label htmlFor="confirmPassword" className="mb10">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword && (
            <p className={`${styles.feedback}`}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {feedback && <p className={`${styles.feedback} mb20`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood} mb20`}>{feedbackGood}</p>
        )}
        <button className="btn btn-primary" disabled={isSubmitted}>
          Submit
        </button>
      </form>
    </div>
  );
}
