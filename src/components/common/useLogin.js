import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { login: loginUserContext } = useAuth();
  const { success, error: showError } = useToast();

  const { mutate: loginUser, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login response:", data);
      console.log("User data:", data.data.user);

      // Update authentication context with user data
      queryClient.setQueryData(["user"], data.data.user);
      loginUserContext(data.data.user);

      // Show success message
      success(`Welcome back, ${data.data.user.name}!`);

      // Navigate to intended page or dashboard
      const from = location.state?.from?.pathname || "/account";
      navigate(from, { replace: true });
    },
    onError: (err) => {
      console.error("Login error:", err);
      showError(err.message || "Login failed");
    },
  });

  return { loginUser, isLoading };
} 