import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
  children: ReactNode;
}

export const ShowOnLogin = ({ children }: Props) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }: Props) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};
export const UserLink = ({ children }: Props) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  if (isLoggedIn && user?.role === "User") {
    return children;
  }

  return null;
};

export const AdminLink = ({ children }: Props) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  if (isLoggedIn && user?.role === "Admin") {
    return children;
  }

  return null;
};
export const AuthorLink = ({ children }: Props) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  if (isLoggedIn && user?.role === "Web Editor") {
    return children;
  }
  return null;
};
