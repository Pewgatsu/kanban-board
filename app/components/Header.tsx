"use client";
import React from "react";
import Image from "next/image";
import logo from "./trello-plain.svg";
import styles from "./header.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Avatar from "react-avatar";
import { useBoardStore } from "../../store/BoardStore";

function Header() {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.logoWrapper}>
            <Image
              src={logo}
              alt="Trello Logo"
              width={50}
              height={50}
              className={styles.image}
            ></Image>
            <h1 className={styles.title}>Trello</h1>
          </div>

          <div className={styles.searchWrapper}>
            <form className={styles.form}>
              <MagnifyingGlassIcon
                className={styles.icon}
              ></MagnifyingGlassIcon>

              <input
                className={styles.searchbox}
                placeholder="Search"
                type="text"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <button type="submit" hidden></button>
            </form>

            <Avatar
              name="James De Leon"
              round
              size="50"
              color="#0055D1"
            ></Avatar>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
