import { useEffect, useState } from "react";
import samy from "../../assets/samy.svg";
import searchIcon from "../../assets/search.svg";
import { filterVar } from "../../main";
import styles from "./Topbar.module.css";

export default function Topbar() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterVar({ search });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.topbar}>
      <img src={samy} alt="Samy" height={"30%"} />
      <div className={styles.searchContainer}>
        <img src={searchIcon} alt="Search" height={"20px"} />
        <input
          type="text"
          placeholder="You're looking for something?"
          onChange={handleChange}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
}
