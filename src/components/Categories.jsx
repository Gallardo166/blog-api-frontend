import { useContext } from "react"
import { Data } from "./Page"
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Categories.module.css";

const Categories = function() {
  const { categories } = useContext(Data);
  const { categoryid } = useParams();
  
  return (
    <div className={styles.categories}>
      {categories && categories.map((category) => (
        <Link to={categoryid === category._id ? `/blog` : `/blog/categories/${category._id}`} key={category._id} className={`${categoryid === category._id ? styles.selected : null} ${styles.category}`}>{category.name}</Link>
      ))}
    </div>
  )
}

export default Categories;