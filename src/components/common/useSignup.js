import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { signup } from "../../services/apiAuth";

function useSignup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error: showError } = useToast();

  const { mutate: signupUser, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      login(data.data.user);
      success("Account created successfully! Welcome aboard!");
      navigate("/account");
    },
    onError: (err) => {
      showError(err.message || "Failed to create account");
    },
  });
  return { signupUser, isLoading };
}

export default useSignup;