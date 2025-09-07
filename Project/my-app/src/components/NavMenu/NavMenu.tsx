import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  checkSessionAndLoadProfile,
  selectAuthLoading,
} from "../../app/authSlice";
import { DesktopNavMenu } from "./DesktopNavMenu";
import { MobileNavMenu } from "./MobileNavMenu";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";
import { useEffect } from "react";
import { Loader } from "../Loader";

export const NavMenu = () => {
  const isLoading = useAppSelector(selectAuthLoading);
  const { isMobile } = useDeviceDetect();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkSessionAndLoadProfile());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return isMobile ? <MobileNavMenu /> : <DesktopNavMenu />;
};
