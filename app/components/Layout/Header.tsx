import React from "react";
import TopBar from "./TopBar";
import Navbar from "./Navigation/Navbar";
import { getNavigation } from "@/lib/navigation";

export default async function Header() {
  const navigation = await getNavigation();

  return (
    <>
      <TopBar />
      <Navbar navigation={navigation} />
    </>
  );
}
